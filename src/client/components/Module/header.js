import React from 'react'
import PropTypes from 'prop-types'
import ModuleSelectFilters from 'Components/ModuleSelectFilters'
import style from './style.scss'
import ToolTip from 'Components/ToolTip'
import InformationModal from 'Components/Modal/Information'
import classnames from 'classnames'

const HeaderModule = ({
  title,
  legend,
  filters,
  moduleKey,
  changeInfoStatus,
  infoShow,
  setModalShow,
  modalShow,
  themes,
  global: { sections: sectionExplanations },
  getSectionExplanationsRequest,
}) => {
  return (
    <React.Fragment>
      <div className={style.headerTitle}>
        <h1>{title}</h1>
        <i
          className={classnames('icon icon-Information', style.moduleInfo)}
          onMouseEnter={() => changeInfoStatus()}
          onMouseLeave={() => changeInfoStatus()}
          style={{ color: themes.textColor }}
        >
          <ToolTip show={infoShow} onClick={() => setModalShow(true)}>
            Learn More
          </ToolTip>
        </i>
        {modalShow && (
          <InformationModal
            width={840}
            isOpen={modalShow}
            closeTimeoutMS={300}
            onRequestClose={() => setModalShow(false)}
            onAfterOpen={() => {
              if (sectionExplanations && !sectionExplanations[moduleKey]) {
                getSectionExplanationsRequest({ key: moduleKey })
              }
            }}
            options={
              (sectionExplanations && sectionExplanations[moduleKey]) || []
            }
          />
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

HeaderModule.propTypes = {
  selectKey: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.object,
  filters: PropTypes.array,
}

export default HeaderModule
