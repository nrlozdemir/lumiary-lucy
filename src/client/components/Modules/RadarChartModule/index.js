import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import RadarChart from 'Components/Charts/RadarChart'
import { Progress } from './Progress'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import emptyData from './emptyData.json'
import { isDataSetEmpty } from 'Utils/datasets'
import cx from 'classnames'

const renderLeftRightSections = ({checkData, isEmpty, side, title, width, height}) => {
  const opacity = isEmpty ? 0.25 : 1
  const data = side === 'left' ? checkData[0] : checkData[1]

  return (
    <div className={style.chartPos}>
      {isEmpty && (
        <div className={style.emptyData}>No Data Available</div>
      )}
      <div
        style={{
          opacity,
          width: width,
          height: height
        }}
      >
        <RadarChart
          data={data.data}
          width={width}
          height={height}
          tooltipType="extended"
          platform={title || data.type}
        />
      </div>
    </div>
  )
}

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
  width = 540,
  height = 540,
  actionOnProp,
}) => {
  const isEmpty =
    !data ||
    !data.length ||
    ((data.length && (!data[0] || !data[1])) ||
      (data.length &&
        (!!data[0] && !!data[1] && !data[0].total && !data[1].total)))

  let checkData = isEmpty ? emptyData : data

  const leftIsEmpty =
    !isEmpty &&
    !loading &&
    (!!data[0] && !!data[0].data) &&
    isDataSetEmpty(data[0].data)

  const rightIsEmpty =
    !isEmpty &&
    !loading &&
    (!!data[1] && !!data[1].data) &&
    isDataSetEmpty(data[1].data)

  const leftProgressHasData =
    !!checkData &&
    !!checkData[0] &&
    !!checkData[0].progress &&
    !!checkData[0].progress.length

  const rightProgressHasData =
    !!checkData &&
    !!checkData[1] &&
    !!checkData[1].progress &&
    !!checkData[1].progress.length

  const leftOpacity = leftIsEmpty ? 0.25 : 1
  const rightOpacity = rightIsEmpty ? 0.25 : 1

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <Module
          actionOnProp={actionOnProp}
          moduleKey={moduleKey}
          title={title}
          action={action}
          filters={filters}
          legend={legend}
          isEmpty={isEmpty}
          loading={loading}
        >
          <div
            className={style.radarChartContainer}
            style={{ color: colors.textColor }}
          >
            <div className={style.groupChart}>
              {renderLeftRightSections({
                checkData,
                isEmpty: leftIsEmpty,
                side: 'left',
                title,
                width,
                height
              })}
              {renderLeftRightSections({
                checkData,
                isEmpty: rightIsEmpty,
                side: 'right',
                title,
                width,
                height
              })}
            </div>
            <div className={'mt-32 ' + style.labelContainer}>
              <div
                className={cx(style.label, {
                  [style.dark]: colors.themeType === 'dark',
                  [style.light]: colors.themeType === 'light',
                })}
                style={{
                  opacity: leftOpacity,
                }}
              >
                {leftProgressHasData || leftTitle ? (
                  <React.Fragment>
                    {leftTitle
                      ? leftTitle
                      : !!checkData && !!checkData[0] && checkData[0].type}
                  </React.Fragment>
                ) : (
                  <React.Fragment>N/A</React.Fragment>
                )}
              </div>
              {(leftProgressHasData || rightProgressHasData) && (
                <p>{`Top ${
                  leftProgressHasData
                    ? checkData[0].progress.length
                    : rightProgressHasData
                    ? checkData[1].progress.length
                    : emptyData[0].progress.length
                } Dominant Colors`}</p>
              )}
              <div
                className={cx(style.label, {
                  [style.dark]: colors.themeType === 'dark',
                  [style.light]: colors.themeType === 'light',
                })}
                style={{
                  opacity: rightOpacity,
                }}
              >
                {rightProgressHasData || rightTitle ? (
                  <React.Fragment>
                    {rightTitle
                      ? rightTitle
                      : !!checkData && !!checkData[1] && checkData[1].type}
                  </React.Fragment>
                ) : (
                  <React.Fragment>N/A</React.Fragment>
                )}
              </div>
            </div>
            <div className={style.groupProgressBar}>
              <div
                className={style.progressInner}
                style={{ opacity: leftOpacity }}
              >
                <Progress
                  progress={
                    leftProgressHasData
                      ? checkData[0].progress
                      : emptyData[0].progress
                  }
                  reverse={true}
                />
              </div>
              <div className={style.progressCountArea}>
                {(leftProgressHasData
                  ? checkData[0]
                  : rightProgressHasData
                  ? checkData[0]
                  : emptyData[0]
                ).progress.map((item, index) => {
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
              <div
                className={style.progressInner}
                style={{ opacity: rightOpacity }}
              >
                <Progress
                  progress={
                    rightProgressHasData
                      ? checkData[1].progress
                      : emptyData[1].progress
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
