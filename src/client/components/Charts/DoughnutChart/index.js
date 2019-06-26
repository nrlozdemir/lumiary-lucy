import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import classnames from 'classnames'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import { isDataSetEmpty } from 'Utils/datasets'

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
  dataLabelFontSize: 14,
  dataLabelFontWeight: 'normal',

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
    fillTextX,
    fillTextY,
    fillTextMaxWidth,
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
          const { top, bottom, left, right } = chart.chartArea
          const customFillText = textToUse.replace(/^\s+|\s+$/g, '')
          ctx.save()
          ctx.fillStyle = themes.textColor
          ctx.font = fillTextFontSize + ' ' + fillTextFontFamily

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
      },
    ]
  }
  if (!data) {
    return null
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
          {data && (
            <Doughnut
              key={Math.random()}
              width={width}
              height={height}
              data={{
                labels: data.labels,
                datasets: [
                  {
                    ...(!!data && !!data.datasets && !!data.datasets[0]
                      ? data.datasets[0]
                      : {}),
                    backgroundColor:
                      data && data.datasets
                        ? data.datasets[0].backgroundColor
                        : null,
                    borderColor: themes.moduleBackground,
                    hoverBorderColor: themes.moduleBackground,
                    hoverBackgroundColor:
                      data && data.datasets
                        ? data.datasets[0].hoverBackgroundColor
                        : null,
                  },
                ],
              }}
              plugins={plugins}
              options={{
                responsive: false,
                tooltips: {
                  ...customTooltips,
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
