/**
 * 消息提示组件
 * date:2017-3-15
 * update:2017-3-15
 */
import { Alert, } from 'antd';

export default props=> {
	const {flashName,...others}=props;
	return (<div className={'r-msg animated '+flashName}><Alert {...others}/></div>);
}

