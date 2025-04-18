/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: '**',
       },
     ],
     domains: ['**'], // Adicione o domínio aqui
   },

  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],

        has: [
          // {
          //   type: 'query',
          //   key: 'page',
          //   // the page value will not be available in the
          //   // header key/values since value is provided and
          //   // doesn't use a named capture group e.g. (?<page>home)
          //   value: 'home',
          // },
          {
            type: 'cookie',
            key: 'authorized',
            value: 'true',

          },
        ],
      },
    ];
  },
};

export default nextConfig;
