import React from 'react'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import { ucfirst } from 'Utils'

const CreatedFilters = ({ report, brands }) => {
  const filteredBrand = brands.find((brand) => brand.uuid === report.brand)

  const filters = [
    {
      name: 'Brand',
      filteredName: !!filteredBrand ? filteredBrand.name : '',
    },
    {
      name: 'Platform',
      filteredName: !!report.social
        ? report.social === 'all'
          ? report.social + ' Platforms'
          : report.social
        : '',
    },
    {
      name: 'Engagement',
      filteredName: report.engagement,
    },
    {
      name: 'Date Range',
      filteredName: report.date === '3months' ? '3 Months' : report.date,
    },
  ]

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div className="grid-container col-12">
          <div className={style.filtersArea}>
            {filters.map((item, idx) => {
              return (
                <div
                  key={`bi-filter-${idx}`}
                  className={style.filtersAreaItem}
                  style={{
                    backgroundColor: colors.reportCardsBg,
                    color: colors.textColor,
                    boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
                    border: `1px solid ${colors.moduleBorder}`,
                  }}
                >
                  <p>{item.name}</p>
                  <span
                    style={{
                      backgroundColor: colors.reportCardContentBg,
                    }}
                  >
                    {ucfirst(!!item.filteredName && item.filteredName)}
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
