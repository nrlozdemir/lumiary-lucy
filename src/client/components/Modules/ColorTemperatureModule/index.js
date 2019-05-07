import React from 'react'
import PropTypes from 'prop-types'

import Module from 'Components/Module'
import ColorTemperatureChart from 'Components/ColorTemperatureChart'
import Legend from 'Components/Legend'

import cx from 'classnames'
import style from './styles.scss'

const renderLegend = (legend) => {
  if (!legend.length) {
    return null
  }

  return (
    <div className={style.headerLabel}>
      <div className={'d-flex align-items-center justify-content-center'}>
        {legend.map((item, idx) => (
          <Legend
            key={`colorTempLegend_${idx}`}
            color={item.color}
            label={item.label}
          />
        ))}
      </div>
    </div>
  )
}

const ColorTemperatureModule = ({
  data,
  moduleKey,
  title,
  action,
  filters,
  legend,
  labels,
  borderLess,
  verticalText,
  infoLabels,
  children,
  extraClasses,
  platforms,
  moduleClass,
  chartWrapperClass,
  noStaticTexts
}) => {
  return (
    <Module
      containerClass={moduleClass}
      bodyClass={style.moduleBody}
      moduleKey={moduleKey}
      title={title}
      action={action}
      legend={renderLegend(legend)}
      filters={filters}
    >
      <div className={style.colorChartContainer}>
        <div className={cx(extraClasses, style.colorChartContent)}>
          {!!data && !!data.length && (
            <ColorTemperatureChart
              chartWrapperClass={chartWrapperClass}
              infoLabels={infoLabels}
              colorTempData={data}
              borderLess={borderLess}
              verticalText={verticalText}
              noStaticTexts={noStaticTexts}
            />
          )}
        </div>
        {!!infoLabels && !!infoLabels.length && (
          <div className={style.infoWrapperContainer}>
            {infoLabels.map((info, idx) => (
              <div
                className={style.infoWrapper}
                key={`colorChart-infoText_${idx}`}
              >
                <div className={style.infoHandle}>
                  <span className={style.infoText}>{info}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {!!platforms && !!platforms.length && (
          <div className="d-flex align-items-center justify-content-center ph-48 mv-48">
            {platforms.map((platform, index) => (
              <div key={index} className="d-flex align-items-center mr-32">
                <span
                  className={style.round}
                  style={{ backgroundColor: `${platform.color}` }}
                />
                <p className={style.platformName}>{platform.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Module>
  )
}

ColorTemperatureModule.defaultProps = {
  data: [],
  infoLabels: [],
  legend: [],
  borderLess: false,
  verticalText: false,
  noStaticTexts: true
}

ColorTemperatureModule.propTypes = {
  data: PropTypes.any.isRequired,
  moduleKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.object,
  filters: PropTypes.array,
  borderLess: PropTypes.bool,
  noStaticTexts: PropTypes.bool,
  verticalText: PropTypes.bool,
  infoLabels: PropTypes.array,
  legend: PropTypes.array,
  wrapperClasses: PropTypes.string,
  platforms: PropTypes.array,
}

export default ColorTemperatureModule
