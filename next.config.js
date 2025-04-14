/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // GitHub Pagesでのデプロイ用の設定
  basePath: '/touch-translate',
  assetPrefix: '/touch-translate/',
  images: {
    unoptimized: true,
  },
  // 静的エクスポート用の設定
  output: 'export',
}

module.exports = nextConfig 