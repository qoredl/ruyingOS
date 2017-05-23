/**
 * html5测试组件
 * date:2017-5-19
 */
import React from 'react';
import { baseUrl } from '../../../config';

//const b = navigator.sendBeacon('beacon', 'ok111net');
//console.log(b);

//const origin = location.origin;
//const pathname = location.pathname;

export default class Html5 extends React.PureComponent {
  state = {
    time: '',
    url: '',
  };
  
  constructor(props) {
    super(props);
  }
  
  handleMessage = () => {
    //sever-send-event
    const es = new EventSource(`${baseUrl}/seversSendEvent`);
    es.addEventListener('message', e => this.setState({ time: e.data }));
  };
  
  componentDidMount() {
    
    this.handleMessage();
    
    
    
    //todo:webRTC 在app上测试未成功
    /*navigator.getUserMedia({
      video: true,
      audio: true
    }, (stream) => {
      let url = window.URL.createObjectURL(stream);
    
      console.log(stream, `url:${url}`);
    
      //本地路文件路径系统，如手机app下
      if (location.origin === 'file://') {
        url = 'blob:' + location.origin + location.pathname.slice(0, -10) + url.slice(13);
      }
    
      this.setState({ url });
    
      console.log(`url:${url}`);
      console.log(`origin:${location.origin}`);
      console.log(`href:${location.href}`);
      console.log(`pathname:${location.pathname}`);
    }, (e) => {
      this.setState({ url: '' });
      console.log(e.message);
    });*/
  }
  
  render() {
    return <div>
      <h2>{this.state.time}</h2>
      {/*<video src={this.state.url} controls autoPlay style={{width:'100%',height:'auto'}}></video>*/}
      <video src={require('../media/m.mp4')} controls autoPlay style={{width:'100%',height:'auto'}}></video>
      <form>
        <input type="text" required/>
        <button type="subbmit">提交</button>
      </form>
      
    </div>
  }
}
