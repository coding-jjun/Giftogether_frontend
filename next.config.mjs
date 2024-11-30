import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://api.giftogether.co.kr/:path*",
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '**',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default withVanillaExtract(nextConfig);
