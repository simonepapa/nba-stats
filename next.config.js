/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/schedule",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
