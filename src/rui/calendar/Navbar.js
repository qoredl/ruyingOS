const buttonBaseClass = 'r-calendar-nav r-calendar-nav';

export default function Navbar({
  className,
  showPreviousButton,
  showNextButton,
  onPreviousClick,
  onNextClick,
  dir,
}) {
  const previousClickHandler = dir === 'rtl' ? onNextClick : onPreviousClick;
  const nextClickHandler = dir === 'rtl' ? onPreviousClick : onNextClick;

  const previousButton = showPreviousButton &&
    <span
      role="button"
      key="previous"
      className={ `${buttonBaseClass}-prev` }
      onClick={ () => previousClickHandler() }
    />;

  const nextButton = showNextButton &&
    <span
      role="button"
      key="right"
      className={ `${buttonBaseClass}-next` }
      onClick={ () => nextClickHandler() }
    />;

  return (
    <div className={ className }>
      {dir === 'rtl' ? [nextButton, previousButton] : [previousButton, nextButton]}
    </div>
  );
}

Navbar.defaultProps = {
  className: 'DayPicker-NavBar',
  dir: 'ltr',
  showPreviousButton: true,
  showNextButton: true,
};
