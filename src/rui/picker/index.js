/**
 * Picker
 * github: https://github.com/adcentury/react-mobile-picker
 * date:2016-12-15
 * update:2016-12-17
 */
import PickerInner from './PickerInner';

export default (props = {
	itemHeight: 36,
	height: 216
})=>{
	const pickerData=props.pickerData;
	
	return (
			<article className="r-picker" style={{height: props.height}}>
				<PickerInner
						{...props}
						optionGroups={pickerData.optionGroups}
						valueGroups={pickerData.valueGroups}/>
			</article>
	);
};