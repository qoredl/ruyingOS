/**
 * 开发环境
 * webpack打包配置文件
 */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 样式生成单独css文件插件
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const { appName, prodConfig: { entry, output } } = require('./webpack.config.js');

const devEntr=Object.assign({},entry, {
  app: entry.app.replace('app.js', 'app-dev.js'),
});

module.exports = {
  entry:devEntr,
  output: Object.assign(output, {
    chunkFilename: 'js/[name].chunk.js',
    sourceMapFilename: 'js/[name].map',
  }),
  devtool: 'cheap-module-source-map',
  //devtool: 'inline-source-map',
  //devtool: 'eval-source-map', // 调试工具
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: "babel-loader",
      
      options: {
        presets: ["stage-2", "react"],
        plugins: [
          ["import", { "libraryName": "antd", "style": true }],
          //Babel plugin to transpile import() to require.ensure, for Webpack.
          'dynamic-import-webpack',
          'transform-object-rest-spread', //对象扩展...obj
        ],
      },
    },
      
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader' //替换antd主题
        ]
      },
      
      //url-loader transforms image files. If the image size is smaller than 8192 bytes, it will be transformed into Data URL; otherwise, it will be transformed into normal URL. As you see, question mark(?) is used to pass parameters into loaders.
      {
        test: /\.(png|gif|jpe?g)$/i,
        loader: 'url-loader?name=images/[name].[ext]',
      },
      
      {
        test: /\.(svg|eot|woff|woff2|ttf|mp3|mp4|ogg|mpeg|webm)$/,
        loader: 'file-loader?name=source/[name].[ext]',
      },
    ]
  },
  
  //不打包此模块，而直接引入全局使用
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'redux': 'Redux',
    'react-redux': 'ReactRedux',
    'history/createHashHistory': 'History',
    'react-router-redux': 'ReactRouterRedux',
    'redux-saga': 'ReduxSaga',
    'react-router': 'reactRouter',
  },
  plugins: [
    //new ExtractTextPlugin(`${appName}/css/app.css`),//输出独立的css文件
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index-dev.html',
    }),
    //设置环境变量
    /*new webpack.DefinePlugin({
     'process.env': {
     'NODE_ENV': JSON.stringify(nodeEnv)
     }
     })*/
    /*new webpack.optimize.CommonsChunkPlugin({
     name: 'vendor',
     filename: 'js/vendor-[hash].min.js',
     }),*/
    /*new CopyWebpackPlugin([
     // {output}/to/file.txt
     { from: './src/'+appName+'/img', to: 'img' },
     ], {
     ignore: [
     // Doesn't copy any files with a txt extension
     //'*.txt',
     
     // Doesn't copy any file, even if they start with a dot
     //'**!/!*',
     
     // Doesn't copy any file, except if they start with a dot
     //{ glob: '**!/!*', dot: false }
     ],
     
     // By default, we only copy modified files during
     // a watch or webpack-dev-server build. Setting this
     // to `true` copies all files.
     copyUnmodified: true
     })*/
  ],
  
  // 解析模块请求的选项
  // （不适用于对 loader 解析）
  resolve: {
    // 用于查找模块的目录
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],
    // 使用的扩展名
    extensions: ['.js', '.json', '.jsx', '.less'],
    alias: {
      //'react': 'react',
    }
  },
};
