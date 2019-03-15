import React from 'react'
import classnames from 'classnames'

import style from './style.scss'

const DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

const containerClassnames = classnames(
  'col-12-gutter-20 mt-16',
  style.container
)

export default ({ activeDay, onDayChange = () => {} }) => (
  <div className="grid-container">
    <div className={containerClassnames}>
      {DAYS.map((day, i) => (
        <button
          key={`day-button-${i}`}
					className={classnames(style.dayButton, activeDay === day ? style.selected : '')}
					onClick={() => onDayChange(day)}
        >
          {day}
        </button>
      ))}
    </div>
  </div>
)
