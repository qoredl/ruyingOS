/* eslint-disable jsx-a11y/no-static-element-interactions, react/forbid-prop-types */

function handleEvent(handler, day, modifiers) {
  if (!handler) {
    return undefined;
  }
  const dayState = {};
  modifiers.forEach((modifier) => { dayState[modifier] = true; });
  return (e) => {
    e.persist();
    handler(e, day, dayState);
  };
}

export default function Day({
  day,
  //tabIndex,
  empty,
  modifiers,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
  onTouchStart,
  onTouchEnd,
  onFocus,
  ariaLabel,
  ariaDisabled,
  ariaSelected,
  children,
}) {
  let className = 'r-calendar-day';
  className += modifiers.map(modifier => ` ${className}-${modifier}`).join('');
  if (empty) {
    return <div role="gridcell" aria-disabled className={ className } />;
  }
  return (
    <span
      className={ className }
      role="gridcell"
      aria-label={ ariaLabel }
      aria-disabled={ ariaDisabled.toString() }
      aria-selected={ ariaSelected.toString() }
      onClick={ handleEvent(onClick, day, modifiers) }
      onKeyDown={ handleEvent(onKeyDown, day, modifiers) }
      onMouseEnter={ handleEvent(onMouseEnter, day, modifiers) }
      onMouseLeave={ handleEvent(onMouseLeave, day, modifiers) }
      onTouchEnd={ handleEvent(onTouchEnd, day, modifiers) }
      onTouchStart={ handleEvent(onTouchStart, day, modifiers) }
      onFocus={ handleEvent(onFocus, day, modifiers) }
    >
      {children}
    </span>
  );
}

Day.defaultProps = {
  modifiers: [],
  empty: false,
};
