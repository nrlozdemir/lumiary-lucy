import React from 'react'
import { helpers, defaults } from 'chart.js'
import { Doughnut, Chart } from 'react-chartjs-2'
import classnames from 'classnames'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import { isDataSetEmpty } from 'Utils/datasets'
import { ucfirst } from 'Utils'
import ToolTip from 'Components/ToolTip'
import { customChartToolTip } from 'Utils'
import 'Utils/chart-shadow'
import { isNumber, isFinite } from 'lodash'
import Labels from 'Components/Charts/Labels'

const propTypes = {}
const defaultProps = {
  legend: false,
  layoutPadding: 0,

  datasetsBorderWidth: 5,
  // datasetsBorderColor: '#373F5B',
  // datasetsHoverBorderColor: '#373F5B',

  defaultFontFamily: 'ClanOTBold',
  defaultFontSize: '14',
  defaultFontWeight: '700',

  fillTextFontFamily: 'ClanOTBold',
  fillTextFontSize: '12px',

  displayDataLabels: true,
  dataLabelColor: '#ffffff',
  dataLabelFontFamily: 'ClanOTBold',
  dataLabelFontSize: 12,
  dataLabelFontWeight: 'bold',

  legendLabelsFontColor: '#ffffff',
  legendLabelsFontFamily: 'ClanOTBold',
  legendLabelsFontSize: 12,
}

const dataLabelPlugins = (value, func, item) => {
  if (func == 'insertAfter') {
    return value > 0 ? value + '' + item : ''
  } else if (func == 'insertBefore') {
    return value > 0 ? item + '' + value : ''
  }
  return value
}

