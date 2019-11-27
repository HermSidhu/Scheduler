import React from 'react';
import 'components/DayListItem.scss'
import classNames from 'classnames';

export default function DayListItem(props) {

  function formatSpots(spotsRemaining) {
    if (spotsRemaining === 1) {
      return '1 spot remaining'
    } else if (spotsRemaining === 0) {
      return 'no spots remaining'
    } else {
      return `${spotsRemaining} spots remaining`
    }
  }

  let dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots,
  });

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayClass}
      data-testid='day'
    >
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li>
  )
};
