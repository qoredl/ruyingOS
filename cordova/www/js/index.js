var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  
  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    //重定向到webapp首页,主要是用来测试用，生产环境请去掉此行代码
    window.location.replace('http://192.168.0.101:8086/');
    
    //this.receivedEvent('deviceready');
  },
  
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    //渲染app
    window.renderApp();
  }
};

app.initialize();