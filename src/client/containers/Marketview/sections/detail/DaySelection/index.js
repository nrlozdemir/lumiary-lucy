import React from 'react'
import classnames from 'classnames'
import { ThemeContext } from 'ThemeContext/themeContext'
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
  'col-12-gutter-20 mt-48',
  style.container
)

export default ({ activeDay, onDayChange = () => {} }) => (
  <ThemeContext.Consumer>
    {({ themeContext: { colors } }) => (
      <React.Fragment>
        <style>
          {`.${style.dayButton}:hover{
							background-color: ${colors.duskBackground};
							color: ${colors.textColor};
						};
						.${style.selected}{
							background-color: ${colors.duskBackground};
							color: ${colors.textColor};
						};
					`}
        </style>
        <div className="grid-container">
          <div className={containerClassnames}>
            {DAYS.map((day, i) => (
              <button
                key={`day-button-${i}`}
                className={classnames(
                  style.dayButton,
                  activeDay === day ? style.selected : ''
                )}
                onClick={() => onDayChange(day)}
                style={{
                  border: `1px solid ${colors.daySelectionBorderColor}`,
                  backgroundColor:
                    activeDay === day ? colors.duskBackground : 'transparent',
                  color: activeDay === day ? colors.textColor : '#acb0be',
                }}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </React.Fragment>
    )}
  </ThemeContext.Consumer>
)
