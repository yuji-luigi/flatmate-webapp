const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
const StyleLintPlugin = require('stylelint-webpack-plugin');

/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    NEXT_PUBLIC_API_URL: (() => {
      if (isDev) return 'http://generic.host:5001/api/v1';
      if (isProd) return 'https://flatmates-api.yuji-luigi.com/api/v1';
      if (isStaging) return 'http://generic.host:5001/api/v1';
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
    NEXT_PUBLIC_FRONTEND_URL: (() => {
      if (isDev) return 'http://generic.host:3000';
      if (isProd) return 'https://flatmates.yuji-luigi.com';
      if (isStaging) return 'http://generic.host:3000';
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
    NEXT_PUBLIC_SSG_SECRET: 'secretforssgishereman%^()_',
  };
  // function webpack(config, options) {
  //   // Enables source map for development
  //   if (!options.isServer && options.dev) {
  //     config.module.rules.push({
  //       test: /\.(css|scss)/,
  //       use: [
  //         {
  //           loader: 'css-loader',
  //           options: {
  //             sourceMap: true,
  //           },
  //         },
  //         {
  //           loader: 'sass-loader',
  //           options: {
  //             sourceMap: true,
  //           },
  //         },
  //       ],
  //     });
  //   }
  //   // config.plugins.push(
  //   //   new StyleLintPlugin({
  //   //     files: 'src/**/*.(css|scss)', // Adjust this path to match your project structure
  //   //     // Other stylelint-webpack-plugin options
  //   //   })
  //   // );

  //   // Update the CSS/SCSS loader rules
  //   config.module.rules.push({
  //     test: /\.(css|scss)$/,
  //     use: [
  //       'style-loader',
  //       {
  //         loader: 'css-loader',
  //         options: {
  //           importLoaders: 1,
  //           sourceMap: true, // Enable source maps
  //         },
  //       },
  //       'sass-loader',
  //     ],
  //   });
  //   return config;
  // }

  return {
    i18n,
    // trailingSlash: true,
    swcMinify: true,
    env,
    // webpack,
    reactStrictMode: false,

    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    images: {
      domains: [
        'flatmates-api.yuji-luigi.com',
        'flatmates.eu-central-1.linodeobjects.com',
        'fastly.picsum.photos',
        'picsum.photos',
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
};

module.exports = nextConfig;
