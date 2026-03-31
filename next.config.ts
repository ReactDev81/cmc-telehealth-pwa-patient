// @ts-expect-error - next-pwa does not provide TypeScript definitions
import withPWAInit from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development"
  },
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'telehealthwebapplive.cmcludhiana.in',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
};

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

export default process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig);