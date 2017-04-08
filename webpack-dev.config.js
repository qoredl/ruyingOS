//开发环境打包配置文件
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const {appName,prodConfig:{entry,output}}=require('./webpack.config.js');

module.exports={
	entry,
	output: Object.assign(output,{
		chunkFilename: 'js/[name].chunk.js',
		sourceMapFilename: 'js/[name].map'
	}),
	devtool: 'cheap-module-source-map',
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
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'less-loader'
				]
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
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template:'./src/index.html',
		}),
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
	]
};