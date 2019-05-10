import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import RadarChart from 'Components/Charts/RadarChart'
import { Progress } from './Progress'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

const RadarChartModule = ({
  data,
  moduleKey,
  title,
  action,
  filters,
  legend,
  leftTitle,
  rightTitle,
}) => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <Module
          moduleKey={moduleKey}
          title={title}
          action={action}
          filters={filters}
          legend={legend}
        >
          {!!data && !!data.length && (
            <div
              className={style.radarChartContainer}
              style={{ color: colors.textColor }}
            >
              <div className={style.groupChart}>
                <div className={style.chartPos}>
                  <RadarChart data={data[0].datas} />
                </div>
                <div className={style.chartPos}>
                  <RadarChart data={data[1].datas} />
                </div>
              </div>
              <div className={'mt-32 ' + style.labelContainer}>
                <div
                  className={style.label}
                  style={{
                    background: colors.labelBackground,
                    color: colors.labelColor,
                    boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                  }}
                >
                  <span>{leftTitle}</span>
                </div>
                <p>
                  Top{' '}
                  {!!data[0] && !!data[0].progress && data[0].progress.length}{' '}
                  Dominant Colors
                </p>
                <div
                  className={style.label}
                  style={{
                    background: colors.labelBackground,
                    color: colors.labelColor,
                    boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                  }}
                >
                  <span>{rightTitle}</span>
                </div>
              </div>
              <div className={style.groupProgressBar}>
                <div className={style.progressInner}>
                  <Progress progress={data[0].progress} reverse={true} />
                </div>
                <div className={style.progressCountArea}>
                  {!!data[0] &&
                    !!data[0].progress &&
                    data[0].progress.length &&
                    data[0].progress.map((item, index) => {
                      return (
                        <span
                          key={`progressbar-${index}`}
                          className={style.progressCount}
                          style={{
                            background: colors.progressCountBackground,
                            color: colors.textColor,
                          }}
                        >
                          {index + 1}
                        </span>
                      )
                    })}
                </div>
                <div className={style.progressInner}>
                  <Progress progress={data[1].progress} />
                </div>
              </div>
            </div>
          )}
        </Module>
      )}
    </ThemeContext.Consumer>
  )
}

RadarChartModule.propTypes = {
  data: PropTypes.any.isRequired,
  moduleKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.object,
  filters: PropTypes.array,
}

export default RadarChartModule
