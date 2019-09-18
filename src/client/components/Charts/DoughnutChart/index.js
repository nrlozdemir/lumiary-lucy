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
import { modifyTooltip } from 'Utils/tooltip'

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

  fillTextFontFamily: 'ClanOT',
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

const dataLabelPlugins = (value, func = 'insertBefore', item) => {
  let term = value > 0 ? item + '' + value : ''
  if (func == 'insertAfter') {
    term = value > 0 ? value + '' + item : ''
  }
  return term
}

class DoughnutChart extends React.Component {
  renderLabelsData = () => {
    const {
      labelContainerClassname = false,
      labelsData,
      removeLabelMargin = false,
    } = this.props
    return (
      <div
        className={classnames(style.labelContainer, {
          [`${labelContainerClassname}`]: !!labelContainerClassname,
        })}
      >
        <Labels
          data={labelsData}
          removeMargin={!!removeLabelMargin ? true : false}
        />
      </div>
    )
  }

  generateTooltip = (
    newData,
    tooltipData = {},
    chartValues = [],
    tooltipTemplate = false,
    platform = false,
    metric = false
  ) => {
    const {
      tooltipType = 'basic',
      themeContext = {},
      tooltipMode = 'dataset',
      slicePiecesWidth = false,
    } = this.props
    const { colors: themes = {} } = themeContext

    return (
      (!!tooltipType &&
        (tooltipType === 'basic' &&
          customChartToolTip(
            themes,
            {
              mode: tooltipMode,
              filter: (tooltipItem) => {
                if (!!slicePiecesWidth) {
                  if (
                    !!tooltipData['labels'][tooltipItem.index] &&
                    tooltipMode === 'dataset'
                  ) {
                    return chartValues
                  } else if (
                    !!tooltipData['labels'][tooltipItem.index] &&
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
          ))) ||
      (tooltipType === 'extended' &&
        modifyTooltip({
          template:
            (!!tooltipTemplate && tooltipTemplate) || 'DoughnutChartTemplate',
          data: newData,
          options: {
            background: themes.tooltipBackground,
            textColor: themes.tooltipTextColor,
            caretColor: themes.tooltipBackground,
          },
          platform: platform,
          metric: metric,
        }))
    )
  }

  generateLabelFormatter = (value) => {
    const {
      slicePiecesWidth = false,
      dataLabelFunction,
      dataLabelInsert,
    } = this.props
    if (!value) return
    //hide slices label
    if (
      !!slicePiecesWidth &&
      parseFloat(value) === parseFloat(slicePiecesWidth)
    ) {
      return ''
    }
    if (dataLabelFunction) {
      return dataLabelPlugins(value, dataLabelFunction, dataLabelInsert)
    }
    return value
  }

  renderAverage = () => {
    const {
      average,
      themeContext = {},
      cvScoreData = {},
      tooltipCaretPosition = false,
      tooltipTemplate = false,
      currentDayIndex = false,
      weekdayOrder = false,
    } = this.props
    const { colors: themes = {} } = themeContext
    const tooltipKey = Math.random()

    return (
      <React.Fragment>
        <div
          className={style.circleContainer}
          style={{
            transform: `translate(-50%, 0) rotate(${(average / 100) * 360}deg)`,
          }}
        >
          <div className={style.circleWrapper}>
            <div
              className={classnames(style.circleTick, {
                [style.dark]: themes.themeType === 'dark',
                [style.light]: themes.themeType === 'light',
              })}
              data-tip={`${ucfirst(
                cvScoreData.platform || ''
              )} Average | ${average}`}
              data-for={`panoptic-cvScore-${tooltipKey}`}
            />
          </div>
        </div>
        <ToolTip
          effect="solid"
          place={
            (!!tooltipCaretPosition &&
              ((tooltipCaretPosition == 'left' ? 'right' : 'left') ||
                (tooltipCaretPosition == 'right' ? 'left' : 'left'))) ||
            'left'
          }
          smallTooltip
          id={`panoptic-cvScore-${tooltipKey}`}
          template={(!!tooltipTemplate && tooltipTemplate) || false}
          tooltipProps={{
            value: average,
            labelLong:
              !!weekdayOrder &&
              !!currentDayIndex &&
              !!weekdayOrder[currentDayIndex] &&
              !!weekdayOrder[currentDayIndex].weekday &&
              weekdayOrder[currentDayIndex].weekday,
            average: average,
            platform: ucfirst(cvScoreData.platform || ''),
          }}
        />
      </React.Fragment>
    )
  }

  generateBgColor = (data) => {
    const bgColor = data ? data.backgroundColor.slice(0, 5) : null
    return bgColor
  }

  renderNewData = (newData) => {
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
      dataLabelColor,
      dataLabelFontFamily,
      dataLabelFontSize,
      dataLabelFontWeight,
      legendLabelsFontColor,
      legendLabelsFontSize,
      legendLabelsFontFamily,
      cutoutPercentage,
      average,
      slicePiecesWidth = false,
      datasetOptions = {},
      removeTooltip = false,
      showAllData = false,
      themeContext = {},
      tooltipTemplate = false,
      platform = false,
      metric = false,
    } = this.props

    const { colors: themes = {} } = themeContext
    const { datasets = [] } = newData

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
            ctx.font = 'bold ' + fillTextFontSize + ' ' + fillTextFontFamily
            ctx.fillText(customFillText, width / 2, height / 2)
            ctx.save()
          },
        },
      ]
    }
    // for opacity backgrounds
    let chartValues = []
    if (datasets[0]) {
      chartValues = datasets[0].data.map((value) => {
        let val = parseFloat(value)
        if (!average && val <= 5 && !showAllData) {
          val = null
        }
        return val
      })
    }

