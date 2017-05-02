'use strict';
const gulp = require('gulp');
const babel=require('gulp-babel');
const uglify = require('gulp-uglify');//js压缩插件
const pump = require('pump');//js压缩插件
const minfycss = require('gulp-minify-css');//css压缩插件
const htmlmin = require('gulp-htmlmin');//css压缩插件
const sourcemaps = require('gulp-sourcemaps');//sourcemaps
const imagemin = require('gulp-imagemin');//图片压缩插件
const clean=require('gulp-clean');//png压缩插件
const rename = require('gulp-rename');//重命名插件
const less = require('gulp-less');//less插件
const pngquant=require('imagemin-pngquant');//png压缩插件
const concat=require('gulp-concat');//png压缩插件

//rollup
var rollup = require('gulp-better-rollup');
var rollupBabel = require('rollup-plugin-babel');

/*markdown生成html文档*/
const markdown=require('gulp-markdown');//markdown to html插件
const markdow2page=require('./glup-plugin/gulp-markdown-page');//生成符合标准的html5文档
const highlight=require('./glup-plugin/highlight.pack.js');

/*配置*/
const config = {
	path: {
		copy: ['src/fonts/*'/*'src/media/!*'*/],
		concat: [
			'src/js/lib/react.min.js',
			'src/js/lib/react-dom.min.js',
			'src/js/lib/ReactRouter.min.js',
			'src/js/lib/redux.min.js',
			'src/js/lib/react-redux.min.js',
				
			'dist/lib/app.js',
		],
		less: [
			'src/less/**/*.less',
			'src/less/**/*.css',
			'!src/less/rui/*',
			'!src/less/pub-var/*',
			'!src/less/**/var/*',
			'!src/less/rui-bak/*'
		],
		css: [
			'dist/css/**/*.css',
			'!dist/css/**/*.min.css'
		],
		img:'src/images/**',
		src: [
				'src/js/**/*.js',
				
			//'!src/js/app/app.js',
			'!src/js/lib/*',
			'!src/js/pub-var/*',
			'!src/js/redux/*',
			
			'!src/js/lib/*.min.js',
			'!src/js/mobiscroll/*',
			'!src/js/rui/*',
			'!src/js/ruying/*',
		],
		js: ['app/js/**/*.js', '!app/js/**/*.min.js'],
		html: ['src/*.html'],
		md: ['src/js/**/*.md'],
		
		rollupLib:[
			//'dist/ruying/ruying.js',
			//'dist/rui/rui.js',
			'dist/redux/redux.js',
			'dist/app/app.js',
		],
		rollup:[
			'dist/app/template/template.js',
			//'dist/app/indexdb/indexdb.js',
			//'dist/app/maxleap/maxleap.js',
		],
		
		/*oa: ['oa/less/!**!/!*.less','!oa/less/var.less'],
		flass: ['flass/less/!**!/!*.less','!flass/less/var.less']*/
	},
	
	dest: {
		app: 'app',
		css: 'app/css',
		img:'app/images',
		js: 'app/js',
		md: 'app/docs',
		dist:'dist',
		distCss:'dist/css',
		lib: 'dist/lib',

		/*oa: 'oa/css',
		flass: 'flass/css'*/
	},
	
	options:{
		/*markdown插件设置项*/
		md:{
			langPrefix: 'javascript',
			highlight: function (code) {
				return highlight.highlightAuto(code).value;
			}
		}
	}
};

/*默认任务*/
gulp.task('default',['copy','min-css','min-img','min-html','md2thml','concat']);

//清空目录
gulp.task('clean-app', function() {
	return gulp.src([config.dest.app,config.dest.dist],{read: false})
			.pipe(clean());
});

//拷贝必要文件
gulp.task('copy',  function() {
	return gulp.src(config.path.copy,{ base:'./src'})
			.pipe(gulp.dest(config.dest.app));
});

//less编译
gulp.task('less', function() {
	return gulp.src(config.path.less)
			.pipe(less())
			.pipe(gulp.dest(config.dest.distCss));
});

