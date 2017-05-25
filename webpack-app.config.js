/**
 * app环境
 * webpack打包配置文件
 */
const path = require("path");
const config = require('./webpack.config.js').prodConfig;

Object.assign(config, {
  entry: {
    app: config.entry.app.replace('app.js', 'app-render.js'),
  }
});
config.plugins.shift();
config.output.path = path.resolve(__dirname, './cordova/www/app');

module.exports = config;