class DoughnutChart extends React.Component {
  render() {
    const {
      width,
      height,
      data,
      datasetsBorderWidth,
      datasetsBorderColor,
      datasetsHoverBorderColor,
      legend,
      layoutPadding,
      fillTextColor,
      fillTextFontSize,
      fillTextFontFamily,
      fillText,
      displayDataLabels,
      dataLabelFunction,
      dataLabelInsert,
      dataLabelColor,
      dataLabelFontFamily,
      dataLabelFontSize,
      dataLabelFontWeight,
      legendLabelsFontColor,
      legendLabelsFontSize,
      legendLabelsFontFamily,
      labelsData,
      labelPositionBottom,
      labelPositionRight,
      labelPositionLeft,
      cutoutPercentage,
      customStyle,
      customDoughnutContainer,
      customChartWrapper,
      average,
      cvScoreData,
      slicePiecesWidth = false,
      datasetOptions = {},
    } = this.props

    const themes = this.props.themeContext.colors
    let plugins = []
    if (fillText) {
      const textToUse = isDataSetEmpty(data) ? 'No Data' : fillText

      plugins = [
        {
          beforeDraw: function(chart) {
            const ctx = chart.chart.ctx
            const customFillText = textToUse.replace(/^\s+|\s+$/g, '')

            ctx.restore()
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = fillTextColor || themes.textColor
            ctx.font = fillTextFontSize + ' ' + fillTextFontFamily
            ctx.fillText(customFillText, width / 2, height / 2)
            ctx.save()
          },
        },
      ]
    }

    if (!data) {
      return null
    }

    const dataLimit = 5

    let newData = { ...data }

    // If more than 5 datapoints, take the first 4, and bucket the rest
    if (
      !!newData.labels &&
      !!newData.labels.length &&
      newData.labels.length > dataLimit
    ) {
      newData = {
        labels: [...newData.labels.slice(0, dataLimit - 1), 'Other'],
        datasets: [
          {
            ...newData.datasets[0],
            data: newData.datasets[0].data
              .slice(0, dataLimit - 1)
              .reduce((acc, val, idx) => {
                let totalToAdd
                if (idx === dataLimit - 2) {
                  const total = acc.reduce((a, b) => a + b, 0)
                  totalToAdd = Math.round(100 - total - val)
                }
                const result = [...acc, val]
                if (totalToAdd) {
                  result.push(totalToAdd)
                }
                return result
              }, []),
          },
        ],
      }
    }

    // for opacity backgrounds
    let chartValues =
      !!newData && !!newData.datasets && !!newData.datasets[0]
        ? newData.datasets[0].data.map((value) => {
            const val = parseFloat(value)
            if (!average && val <= 5) return null
            return val
          })
        : []

    let chartBackgroundColors =
      !!newData && !!newData.datasets && !!newData.datasets[0]
        ? newData.datasets[0].backgroundColor.slice(0, 5)
        : null
    let chartHoverBackgroundColors =
      !!newData && !!newData.datasets && !!newData.datasets[0]
        ? newData.datasets[0].backgroundColor.slice(0, 5)
        : null

    let chartValuesTemp = []
    let tooltipLabels = !!newData && newData.labels

    !!chartValues &&
      chartValues.forEach((e, i) => {
        if (!!e && isNumber(e)) {
          chartValuesTemp.push(e)
        }
      })

    if (slicePiecesWidth !== false && !!chartValues && chartValues.length > 1) {
      const totalValues = chartValues.reduce((a, b) => a + b, 0)
      // if there is a difference e.g(0.1, 0.15), we're going to use it in slices
      const difference =
        (!!totalValues && parseFloat((100 - totalValues).toFixed(1))) || 0
      const valuesLength = chartValues.length
      const totalSlicesWidth = slicePiecesWidth * valuesLength
      const totalPiecesWidth =
        !!totalSlicesWidth && 100 + difference - totalSlicesWidth
      const currentSlicesTotalWidth = parseFloat(
        (100 - totalPiecesWidth).toFixed(1)
      )
      const buildNewChartValues = chartValues.map((e) =>
        parseFloat(((e * totalPiecesWidth) / totalValues).toFixed(2))
      )

      let chartValuesInsert = {}
      let m = 1
      chartValuesTemp.map((e, i) => {
        if (!!e && isNumber(e) && isFinite(e)) {
          chartValuesInsert[i] = { item: slicePiecesWidth, index: m }
        }
        m += 2
      })

      chartValues = chartValuesTemp

      for (let i in chartValuesInsert) {
        chartValues.splice(
          chartValuesInsert[i]['index'],
          0,
          chartValuesInsert[i]['item']
        )

        tooltipLabels.splice(chartValuesInsert[i]['index'], 0, false)

        chartBackgroundColors.splice(
          chartValuesInsert[i]['index'],
          0,
          themes.moduleBackground
        )

        chartHoverBackgroundColors.splice(
          chartValuesInsert[i]['index'],
          0,
          themes.moduleBackground
        )
      }
    }

    const tooltipData = {
      labels: tooltipLabels,
      datasets: [
        {
          ...newData.datasets[0],
          data: chartValues,
        },
      ],
    }

    /*
    tooltipMode: (dataset, nearest)
    */
    const tooltipMode = this.props.tooltipMode || 'dataset'

    const tooltipKey = Math.random()
    return (
      <React.Fragment>
        <div
          className={classnames(
            style.doughnutContainer,
            customDoughnutContainer
          )}
          style={customStyle}
        >
          {labelPositionLeft && labelsData && (
            <div className={style.labelContainer}>
              <Labels data={labelsData} />
            </div>
          )}
          <div className={classnames(style.chartWrapper, customChartWrapper)}>
            {newData && (
              <React.Fragment>
                <Doughnut
                  key={Math.random()}
                  width={width}
                  height={height}
                  data={{
                    labels: newData.labels,
                    datasets: [
                      {
                        ...datasetOptions,
                        shadowColor: themes.doughnutChartShadowColor,
                        hoverShadowColor: themes.doughnutChartShadowColor,
                        data: chartValues,
                        backgroundColor: chartBackgroundColors,
                        borderColor:
                          datasetsBorderColor || themes.moduleBackground,
                        hoverBorderColor:
                          datasetsHoverBorderColor || themes.moduleBackground,
                        hoverBackgroundColor: chartHoverBackgroundColors,
                      },
                    ],
                  }}
                  plugins={plugins}
                  options={{
                    responsive: false,
                    tooltips:
                      !average &&
                      customChartToolTip(
                        themes,
                        {
                          mode: tooltipMode,
                          filter: (tooltipItem) => {
                            if (slicePiecesWidth !== false) {
                              if (
                                tooltipData['labels'][tooltipItem.index] !==
                                  false &&
                                tooltipMode === 'dataset'
                              ) {
                                return chartValues
                              } else if (
                                tooltipData['labels'][tooltipItem.index] !==
                                  false &&
                                tooltipMode === 'nearest'
                              ) {
                                return chartValues[tooltipItem.index]
                              }
                            } else {
                              if (tooltipMode === 'dataset') {
                                return chartValues
                              } else if (tooltipMode === 'nearest') {
                                return chartValues[tooltipItem.index]
                              }
                            }
                          },
                        },
                        tooltipData
                      ),
                    legend: {
                      display: legend,
                      labels: {
                        fontColor: legendLabelsFontColor,
                        fontSize: legendLabelsFontSize,
                        fontFamily: legendLabelsFontFamily,
                      },
                    },
                    layout: {
                      padding: layoutPadding,
                    },
                    plugins: {
                      datalabels: {
                        display: displayDataLabels,
                        formatter: (value) => {
                          if (!value) return
                          //hide slices label
                          if (
                            slicePiecesWidth !== false &&
                            parseFloat(value) === parseFloat(slicePiecesWidth)
                          ) {
                            return ''
                          }
                          if (dataLabelFunction) {
                            return dataLabelPlugins(
                              value,
                              dataLabelFunction,
                              dataLabelInsert
                            )
                          }
                          return value
                        },
                        color: dataLabelColor,
                        font: {
                          family: dataLabelFontFamily,
                          weight: dataLabelFontWeight,
                          size: dataLabelFontSize,
                        },
                      },
                    },
                    elements: {
                      arc: {
                        borderWidth: datasetsBorderWidth,
                        hoverBorderColor: datasetsHoverBorderColor,
                      },
                    },
                    cutoutPercentage: cutoutPercentage,
                  }}
                />
                {average && (
                  <React.Fragment>
                    <div
                      className={style.circleContainer}
                      style={{
                        transform: `translate(-50%, 0) rotate(${(average /
                          100) *
                          360}deg)`,
                      }}
                    >
                      <div className={style.circleWrapper}>
                        <div
                          className={classnames(style.circleTick, {
                            [style.dark]: themes.themeType === 'dark',
                            [style.light]: themes.themeType === 'light',
                          })}
                          data-tip={`${ucfirst(
                            cvScoreData.platform
                          )} Average | ${average}`}
                          data-for={`panoptic-cvScore-${tooltipKey}`}
                        />
                      </div>
                    </div>
                    <ToolTip
                      effect="solid"
                      place="right"
                      smallTooltip
                      id={`panoptic-cvScore-${tooltipKey}`}
                    />
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
          {labelPositionRight && labelsData && (
            <div className={style.labelContainer}>
              <Labels data={labelsData} />
            </div>
          )}
        </div>
        {labelPositionBottom && labelsData && (
          <div className={style.labelContainer}>
            <Labels data={labelsData} />
          </div>
        )}
      </React.Fragment>
    )
  }
}
DoughnutChart.propTypes = propTypes
DoughnutChart.defaultProps = defaultProps

export default withTheme(DoughnutChart)
