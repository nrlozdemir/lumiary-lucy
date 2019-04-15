import React from 'react'
import PropTypes from 'prop-types'
import RealSelectFilters from 'Components/RealSelectFilters'
import style from './style.scss'
import classnames from 'classnames'

const HeaderModule = ({
  key,
  title,
  subTitle,
  legend,
  filters,
  moduleKey,
  changeInfoStatus,
  infoShow,
  infoText,
}) => {
  return (
    <React.Fragment>
      <div className={style.headerTitle}>
        <h1>{title}</h1>
        {/* <h2>{subTitle}</h2> */}
        <span
          className={style.moduleInfo}
          onMouseEnter={() => changeInfoStatus()}
          onMouseLeave={() => changeInfoStatus()}
        >
          i
          <div
            className={classnames(style.moduleTooltip, infoShow && style.show)}
          >
            {infoText ||
              'This explains what this graph means and answers any questions a usermay potentially have.'}
          </div>
        </span>
      </div>
      {legend && <div className={style.headerLegend}>{legend}</div>}
      <div className={style.headerFilters}>
        {filters.map((filter, index) => {
          return (
            <RealSelectFilters
              key={index}
              type={filter.type}
              moduleKey={moduleKey}
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
