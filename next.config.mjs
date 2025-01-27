/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/egun',
        destination: '/egun/index.html',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
