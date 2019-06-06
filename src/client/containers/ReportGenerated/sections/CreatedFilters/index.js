import React from 'react'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

const CreatedFilters = ({ report, brands }) => {
  const filters = [
    {
      name: 'Brand',
      filteredName: brands.find((brand) => brand.uuid === report.brands[0])
        .name,
    },
    {
      name: 'Platform',
      filteredName: report.social,
    },
    {
      name: 'Engagement',
      filteredName: report.engagement,
    },
    {
      name: 'Date Range',
      filteredName: report.date,
    },
  ]

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div className="grid-container col-12 mt-72">
          <div className={style.filtersArea}>
            {filters.map((item, idx) => {
              return (
                <div
                  key={`bi-filter-${idx}`}
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
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default CreatedFilters
