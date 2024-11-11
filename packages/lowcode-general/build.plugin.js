const fs = require('fs-extra');
// const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { INJECT_PARAMS, DEVELOP_COMPONENT_URL } = require('common/inject/index.js');
const webpack = require('webpack');

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

    // 替换为我的包
    config.resolve.alias.set('@alilc/lowcode-renderer-core', '@evilemon/lowcode-renderer-core');

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

    config.plugin('define').use(webpack.DefinePlugin, [
      {
        MODE: JSON.stringify(process.env.NODE_ENV),
      },
    ]);

    // config.plugin('string-replace').use(StringReplacePlugin, [
    //   {
    //     replacements: [
    //       {
    //         pattern: /@alilc\/lowcode-renderer-core/g, // 要替换的字符串（正则表达式）
    //         replacement: '@evilemon/lowcode-renderer-core', // 替换后的字符串
    //       },
    //     ],
    //   },
    // ]);

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
          env: process.env.NODE_ENV === 'development' ? DEVELOP_COMPONENT_URL : '..'
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
