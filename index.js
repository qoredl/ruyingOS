/**
 * parse server
 */
var path = require('path');
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var config = require('./config');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/' + config.dbName,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || config.appId,
  masterKey: process.env.MASTER_KEY || config.masterKey, //Add your master key here. Keep it secret!
  restAPIKey: config.restAPIKey,
  javascriptKey: config.javascriptKey,
  serverURL: process.env.SERVER_URL || config.serverURL,  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

//使用管理控制面板
var allowInsecureHTTP = false;
app.use(
    '/admin',
    //可以使用apps属性定义多个应用,apps数组中每个元素代码一个应用
    new ParseDashboard({
      apps: [{
        serverURL: '/parse',
        appId: config.appId,
        masterKey: config.masterKey,
        appName: 'ruying',//应用名
        iconName: "icon.png",//应用图标
      }],
      iconsFolder: "icons",
      users: [
        {
          "user": "qoredl",
          "pass": "$2y$10$9Sr.lvA3/Pf/BvS2qBtvd.JO3kbX8PlNoMDE2km0uISg05h5Gbkwu"
        }
      ],
      useEncryptedPasswords: true,//是否启用字符串加密
      //trustProxy: 1,
    }, allowInsecureHTTP)
);

//index.html模板
const html=`<!doctype html>
<html lang="zh-cn">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>标题</title>

    <!--不超过 150 个字符且能准确反映网页内容的描述-->
    <meta name="description" content="描述">
    <!--唯一的关键字,使用人们可能会搜索，并准确描述网页上所提供信息的描述性和代表性关键字及短语。不应超过 874 个字符。-->
    <meta name="keywords" content="关键字">

    <!--
			all：文件将被检索，且页面上的链接可以被查询；
			none：文件将不被检索，且页面上的链接不可以被查询；
			index：文件将被检索；
			follow：页面上的链接可以被查询；
			noindex：文件将不被检索；
			nofollow：页面上的链接不可以被查询。
	 -->
    <meta name="robots" content="all" />

    <!-- UC强制全屏 -->
    <meta name="full-screen" content="yes">
    <!-- UC应用模式 -->
    <meta name="browsermode" content="application">
    <!-- QQ强制全屏 -->
    <meta name="x5-fullscreen" content="true">
    <!-- QQ应用模式 -->
    <meta name="x5-page-mode" content="app">

    <!-- 启用 WebApp 全屏模式 -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <!--隐藏状态栏/设置状态栏颜色：只有在开启WebApp全屏模式时才生效。content的值为default | black | black-translucent 。-->
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!--添加到主屏后的标题-->
    <meta name="apple-mobile-web-app-title" content="appName">

    <!--忽略数字自动识别为电话号码,忽略识别邮箱-->
    <meta content="telephone=no,email=no" name="format-detection">
    
    <link rel="shortcut icon" href="favicon.ico">
</head>

<body>
<div id="r-root"></div>
<script type="text/javascript" src="./app/js/app.js"></script></body>
</html>`;

// 静态资源文件夹
app.use('/app', express.static(path.join(__dirname, '/app')));
/*app.get('/app', function (req, res) {
  res.send(html);
});*/

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.send(html);
  //res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
  //重定向到app主页
  //res.status(200).redirect('app');
});

/**
 * 配置后备(fallback) URL
 * 在集成 React Router 之前，我们需要配置一下我们的开发服务器。 显然，我们的开发服务器无法感知配置在 React Router 中的 route。 比如：你想访问并刷新 /todos，由于是一个单页面应用，你的开发服务器需要生成并返回 index.html。 这里，我们将演示如何在流行的开发服务器上启用这项功能。
 */
/*app.get('/!*', (req,res) => {
 res.sendfile(path.join(__dirname, 'index.html'))
 });*/
// 在你应用 JavaScript 文件中包含了一个 script 标签
// 的 index.html 中处理任何一个 route
/*app.get('/!*', function (request, response){
 response.sendFile(path.join(__dirname, 'app', 'index.html'))
 });*/

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
/*app.get('/test', function (req, res) {
 res.sendFile(path.join(__dirname, '/public/test.html'));
 });*/

var port = process.env.PORT || config.port;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