/*压缩css*/
gulp.task('min-css', ['less'], function() {
	return gulp.src(config.path.css)
			.pipe(minfycss())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(config.dest.css));
});

/*压缩图片*/
gulp.task('min-img', function() {
	return gulp.src(config.path.img)
			.pipe(imagemin({
				progressive:true,
				svgoPlugins:[{removeViewBox:false}],
				use:[pngquant()]
			}))
			.pipe(gulp.dest(config.dest.img));
});

/*压缩html*/
gulp.task('min-html', function() {
	return gulp.src(config.path.html)
			.pipe(htmlmin({collapseWhitespace: true}))
			.pipe(gulp.dest(config.dest.app));
});

//编译es2015
gulp.task('babel-js', () => {
	return gulp.src(config.path.src)
			.pipe(babel({
				presets: ["stage-2","react"]
			}))
			.pipe(gulp.dest(config.dest.dist));
});

//rollup打包js
gulp.task('rollup-lib', ['babel-js'],function() {
	return gulp.src(config.path.rollupLib)
			.pipe(sourcemaps.init())
			.pipe(rollup({
				// notice there is no `entry` option as rollup integrates into gulp pipeline
				plugins: [rollupBabel()]
			}, {
				// also rollups `sourceMap` option is replaced by gulp-sourcemaps plugin
				format: 'iife',
				sourceMap: 'inline',
				//entry: 'src/app.js'
			}))
			.pipe(sourcemaps.write())
			// inlining the sourcemap into the exported .js file
			.pipe(gulp.dest(config.dest.lib))
});
gulp.task('rollup-app', ['babel-js'],function() {
	return gulp.src(config.path.rollup)
			.pipe(sourcemaps.init())
			.pipe(rollup({
				// notice there is no `entry` option as rollup integrates into gulp pipeline
				plugins: [rollupBabel()]
			}, {
				// also rollups `sourceMap` option is replaced by gulp-sourcemaps plugin
				format: 'iife',
				sourceMap: 'inline',
				//entry: 'src/app.js'
			}))
			.pipe(sourcemaps.write())
			// inlining the sourcemap into the exported .js file
			.pipe(gulp.dest(config.dest.js))
});

/*压缩js*/
/*gulp.task('min-js',function() {
	return gulp.src(config.path.js)
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(config.dest.js));
});*/

/*gulp.task('min-js', function (cb) {
	pump([
				gulp.src(config.path.js),
				uglify(),
				rename({suffix: '.min'}),
				gulp.dest(config.dest.js)
			],
			cb
	);
});*/

/*合并js*/
gulp.task('concat',['rollup-lib','rollup-app'], function() {
	return gulp.src(config.path.concat)
			.pipe(concat('app.js',{newLine: ';'}))
			.pipe(gulp.dest(config.dest.js));
});


/*markdown2thml*/
gulp.task('md2thml', function() {
	return gulp.src(config.path.md)
			.pipe(markdown(config.options.md))
			.pipe(markdow2page({
				title:'markdown template',
				des:'markdown template',
				key:'markdown template',
				cssPath:{
					base:'/app/css/rui.css',
					typeCss:'/app/css/code.css'
				}
			}))
			.pipe(gulp.dest(config.dest.md));
});




//oaless编译
/*gulp.task('oa-less', function() {
	return gulp.src(config.path.oa)
			.pipe(less())
			.pipe(gulp.dest(config.dest.oa));
});*/

//flass编译
/*gulp.task('flass', function() {
	return gulp.src(config.path.flass)
			.pipe(less())
			.pipe(gulp.dest(config.dest.flass));
});*/


/*监控less文件*/
/*const flassLessWatch = gulp.watch(config.path.flass, ['flass']);
flassLessWatch.on('change', function(e) {
 console.log('文件：' + e.path + '发生' + e.type + '变化,自动任务运行...');
 });*/

/*监控js文件*/
/*
const jsWatch = gulp.watch(config.path.js, ['min-js']);
jsWatch.on('change', function(e) {
	console.log('文件：' + e.path + '发生' + e.type + '变化,自动任务运行...');
});*/
