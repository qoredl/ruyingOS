/**
 * PickerInner
 * date:2016-12-15
 * update:2016-12-17
 */
import PickerColumn from './PickerColumn';

export default props => {
	const itemHeight = props.itemHeight;
	const highlightStyle = {
		height: itemHeight,
		marginTop: -(itemHeight / 2)
	};
	
	return (
			<div className="r-picker-inner">
				{renderInner()}
				<div className="r-picker-highlight" style={highlightStyle}></div>
			</div>
	);
	
	function renderInner() {
		const { optionGroups, valueGroups, itemHeight, height, onChange } = props;
		
		return Object.keys(optionGroups).map(name =>
				<PickerColumn
						itemHeight={itemHeight}
						columnHeight={height}
						key={name}
						name={name}
						value={valueGroups[name]}
						options={optionGroups[name]}
						onChange={onChange}/>);
	}
};