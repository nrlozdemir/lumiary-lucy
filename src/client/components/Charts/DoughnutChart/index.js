import React, { lazy, Suspense } from 'react'
import { Doughnut, defaults } from 'react-chartjs-2'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './style.scss'

const Labels = lazy(() => import('Components/Charts/Labels'))

const propTypes = {}
const defaultProps = {
  wrapperClassName: 'doughnut-wrapper',
  chartClassName: 'doughnut-chart',
  labelsClassName: 'doughnut-labels',

  responsive: true,
  tooltip: false,
  legend: false,
  layoutPadding: 0,

  datasetsBorderWidth: 5,
  datasetsBorderColor: '#303a5d',
  datasetsHoverBorderColor: '#303a5d',

  defaultFontFamily: 'ClanOTBold',
  defaultFontSize: '14',
  defaultFontWeight: '700',

  fillTextColor: '#fff',
  fillTextFontFamily: 'ClanOTBold',
  fillTextFontSize: '14px',

  dataLabelColor: '#fff',
  dataLabelFontFamily: 'ClanOTBold',
  dataLabelFontSize: 14,
  dataLabelFontWeight: 'normal',

  legendLabelsFontColor: '#fff',
  legendLabelsFontFamily: 'ClanOTBold',
  legendLabelsFontSize: 12,

  tooltipFontFamily: 'ClanOTBold',
  tooltipFontSize: 12,
  tooltipFontStyle: 'normal',
  tooltipFontColor: '#fff',
  tooltipSpacing: 2,
}

const dataLabelPlugins = (value, func, item) => {
  if (func == 'insertAfter') {
    return value + '' + item
  } else if (func == 'insertBefore') {
    return item + '' + value
  }
  return value
}

export default class DoughnutChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      wrapperClassName,
      chartClassName,
      labelsClassName,
      width,
      height,
      data,
      datasetsBorderWidth,
      datasetsBorderColor,
      datasetsHoverBorderColor,
      responsive,
      legend,
      tooltip,
      layoutPadding,
      fillTextColor,
      fillTextFontSize,
      fillTextFontFamily,
      fillText,
      fillTextX,
      fillTextY,
      fillTextMaxWidth,
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
      labelPositionRight,
      labelPositionLeft,
      cutoutPercentage,
    } = this.props

    let plugins = []

    if (fillText) {
      plugins.push({
        beforeDraw: function(chart) {
          const ctx = chart.chart.ctx
          const { top, bottom, left, right } = chart.chartArea
          ctx.save()
          ctx.fillStyle = fillTextColor
          ctx.font = fillTextFontSize + ' ' + fillTextFontFamily

          let customFillText
          if (Array.isArray(customFillText)) {
            customFillText = fillText.join('\n')
          } else {
            customFillText = fillText
          }

          ctx.fillText(
            customFillText,
            fillTextX && fillTextX > 0 ? fillTextX : (bottom - top) / 2 - 55,
            fillTextY && fillTextY > 0 ? fillTextY : (right - left) / 2 + 4,
            fillTextMaxWidth && fillTextMaxWidth > 0
              ? fillTextMaxWidth
              : right - left
          )
          ctx.restore()
        },
      })
    }
    console.log(cutoutPercentage)
    return (
      <React.Fragment>
        <div className={style.doughnutContainer}>
          {labelPositionLeft && labelsData && (
            <div className={style.labelContainer}>
              <Suspense fallback={''}>
                <Labels data={labelsData} />
              </Suspense>
            </div>
          )}
          <div className={style.chartWrapper}>
            {data && (
              <Doughnut
                width={width}
                height={height}
                data={{
                  labels: data.labels,
                  datasets: [
                    {
                      data: data.datasets[0].data,
                      backgroundColor: data.datasets[0].backgroundColor,
                      borderColor: datasetsBorderColor,
                      hoverBackgroundColor:
                        data.datasets[0].hoverBackgroundColor,
                    },
                  ],
                }}
                plugins={plugins}
                options={{
                  cutoutPercentage: cutoutPercentage,
                  responsive: false,
                  tooltips: {
                    enabled: true,
                  },
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
                      formatter: (value) => {
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
                }}
              />
            )}
          </div>
          {labelPositionRight && labelsData && (
            <div className={style.labelContainer}>
              <Suspense fallback={''}>
                <Labels data={labelsData} />
              </Suspense>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}

DoughnutChart.propTypes = propTypes
DoughnutChart.defaultProps = defaultProps
