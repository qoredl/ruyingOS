export default function ({ date, months, locale, localeUtils, onClick }) {
	return (
			<div className="r-calendar-caption" onClick={ onClick } role="heading">
				{ months ?
						`${date.getFullYear()} ${months[date.getMonth()]}`:
						localeUtils.formatMonthTitle(date, locale)
				}
			</div>
	);
}
