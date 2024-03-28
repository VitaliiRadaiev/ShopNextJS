/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: [{
                loader: '@svgr/webpack',
                options: {
                    dimensions: false
                }
            }],
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8001'
            },
            {
                protocol: 'http',
                hostname: '45.83.123.74',
                port: '8001'
            },
        ]
    },
    reactStrictMode: false
};

export default nextConfig;
