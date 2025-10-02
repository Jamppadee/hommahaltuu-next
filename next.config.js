/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { tsconfigPaths: true },
  images: { domains: ['images.unsplash.com', 'randomuser.me'] }
}
module.exports = nextConfig
