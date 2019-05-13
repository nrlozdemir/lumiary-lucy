import React from 'react'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

const filters = [
  {
    name: 'Brand',
    filteredName: 'Scout Media',
  },
  {
    name: 'Platform',
    filteredName: 'All Platforms',
  },
  {
    name: 'Engagement',
    filteredName: 'Likes',
  },
  {
    name: 'Date Range',
    filteredName: 'Past Month',
  },
]

const CreatedFilters = () => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div className={style.filtersArea}>
          {filters.map((item, index) => {
            return (
              <div
                className={style.filtersAreaItem}
                style={{
                  backgroundColor: colors.moduleBackground,
                  color: colors.textColor,
                  boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
                  border: ` 1px solid ${colors.moduleBorder}`,
                }}
              >
                <p>{item.name}</p>
                <span
                  style={{
                    backgroundColor: colors.bodyBackground,
                  }}
                >
                  {item.filteredName}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default CreatedFilters
