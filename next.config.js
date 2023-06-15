/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://howstheairtoday.site/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
