/**
 * webpack打包公共配置文件
 */
const path = require("path");
const webpack = require('webpack');

//加载样板html文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 样式生成单独css文件插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 图片压缩插件
const ImageminPlugin = require('imagemin-webpack-plugin').default;

//项目文件夹名,
//不同项目可改变文件夹名分别编译
const appName = 'app';

const entry = `./src/${appName}/app.js`;
//const output = `./${appName}/`;
const output = `./`;

//antd主题设置
const antdTheme=JSON.stringify({ "primary-color": "#0e90d2"});

module.exports = {
  appName,
  antdTheme,
  
  // 生产环境打包配置文件
  prodConfig: {
    entry: {
      app: entry,
      //vendor: ['react','redux-saga'],
    },
    output: {
      path: path.resolve(__dirname, output),
      filename: `${appName}/js/[name].js`,
      chunkFilename: `${appName}/js/[name].[chunkhash:5].chunk.js`,
      publicPath: '',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [
            path.resolve(__dirname, 'node_modules')
          ],
          loader: "babel-loader",
          options: {
            // "modules"设置为false  使webpack使用默认的模块处理，并使tree shaking生效（使用UglifyJsPlugin插件时去掉不使用的代码）
            presets: [["es2015", { "modules": false }], "stage-2", "react"],
            plugins: [
              'transform-runtime',
              //Babel plugin to transpile import() to require.ensure, for Webpack.
              'dynamic-import-webpack',
              'transform-object-rest-spread',//对象扩展...obj
              ["import", { "libraryName": "antd", "style": true }],
            ],
          },
        },
        
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              { loader: 'css-loader', options: { importLoaders: 1 } },
              `less-loader?{"modifyVars":${antdTheme}}`//替换antd主题
            ]
          }),
          /*use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            `less-loader?{"modifyVars":${antdTheme}}`//替换antd主题
          ]*/
        },
        
        //url-loader transforms image files. If the image size is smaller than 8192 bytes, it will be transformed into Data URL; otherwise, it will be transformed into normal URL. As you see, question mark(?) is used to pass parameters into loaders.
        {
          test: /\.(png|gif|jpe?g)$/i,
          //小于8kb的图片直接base64编码到css中
          loader: 'url-loader?limit=8192&name=images/[name].[ext]',
        },
        
        {
          test: /\.(svg|eot|woff|ttf)$/,
          loader: 'file-loader?name=fonts/[name].[ext]',
        },
      ]
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        minify: { collapseWhitespace: true },
        template: './src/index.html',
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor-[hash].min.js',
      }),
      new ExtractTextPlugin(`${appName}/app.css`),//输出独立的css文件
      //压缩png图片
      new ImageminPlugin({
        test: ['images/*.png', 'images/*/*.png'],
        /*pngquant: {
         quality: '90-100'
         },*/
        optipng: {
          optimizationLevel: 6
        }
      }),
    ]
  }
};