/**
 * PickerColumn
 * date:2016-12-15
 * update:2016-12-15
 */
export default class extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			isMoving: false,
			startTouchY: 0,
			startScrollerTranslate: 0,
			...this.computeTranslate(props)
		};
	}
	
	handleTouchStart = event => {
		const startTouchY = event.targetTouches[0].pageY;
		
		this.setState(({ scrollerTranslate }) => ({
			startTouchY,
			startScrollerTranslate: scrollerTranslate
		}));
	};
	
	handleTouchMove = event => {
		const touchY = event.targetTouches[0].pageY;
		
		event.preventDefault();
		this.setState(({ isMoving, startTouchY, startScrollerTranslate, minTranslate, maxTranslate }) => {
			if (!isMoving) {
				return {
					isMoving: true
				}
			}
			
			let nextScrollerTranslate = startScrollerTranslate + touchY - startTouchY;
			
			if (nextScrollerTranslate < minTranslate) {
				nextScrollerTranslate = minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8);
			} else if (nextScrollerTranslate > maxTranslate) {
				nextScrollerTranslate = maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8);
			}
			
			return {
				scrollerTranslate: nextScrollerTranslate
			};
		});
	};
	
	handleTouchEnd = () => {
		if (!this.state.isMoving) {
			return;
		}
		
		this.setState({
			isMoving: false,
			startTouchY: 0,
			startScrollerTranslate: 0
		});
		setTimeout(() => {
			const { options, itemHeight } = this.props;
			const { scrollerTranslate, minTranslate, maxTranslate } = this.state;
			let activeIndex;
			
			if (scrollerTranslate > maxTranslate) {
				activeIndex = 0;
			} else if (scrollerTranslate < minTranslate) {
				activeIndex = options.length - 1;
			} else {
				activeIndex = -Math.floor((scrollerTranslate - maxTranslate) / itemHeight);
			}
			this.onValueSelected(options[activeIndex]);
		}, 0);
	};
	
	handleTouchCancel = () => {
		if (!this.state.isMoving) {
			return;
		}
		
		this.setState((startScrollerTranslate) => ({
			isMoving: false,
			startTouchY: 0,
			startScrollerTranslate: 0,
			scrollerTranslate: startScrollerTranslate
		}));
	};
	
	handleItemClick = option => {
		if (option !== this.props.value) {
			this.onValueSelected(option);
		}
	};
	
	componentWillReceiveProps(nextProps) {
		if (this.state.isMoving) {
			return;
		}
		
		this.setState(this.computeTranslate(nextProps));
	}
	
	computeTranslate(props) {
		const { options, value, itemHeight, columnHeight } = props;
		let selectedIndex = options.indexOf(value);
		
		if (selectedIndex < 0) {
			// throw new ReferenceError();
			console.warn('Warning: "' + this.props.name + '" doesn\'t contain an option of "' + value + '".');
			this.onValueSelected(options[0]);
			selectedIndex = 0;
		}
		
		return {
			scrollerTranslate: columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
			minTranslate: columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
			maxTranslate: columnHeight / 2 - itemHeight / 2
		};
	}
	
	onValueSelected(newValue) {
		this.props.onChange(this.props.name, newValue);
		//((name,vaule)=>this.props.onChange(name,vaule))(this.props.name, newValue);
	}
	
	renderItems() {
		const { options, itemHeight, value } = this.props;
		
		return options.map(option => {
			const style = {
				height: itemHeight + 'px',
				lineHeight: itemHeight + 'px'
			};
			const className = `r-picker-item${option === value ? ' r-picker-item-selected': ''}`;
			
			return (
					<li
							className={className}
							style={style}
							onClick={() => this.handleItemClick(option)}>{option}</li>
			);
		});
	}
	
	render() {
		const translateString = `translate3d(0, ${this.state.scrollerTranslate}px, 0)`;
		const style = {
			MsTransform: translateString,
			MozTransform: translateString,
			OTransform: translateString,
			WebkitTransform: translateString,
			transform: translateString
		};
		
		if (this.state.isMoving) {
			style.transitionDuration = '0ms';
		}
		
		return (
				<div className="r-picker-column">
					<ul
							className="r-picker-scroller"
							style={style}
							onTouchStart={this.handleTouchStart}
							onTouchMove={this.handleTouchMove}
							onTouchEnd={this.handleTouchEnd}
							onTouchCancel={this.handleTouchCancel}>
						{this.renderItems()}
					</ul>
				</div>
		)
	}
}