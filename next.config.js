const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
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
  const css = {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-preset-mantine')(),
          require('postcss-simple-vars')({
            variables: {
              'mantine-breakpoint-xs': '36em',
              'mantine-breakpoint-sm': '48em',
              'mantine-breakpoint-md': '62em',
              'mantine-breakpoint-lg': '75em',
              'mantine-breakpoint-xl': '88em',
            },
          }),
        ],
      },
    },
  };

  return {
    i18n,
    reactStrictMode: true,
    trailingSlash: true,
    swcMinify: false,
    env,
    // css,
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
