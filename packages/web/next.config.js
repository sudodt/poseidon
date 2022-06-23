const withFonts = require('next-fonts');

module.exports = withFonts({
    enableSvg: true,
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: securityHeaders
          }
        ];
      },
    webpack(config, { dev, isServer }) {
        config.module.rules = config.module.rules.map(rule => {
            if (rule.test && rule.test.toString().includes('woff')) {
              return {
                ...rule,
                test: /\.(svg|ico|jpg|jpeg|png|gif|webp|cur|ani|pdf)(\?.*)?$/
              }
            }
            return rule
        });

        // if (!dev && !isServer) {
        //   Object.assign(config.resolve.alias, {
        //     "react" : "preact/compat",
        //     "react-dom" : "preact/compat",
        //     "react/jsx-runtime" : "preact/jsx-runtime",
        //   }) 
        // }

        return config
    },
    env: {
        API_DOMAIN: process.env.API_DOMAIN,
        API_VERSION: process.env.API_VERSION,
        NODE_: process.env.NODE_,
        APP_NAME: process.env.APP_NAME,
        APP_DOMAIN: process.env.APP_DOMAIN,
        STATIC: process.env.STATIC,
        NO_IMAGE: process.env.NO_IMAGE,
        USER_NO_IMAGE: process.env.USER_NO_IMAGE,
    },
    reactStrictMode: false,
    images: {
        domains: ['bdstotnhat.com', 'static.bdstotnhat.com'],
    },
    experimental: {
        turboMode: true
    },
})

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.youtube.com *.twitter.com cdn.usefathom.com;
  child-src *.youtube.com *.google.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  }
];