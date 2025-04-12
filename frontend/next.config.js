/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store.storeimages.cdn-apple.com',
        port: '',
        pathname: '/4982/**',
      },
      {
        protocol: 'https',
        hostname: 'i.dell.com',
        port: '',
        pathname: '/is/image/**',
      },
      {
        protocol: 'https',
        hostname: 'www.lenovo.com',
        port: '',
        pathname: '/medias/**',
      },
      {
        protocol: 'https',
        hostname: 'image-us.samsung.com',
        port: '',
        pathname: '/us/**',
      },
      {
        protocol: 'https',
        hostname: 'store.google.com',
        port: '',
        pathname: '/product/**',
      },
      {
        protocol: 'https',
        hostname: 'electronics.sony.com',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'www.fitbit.com',
        port: '',
        pathname: '/global/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.bose.com',
        port: '',
        pathname: '/content/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig 