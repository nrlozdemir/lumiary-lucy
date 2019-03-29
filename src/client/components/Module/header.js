import React from 'react'
import PropTypes from 'prop-types'
import RealSelectFilters from 'Components/RealSelectFilters'
import style from './style.scss'

const HeaderModule = ({ key, title, subTitle, legend, filters }) => {
  return (
    <React.Fragment>
      <div className={style.headerTitle}>
        <h1>{title}</h1>
        {/* <h2>{subTitle}</h2> */}
      </div>
      <div className={style.headerLegend}>{legend}</div>
      <div className={style.headerFilters}>
        {filters.map((filter, index) => {
          return (
            <RealSelectFilters
              key={index}
              type={filter.type}
              selectKey={filter.selectKey}
              placeHolder={filter.placeHolder}
            />
          )
        })}
      </div>
    </React.Fragment>
  )
}

HeaderModule.propTypes = {
  selectKey: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.object,
  filters: PropTypes.array.isRequired,
}

export default HeaderModule
