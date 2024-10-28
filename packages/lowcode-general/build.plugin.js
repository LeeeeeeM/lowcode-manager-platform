const fs = require('fs-extra');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { INJECT_PARAMS } = require('common/inject/index.js');

const { version } = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.output.publicPath('/lowcode');
    // config.output.path(path.resolve(__dirname, 'dist'));
    config.resolve.plugin('tsconfigpaths').use(TsconfigPathsPlugin, [
      {
        configFile: './tsconfig.json',
      },
    ]);

    config.devServer.proxy({
      '/api/': {
        target: 'http://k8s.smartsteps.com:32679',
        changeOrigin: true,
      },
    });

    config.merge({
      node: {
        fs: 'empty',
      },
    });

    // config.output.merge({
    //   filename: (chunkData) => {
    //     // 根据 chunk 的名称来决定输出路径
    //     if (chunkData.chunk.name === 'activity') {
    //       return 'activity/[name].js';
    //     }
    //     return 'js/[name].js';
    //   }
    // });

    config.plugin('index').use(HtmlWebpackPlugin, [
      {
        inject: false,
        minify: false,
        templateParameters: {
          version,
        },
        template: require.resolve('./public/index.ejs'),
        filename: 'index.html',
      },
    ]);

    config.plugin('preview').use(HtmlWebpackPlugin, [
      {
        inject: false,
        minify: false,
        templateParameters: {},
        template: require.resolve('./public/preview.html'),
        filename: 'preview.html',
      },
    ]);

    config.plugin('activity').use(HtmlWebpackPlugin, [
      {
        inject: false,
        minify: false,
        templateParameters: {
          ...INJECT_PARAMS,
        },
        template: require.resolve('./public/activity.ejs'),
        filename: 'activity.html',
      },
    ]);

    config.plugins.delete('hot');
    config.devServer.hot(false);

    config.module // fixes https://github.com/graphql/graphql-js/issues/1272
      .rule('mjs$')
      .test(/\.mjs$/)
      .include.add(/node_modules/)
      .end()
      .type('javascript/auto');
  });
};
