import React from 'react'
import PropTypes from 'prop-types'
import ModuleSelectFilters from 'Components/ModuleSelectFilters'
import style from './style.scss'
import InformationModal from 'Components/Modal/Information'
import classnames from 'classnames'

class HeaderModule extends React.Component {
  render() {
    const {
      title,
      legend,
      filters,
      moduleKey,
      changeInfoStatus,
      infoShow,
      infoData,
      themes,
    } = this.props

    return (
      <React.Fragment>
        <div className={style.headerTitle}>
          <h1>{title}</h1>
          {infoData && (
            <i
              className={classnames('icon icon-Information', style.moduleInfo)}
              onClick={() => changeInfoStatus()}
              style={{ color: themes.textColor }}
            >
              <InformationModal
                width={840}
                isOpen={infoShow}
                closeTimeoutMS={300}
                onRequestClose={() => changeInfoStatus()}
                data={infoData}
              />
            </i>
          )}
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
}

HeaderModule.propTypes = {
  selectKey: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.object,
  filters: PropTypes.array,
}

export default HeaderModule
