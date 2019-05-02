import React from 'react'
import PropTypes from 'prop-types'
import ModuleSelectFilters from 'Components/ModuleSelectFilters'
import style from './style.scss'
import ToolTip from 'Components/ToolTip'

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
  themes,
}) => {
  return (
    <React.Fragment>
      <div className={style.headerTitle}>
        <h1>{title}</h1>
        {/* <h2>{subTitle}</h2> */}
        <span
          className={style.moduleInfo}
          style={{
            color: themes.textColor,
            borderColor: themes.textColor,
          }}
          onMouseEnter={() => changeInfoStatus()}
          onMouseLeave={() => changeInfoStatus()}
        >
          i
          <ToolTip show={infoShow}>
            {infoText ||
              'This explains what this graph means and answers any questions a usermay potentially have.'}
          </ToolTip>
        </span>
      </div>
      {!!legend && <div className={style.headerLegend}>{legend}</div>}
      <div className={style.headerFilters}>
        {filters.map((filter, index) => {
          return (
            <ModuleSelectFilters
              key={index}
              type={filter.type}
              moduleKey={moduleKey}
              selectKey={filter.selectKey}
              placeHolder={filter.placeHolder}
              defaultValue={filter.defaultValue}
              themes={themes}
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
