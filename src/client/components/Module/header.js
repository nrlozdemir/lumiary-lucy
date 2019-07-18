import React from 'react'
import PropTypes from 'prop-types'
import ModuleSelectFilters from 'Components/ModuleSelectFilters'
import style from './style.scss'
import ToolTip from 'Components/ToolTip'
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
  themes,
}) => {
  return (
    <React.Fragment>
      <div className={style.headerTitle}>
        <h1>{title}</h1>
        {/* <h2>{subTitle}</h2> */}
        <React.Fragment>
          {infoText && (
            <React.Fragment>
              <i
                className={classnames('icon icon-Information', style.moduleInfo)}
                style={{ color: themes.textColor }}
                data-tip={infoText ||
                  'This explains what this graph means and answers any questions a usermay potentially have.'}
                >
                </i>
              <ToolTip effect="solid" largeTooltip />
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
      {!!legend && <div className={style.headerLegend}>{legend}</div>}
      {filters && filters.length ? (
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
                selectClasses={
                  (filter.type === 'platformEngagement' ||
                    filter.type === 'propertyEngagement') &&
                  'custom-select combine-select'
                }
                inModuleFilter
              />
            )
          })}
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

HeaderModule.propTypes = {
  selectKey: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.object,
  filters: PropTypes.array,
}

export default HeaderModule
