/**
 * 产品环境
 * webpack打包配置文件
 */

const path = require("path");
const webpack = require('webpack');
//加载样板html文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 样式生成单独css文件插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 图片压缩插件
const ImageminPlugin = require('imagemin-webpack-plugin').default;

//压缩es6
//const UglifyjsPlugin=require('uglifyjs-webpack-plugin');

//项目文件夹名,
//不同项目可改变文件夹名分别编译
const appName = 'app';

const entry = `./src/${appName}/app.js`;
const output = `./${appName}/`;

module.exports = {
  appName,
  
  // 生产环境打包配置文件
  prodConfig: {
    entry: {
      app: entry,
      //vendor: ['react','redux-saga'],
    },
    output: {
      path: path.resolve(__dirname, output),
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
      //表示资源的发布地址
      publicPath: './app/',
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: "babel-loader",
        options: {
          // "modules"设置为false  使webpack使用默认的模块处理，并使tree shaking生效（使用UglifyJsPlugin插件时去掉不使用的代码）
          presets: [
            ["es2015", { "modules": false }], "stage-2", "react"
          ],
          //presets: ["stage-2", "react"],
          plugins: [
            'transform-runtime',
            //Babel plugin to transpile import() to require.ensure, for Webpack.
            'dynamic-import-webpack',
            'transform-object-rest-spread', //对象扩展...obj
            ["import", { "libraryName": "antd", "style": true }],
          ],
        },
      },
        
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            publicPath: '',
            use: [
              { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
              'less-loader'
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
          test: /\.(svg|eot|woff|woff2|ttf)$/,
          loader: 'file-loader?name=fonts/[name].[ext]',
        },
      ]
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        filename: '../index.html',
        minify: { collapseWhitespace: true },
        template: './src/index.html',
      }),
      
      // 编译环境变量
      /* new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production'),
       __DEV__: false
       }), */
      //根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
      //new webpack.optimize.OccurrenceOrderPlugin(),
      
      //输出独立的css文件
      new ExtractTextPlugin({
        filename: '[name].css',
        //代码拆分下必需设置为true
        allChunks: true,
      }),
      //压缩es6
      //new UglifyjsPlugin(),
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
      /*new webpack.optimize.CommonsChunkPlugin({
       name: 'vendor',
       filename: 'vendor-[hash].min.js',
       }),*/
    ]
  }
};
