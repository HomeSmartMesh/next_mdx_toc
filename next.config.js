const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports =     withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  outDir: 'docs',
  basePath: '',
})
