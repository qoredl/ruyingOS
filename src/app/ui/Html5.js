/**
 * html5测试组件
 * date:2017-5-19
 */
import {Input} from 'antd';

var es = new EventSource('seversSendEvent');

  
  /* es.addEventListener('message', function(e) {
    fetchDataAction(e.data);
  }); */

export default ({msg,fetchDataAction})=>{
 es.onmessage = function(e) {
    fetchDataAction(e.data);
  };
  return <div>
    <h2>{msg}</h2>
    <form>
      <input type="text" required/>
      <button type="subbmit">提交</button>
    </form>
  </div>;
}
