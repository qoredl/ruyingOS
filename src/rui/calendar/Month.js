import Weekdays from './Weekdays';
import { getWeekArray } from './Helpers';

export default function ({
		month,
		months,
		weekdaysLong,
		weekdaysShort,
		locale,
		localeUtils,
		captionElement,
		onCaptionClick,
		children,
		firstDayOfWeek,
		className,
		wrapperClassName,
		weekClassName,
		weekdayElement,
		fixedWeeks,
}) {
	const captionProps = {
		months,
		localeUtils,
		locale,
		date: month,
		onClick: onCaptionClick ? e => onCaptionClick(e, month): undefined,
	};
	const weeks = getWeekArray(month, firstDayOfWeek, fixedWeeks);
	
	return (
			<div className={ className }>
				{React.cloneElement(captionElement, captionProps)}
				
				<Weekdays
						weekdaysShort={ weekdaysShort }
						weekdaysLong={ weekdaysLong }
						firstDayOfWeek={ firstDayOfWeek }
						locale={ locale }
						localeUtils={ localeUtils }
						weekdayElement={ weekdayElement }/>
				
				<ul className={ wrapperClassName } role="grid">
					{ weeks.map((week, j) =>
								<li key={ j } className={ weekClassName } role="gridcell">
									{week.map(day => children(day, month))}
								</li>,
						)}
				</ul>
			</div>
	);
};