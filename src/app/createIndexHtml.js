/**
 * index.html模板
 * @date:2017-5-6
 */
import {
  addData,
  getData
} from './servers/homeServer';

//生产环境
let devJ='';
if (process.env.NODE_ENV !== 'production') {
  devJ=`<script src="node_modules/react/dist/react.min.js"></script>
<script src="node_modules/react-dom/dist/react-dom.min.js"></script>
<script src="node_modules/react-router/umd/react-router.min.js"></script>
<script src="node_modules/react-router-dom/umd/react-router-dom.min.js"></script>
<script src="node_modules/redux/dist/redux.min.js"></script>
<script src="node_modules/react-redux/dist/react-redux.min.js"></script>
<script src="node_modules/history/umd/history.min.js"></script>
<script src="node_modules/react-router-redux/umd/react-router-redux.min.js"></script>
<script src="node_modules/redux-saga/dist/redux-saga.min.js"></script>`;
}

export default (state, renderComps) =>async (url)=> {
  //服务器端状态与客户端同步
  const data=await getData();
  Object.assign(state,{homeState:{data}});
  
  const htmlStr=renderComps(url);
  
  return `<!doctype html>
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
    <link rel="stylesheet" href="./app/css/app.css">
</head>

<body>
<div id="r-root">${htmlStr}</div>
<script>window.__initState__=${JSON.stringify(state)}</script>${devJ}
<script src="./app/js/app.js"></script></body>
</html>`
}