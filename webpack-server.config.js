//服务器端渲染环境打包配置文件
const path = require("path");
const webpack = require("webpack");
// 样式生成单独css文件插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { appName, antdTheme, prodConfig: {output } } = require('./webpack.config.js');

module.exports = {
  entry: {
    server: `./src/${appName}/server.js`,
  },
  output: Object.assign(output, {
    filename: 'bin/[name].js',
    libraryTarget: "commonjs", // 作为 exports 的属性导出
  }),
  target: "node", // node.js 通过 require
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: "babel-loader",
        
        options: {
          presets: ["stage-2", "react"],
          plugins: [
            ["import", { "libraryName": "antd", "style": true }],
            'transform-object-rest-spread',//对象扩展...obj
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
      },
      
      //url-loader transforms image files. If the image size is smaller than 8192 bytes, it will be transformed into Data URL; otherwise, it will be transformed into normal URL. As you see, question mark(?) is used to pass parameters into loaders.
      {
        test: /\.(png|gif|jpe?g)$/i,
        loader: 'url-loader?name=images/[name].[ext]',
      },
      
      {
        test: /\.(svg|eot|woff|ttf)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin("bin/css/app.css"),//输出独立的css文件
  ]
};