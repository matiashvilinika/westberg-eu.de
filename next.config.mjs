import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Send /offers to the real file path. This must be a redirect, not a
      // rewrite: the page loads its assets with relative URLs, which the
      // browser resolves against the current directory. Serving the HTML at
      // /offers would resolve "./support.js" to /support.js and 404 every
      // asset, so the browser has to actually sit at /offers/index.html.
      { source: '/offers', destination: '/offers/index.html', permanent: false },
      { source: '/911-offer', destination: '/911-offer/index.html', permanent: false },
      { source: '/v2', destination: '/v2/index.html', permanent: false },
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
