import { ReactNode } from 'react'
import { MDXProvider } from '@mdx-js/react'
import styles from './MDXLayout.module.css'

type Props = {
  children: ReactNode
  frontmatter?: { title?: string; description?: string; date?: string }
}

const components = {
  h1: (p: any) => <h1 className={styles.h1} {...p} />,
  h2: (p: any) => <h2 className={styles.h2} {...p} />,
  pre: (p: any) => <pre className={styles.pre} {...p} />,
  code: (p: any) => <code className={styles.code} {...p} />,
  Note: (p: any) => <div className={styles.note} {...p} />,
}

export default function MDXLayout({ children, frontmatter }: Props) {
  return (
    <article className={styles.container}>
      {frontmatter?.title && <h1 className={styles.title}>{frontmatter.title}</h1>}
      {frontmatter?.description && (
        <p className={styles.description}>{frontmatter.description}</p>
      )}
      <MDXProvider components={components}>{children}</MDXProvider>
    </article>
  )
}
