import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import MDXLayout from '@/components/MDXLayout'

type Frontmatter = { title?: string; description?: string; date?: string }

type Props = { source: MDXRemoteSerializeResult; frontmatter: Frontmatter }

export default function KBArticle({ source, frontmatter }: Props) {
  return (
    <MDXLayout frontmatter={frontmatter}>
      <MDXRemote {...source} />
    </MDXLayout>
  )
}

const KB_CONTENT_PATH = path.join(process.cwd(), 'content', 'kb')

const getAllMdxFiles = (dirPath: string, fileList: string[] = []): string[] => {
  if (!fs.existsSync(dirPath)) return fileList
  const files = fs.readdirSync(dirPath)

  files.forEach(file => {
    const filePath = path.join(dirPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      fileList = getAllMdxFiles(filePath, fileList)
    } else if (filePath.endsWith('.mdx')) {
      fileList.push(filePath)
    }
  })

  return fileList
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = getAllMdxFiles(KB_CONTENT_PATH)

  const paths = files.map(file => {
    const slug = file
      .replace(KB_CONTENT_PATH, '')
      .replace(/\.mdx$/, '')
      .split(path.sep)
      .filter(Boolean)

    if (slug.length === 1 && slug[0] === 'index') {
      return { params: { slug: [] } }
    }
    
    return { params: { slug } }
  })

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = (params?.slug as string[]) || []
  const slugPath = slug.length > 0 ? slug.join('/') : 'index'
  const filePath = path.join(KB_CONTENT_PATH, `${slugPath}.mdx`)

  if (!fs.existsSync(filePath)) {
    return { notFound: true }
  }

  const raw = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(raw)

  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [], rehypePlugins: [] },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontmatter: data as Frontmatter,
    },
    revalidate: 60,
  }
}