/**
 * 模块私用ui组件
 * date:2017-1-15
 * update:2017-1-15
 */
import {
		SwitchTab,
		Picker,
		Calendar,
} from '../../../rui/index';
import Wrap from '../../ui/Wrap';

export default function (props) {
	const { switchTapData, pickerData, switchTabActionCreator, changePickerActionCreator,asyncActionCreator }=props;
	
	const onChange = actionFn => (key, value) => actionFn(key, value);
	
	return (
			<Wrap>
				<span onClick={asyncActionCreator}>点击异步获取数据</span>
				{/*日历时间拾取器*/}
				<Calendar onDayClick={ (e, day) => window.alert(day) }/>
				
				{/*内容切换框*/}
				<SwitchTab switchTapData={switchTapData} handerSwitchNav={switchTabActionCreator}/>
				
				{/*滚动项目拾取器 height:容器高度，itemHeight:每项高度*/}
				<Picker
						height={216} itemHeight={36}
						pickerData={pickerData}
						onChange={onChange(changePickerActionCreator)}/>
			</Wrap>);
};