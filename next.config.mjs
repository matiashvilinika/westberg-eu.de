import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Serve the static offers page at a clean /offers URL.
      // The file itself lives at public/offers/index.html.
      { source: '/offers', destination: '/offers/index.html' },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "beujrjipfmeviidtului.supabase.co",
        port: "",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
