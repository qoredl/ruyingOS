/**
 * webpack打包公共配置文件
 */
const path = require("path");


const output=`./app/`;

module.exports={
	entry:{
		app:'./test/index.js',
	},
	output: {
		path: path.resolve(__dirname, output),
		filename: '[name].js',
		publicPath: './',
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
					presets: [["es2015", {"modules":false}],"stage-2", "react"],
					plugins: [
						'transform-runtime',
						'transform-object-rest-spread',//对象扩展...obj
						["import", { "libraryName": "antd", "style": true }],
					],
				},
			},
			
		]
	},
};