export default function({
  firstDayOfWeek,
  weekdaysLong,
  weekdaysShort,
  locale,
  localeUtils,
  weekdayElement,
}) {
  const days = [];
  
  for (let i = 0; i < 7; i++) {
    const weekday = (i + firstDayOfWeek) % 7;
    const elementProps = {
      key: i,
      className: 'r-calendar-weekday',
      weekday,
      weekdaysLong,
      weekdaysShort,
      localeUtils,
      locale,
    };
    const element = React.cloneElement(weekdayElement, elementProps);
    
    days.push(element);
  }

  return (
    <ul className="r-calendar-weekdays" role="rowgroup">
	    {days}
    </ul>);
};
