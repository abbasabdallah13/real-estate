/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
      domains: ["bayut-production.s3.eu-central-1.amazonaws.com", 
                "lh3.googleusercontent.com",
                "avatars.githubusercontent.com",
                "static.vecteezy.com"
            ],
    },
  };

module.exports = nextConfig
