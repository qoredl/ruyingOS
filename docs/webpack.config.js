const path = require("path");
const webpack = require("webpack");
const babel=require('gulp-babel');
const glob=require('glob');

const config={
	// configuration
	entry: {
		test: './src/js/app/test/index.js',
	},
	output: {
		path: path.resolve(__dirname, "app/js"),
		filename: '[name].js',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {plugins: ['stage-2','react']},
				/*query: {
					//presets: ['es2015'],
					
					// All of the plugins of babel-preset-es2015,
					// minus babel-plugin-transform-es2015-modules-commonjs
					plugins: [
						'transform-es2015-template-literals',
						'transform-es2015-literals',
						'transform-es2015-function-name',
						'transform-es2015-arrow-functions',
						'transform-es2015-block-scoped-functions',
						'transform-es2015-classes',
						'transform-es2015-object-super',
						'transform-es2015-shorthand-properties',
						'transform-es2015-computed-properties',
						'transform-es2015-for-of',
						'transform-es2015-sticky-regex',
						'transform-es2015-unicode-regex',
						'check-es2015-constants',
						'transform-es2015-spread',
						'transform-es2015-parameters',
						'transform-es2015-destructuring',
						'transform-es2015-block-scoping',
						'transform-es2015-typeof-symbol',
						['transform-regenerator', { async: false, asyncGenerators: false }],
						/!*"stage-2",
						"react",*!/
					],
				},*/
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('app', 'lib.js')
	]
};

/*const files = glob.sync('./src/js/app/!*!/index.js');
const newEntries = files.reduce(function(memo, file) {
	const name = /.*\/(.*?)\/index\.js/.exec(file)[1];
	memo[name] = entry(name);
	return memo;
}, {});

config.entry = Object.assign({}, config.entry, newEntries);

/!**
 * [entry description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 *!/
function entry(name) {
	return './src/js/app/' + name + '/index.js';
}*/

module.exports=config;