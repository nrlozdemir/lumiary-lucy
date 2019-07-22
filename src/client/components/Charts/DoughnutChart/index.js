import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import classnames from 'classnames'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import { isDataSetEmpty } from 'Utils/datasets'
import { customChartToolTip } from 'Utils'

import Labels from 'Components/Charts/Labels'

const propTypes = {}
const defaultProps = {
  legend: false,
  layoutPadding: 0,

  datasetsBorderWidth: 5,
  datasetsBorderColor: '#373F5B',
  datasetsHoverBorderColor: '#373F5B',

  defaultFontFamily: 'ClanOTBold',
  defaultFontSize: '14',
  defaultFontWeight: '700',

  fillTextColor: '#ffffff',
  fillTextFontFamily: 'ClanOTBold',
  fillTextFontSize: '14px',

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
    return value + '' + item
  } else if (func == 'insertBefore') {
    return item + '' + value
  }
  return value
}

const DoughnutChart = (props) => {
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
    customTooltips,
  } = props

  const themes = props.themeContext.colors

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
          ctx.fillStyle = themes.textColor
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

  return (
    <React.Fragment>
      <div
        className={classnames(style.doughnutContainer, customDoughnutContainer)}
        style={customStyle}
      >
        {labelPositionLeft && labelsData && (
          <div className={style.labelContainer}>
            <Labels data={labelsData} />
          </div>
        )}
        <div className={classnames(style.chartWrapper, customChartWrapper)}>
          {newData && (
            <Doughnut
              key={Math.random()}
              width={width}
              height={height}
              data={{
                labels: newData.labels,
                datasets: [
                  {
                    data:
                      !!newData && !!newData.datasets && !!newData.datasets[0]
                        ? newData.datasets[0].data.map((value) =>
                            parseFloat(value).toFixed(0)
                          )
                        : [],
                    backgroundColor:
                      newData && newData.datasets
                        ? newData.datasets[0].backgroundColor
                        : null,
                    borderColor: themes.moduleBackground,
                    hoverBorderColor: themes.moduleBackground,
                    hoverBackgroundColor:
                      data && newData.datasets
                        ? newData.datasets[0].hoverBackgroundColor
                        : null,
                  },
                ],
              }}
              plugins={plugins}
              options={{
                responsive: false,
                tooltips: customChartToolTip(themes),
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

DoughnutChart.propTypes = propTypes
DoughnutChart.defaultProps = defaultProps

export default withTheme(DoughnutChart)
