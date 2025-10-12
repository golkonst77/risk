# Knowledge Base (MDX) + Netlify CMS

This document describes the MDX-based Knowledge Base added to the project and the CMS integration.

## Overview

- Content format: MDX files under `content/kb/`.
- Rendering: Next.js pages router via `pages/kb/[slug].tsx` with `next-mdx-remote`.
- Layout: `components/MDXLayout.tsx` with styles `components/MDXLayout.module.css`.
- CMS: Netlify CMS served from `public/admin/` with configuration in `public/admin/config.yml`.
- Assets: stored in `public/uploads/` and committed to Git (see .gitignore exceptions).

## Dependencies

Installed and committed in `package.json` and `pnpm-lock.yaml`:

- `@next/mdx` — MDX support in Next.js
- `@mdx-js/loader` — MDX loader
- `@mdx-js/react` — MDXProvider runtime (required)
- `next-mdx-remote` — serialize/render MDX in pages router
- `gray-matter` — frontmatter parsing
- `netlify-cms-app`, `netlify-identity-widget` — CMS

Install (already done):

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react next-mdx-remote gray-matter netlify-cms-app netlify-identity-widget
```

## Next.js configuration

File: `next.config.mjs`

- Uses ESM and `@next/mdx`.
- Extends page extensions to include MD/MDX.
- Preserves existing config (eslint/typescript/images) and webpack alias.

Key excerpt:

```js
import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: { providerImportSource: '@mdx-js/react' },
})

const nextConfig = {
  // ...baseConfig
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
```

## Content structure

- Directory: `content/kb/`
- Example: `content/kb/hello-world.mdx`

Frontmatter + body example:

```md
---
title: "Hello World"
description: "Your first MDX article"
date: "2025-10-12"
---

# Hello, MDX

MDX + Next.js (pages router) via next-mdx-remote.

```js
console.log('MDX works!')
```

<Note>MDX supports components!</Note>
```

## Rendering page

File: `pages/kb/[slug].tsx`

- `getStaticPaths`: reads `content/kb` and builds paths from file names.
- `getStaticProps`: loads file, parses frontmatter, serializes MDX.
- Renders with `MDXRemote` inside `MDXLayout`.

```tsx
export const getStaticPaths = async () => { /* readDir content/kb, .mdx -> params.slug */ }
export const getStaticProps = async ({ params }) => { /* read + serialize */ }
```

## MDX Layout

- File: `components/MDXLayout.tsx`
- Styles: `components/MDXLayout.module.css`
- Provides `MDXProvider` components for headings, code, notes.

## Netlify CMS

- Admin UI: `public/admin/index.html`
- Config: `public/admin/config.yml`

Important fields in `config.yml`:

```yaml
backend:
  name: github
  repo: your-org/your-repo  # TODO: set actual repo
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "kb"
    label: "Knowledge Base"
    folder: "content/kb"
    create: true
    slug: "{{slug}}"
    extension: "mdx"
    format: "frontmatter"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Description", name: "description", widget: "text", required: false }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Body", name: "body", widget: "markdown" }
```

Authentication options:
- Netlify hosting: enable Netlify Identity + Git Gateway.
- GitHub OAuth: configure GitHub App for auth.

Access: `/admin` (served from `public/admin/index.html`).

## Linking from UI

- File: `components/faq.tsx`
- The yellow badge in the hero section now links to `/kb`.

```tsx
<a href="/kb" className="inline-block bg-yellow-400 ...">БАЗА ЗНАНИЙ ПО АУСН (перейти)</a>
```

## Assets and .gitignore

- Public assets live in `public/uploads/`.
- `.gitignore` rules allow tracking `public/uploads/**` while keeping other generic `uploads/` ignored.

```gitignore
uploads/
!public/uploads/
!public/uploads/**
```

## Local development

```bash
pnpm dev
# http://localhost:3000/kb/hello-world
# http://localhost:3000/admin
```

Build:

```bash
pnpm build
```

## Known pitfalls & fixes

- ERR: `Cannot find package '@next/mdx' imported from next.config.mjs`
  - Ensure `@next/mdx` and lockfile are committed (done in v1.3.13).
- ERR: `Export encountered errors /kb/[slug]`
  - Ensure `@mdx-js/react` is installed (required by MDXProvider). Installed.
- 404 for images
  - Ensure assets are under `public/uploads/` and committed (done in v1.3.10+).

## Roadmap / Next steps

- Add `pages/kb/index.tsx` to list all articles from `content/kb/`.
- Add remark/rehype plugins for code highlighting.
- Enhance CMS workflow (editorial workflow, previews).

## Changelog references

- v1.3.11 — add KB (MDX pages), MDXLayout, CMS files.
- v1.3.12 — link FAQ hero badge to `/kb`.
- v1.3.13 — commit MDX/CMS dependencies (package.json, pnpm-lock.yaml).
- v1.3.14 — commit public uploads and lock updates.
