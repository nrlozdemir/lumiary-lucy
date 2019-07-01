import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import RadarChart from 'Components/Charts/RadarChart'
import { Progress } from './Progress'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import emptyData from './emptyData.json'

const RadarChartModule = ({
  data,
  moduleKey,
  title,
  action,
  filters,
  legend,
  leftTitle,
  rightTitle,
  loading = false,
  infoText,
}) => {
  let checkData =
    !data || !data.length || (data.length && (!data[0] || !data[1]))
      ? emptyData
      : data

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <Module
          moduleKey={moduleKey}
          title={title}
          action={action}
          filters={filters}
          legend={legend}
          isEmpty={
            !data || !data.length || (data.length && (!data[0] || !data[1]))
          }
          loading={loading}
          infoText={infoText}
        >
          <div
            className={style.radarChartContainer}
            style={{ color: colors.textColor }}
          >
            <div className={style.groupChart}>
              <div className={style.chartPos}>
                <RadarChart data={checkData[0].datas} />
              </div>
              {/*
              Conflict:
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
              */}
              <div className={style.chartPos}>
                <RadarChart data={checkData[1].datas} />
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
                <span>
                  {!!checkData && !!checkData[0] && checkData[0].type}
                </span>
              </div>
              <p>
                Top{' '}
                {!!checkData &&
                  !!checkData[0] &&
                  !!checkData[0].progress &&
                  checkData[0].progress.length}{' '}
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
                <span>
                  {!!checkData && !!checkData[1] && checkData[1].type}
                </span>
              </div>
            </div>
            <div className={style.groupProgressBar}>
              <div className={style.progressInner}>
                <Progress
                  progress={
                    !!checkData &&
                    !!checkData[0] &&
                    !!checkData[0].progress &&
                    checkData[0].progress
                  }
                  reverse={true}
                />
              </div>
              <div className={style.progressCountArea}>
                {!!checkData &&
                  !!checkData[0] &&
                  !!checkData[0].progress &&
                  checkData[0].progress.length &&
                  checkData[0].progress.map((item, index) => {
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
                <Progress
                  progress={
                    !!checkData &&
                    !!checkData[1] &&
                    !!checkData[1].progress &&
                    checkData[1].progress
                  }
                />
              </div>
            </div>
          </div>
        </Module>
      )}
    </ThemeContext.Consumer>
  )
}

RadarChartModule.propTypes = {
  data: PropTypes.any,
  moduleKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.object,
  filters: PropTypes.array,
}

export default RadarChartModule
