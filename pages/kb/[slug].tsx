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

export const getStaticPaths: GetStaticPaths = async () => {
  const kbDir = path.join(process.cwd(), 'content', 'kb')
  const files = fs.existsSync(kbDir) ? fs.readdirSync(kbDir).filter(f => f.endsWith('.mdx')) : []
  const paths = files.map(file => ({ params: { slug: file.replace(/\.mdx$/, '') } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug)
  const filePath = path.join(process.cwd(), 'content', 'kb', `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(raw)

  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [], rehypePlugins: [] },
    scope: data,
  })

  return { props: { source: mdxSource, frontmatter: data as Frontmatter } }
}
