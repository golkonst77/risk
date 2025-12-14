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

const nextConfig = {
  ...baseConfig,
  // Включаем статическую выгрузку в папку out
  output: 'export',
  // Сайт будет обслуживаться из подкаталога /ausn
  basePath: '/ausn',
  assetPrefix: '/ausn',
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
