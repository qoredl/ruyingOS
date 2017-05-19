//导出生产环境打包配置文件
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.js').prodConfig;

Object.assign(config, {
  entry: {
    app: config.entry.app.replace('app.js', 'render-app.js'),
  }
});
config.plugins.shift();
config.output.path = path.resolve(__dirname, './cordova/www/app');

module.exports = config;
