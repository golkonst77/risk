import path from 'path'
import { fileURLToPath } from 'url'
import createMDX from '@next/mdx'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
  },
})

/** @type {import('next').NextConfig} */
const baseConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@supabase/supabase-js': path.resolve(__dirname, 'lib/supabase-stub.ts'),
    }
    return config
  },
}

const isDev = process.env.NODE_ENV === 'development'
const isStaticExport = process.env.AUSN_STATIC_EXPORT === 'true'

const nextConfig = {
  ...baseConfig,
  // Статический export включаем только по флагу AUSN_STATIC_EXPORT=true.
  // Это позволяет локально делать next build без конфликтов с app/api,
  // а на сервере явно собирать статику для /ausn.
  ...(isStaticExport ? {
    output: 'export',
    basePath: '/ausn',
    assetPrefix: '/ausn',
  } : {
    basePath: undefined,
    assetPrefix: undefined,
  }),
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
