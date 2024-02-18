const webpack = require('webpack');
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')
      .options({
        /* ... */
      });
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/variables.scss";`,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // allow access to process.env from within the vue app
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ],
  },
};