    let chartBackgroundColors = this.generateBgColor(datasets[0])
    let chartHoverBackgroundColors = this.generateBgColor(datasets[0])
    let chartValuesTemp = []
    let tooltipLabels = !!newData && newData.labels

    !!chartValues &&
      chartValues.forEach((e, i) => {
        if (!!e && isNumber(e)) {
          chartValuesTemp.push(e)
        }
      })
    const isChartValuesTemp = !!chartValuesTemp && chartValuesTemp.length > 1
    if (!!slicePiecesWidth && isChartValuesTemp) {
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

    let tooltipData = {}

    if (!!datasets[0] && !!chartValues) {
      tooltipData = {
        labels: tooltipLabels,
        datasets: [
          {
            ...datasets[0],
            data: chartValues,
          },
        ],
      }
    }
    return (
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
                borderColor: datasetsBorderColor || themes.moduleBackground,
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
              !removeTooltip &&
              this.generateTooltip(
                newData,
                tooltipData,
                chartValues,
                tooltipTemplate,
                platform,
                metric
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
                formatter: this.generateLabelFormatter,
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
        {average && this.renderAverage()}
      </React.Fragment>
    )
  }

  reduceNewData = (data, dataLimit = 0) => {
    return data.slice(0, dataLimit - 1).reduce((acc, val, idx) => {
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
    }, [])
  }

  render() {
    const {
      data,
      labelsData,
      labelPositionBottom,
      labelPositionRight,
      labelPositionLeft,
      customStyle,
      customDoughnutContainer,
      customChartWrapper,
      average,
      tooltipTemplate = false,
      platform = false,
      metric = false,
    } = this.props

    if (!data) {
      return null
    }

    const dataLimit = 5
    let newData = { ...data }
    const { datasets = [] } = newData

    // If more than 5 datapoints, take the first 4, and bucket the rest
    if (
      !!datasets[0] &&
      !!newData.labels &&
      newData.labels.length > dataLimit
    ) {
      newData = {
        labels: [...newData.labels.slice(0, dataLimit - 1), 'Other'],
        datasets: [
          {
            ...datasets[0],
            data: this.reduceNewData(datasets[0].data, dataLimit),
          },
        ],
      }
    }

    return (
      <React.Fragment>
        <div
          className={classnames(
            style.doughnutContainer,
            customDoughnutContainer
          )}
          style={customStyle}
        >
          {labelPositionLeft && labelsData && this.renderLabelsData()}
          <div
            className={classnames(customChartWrapper, {
              [style.averageStyle]: !average,
              [style.displayFlex]: !!average,
            })}
          >
            {newData && this.renderNewData(newData)}
          </div>
          {labelPositionRight && labelsData && this.renderLabelsData()}
        </div>
        {labelPositionBottom && labelsData && this.renderLabelsData()}
      </React.Fragment>
    )
  }
}
DoughnutChart.propTypes = propTypes
DoughnutChart.defaultProps = defaultProps

export default withTheme(DoughnutChart)
