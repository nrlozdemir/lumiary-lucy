import React from 'react'
import { helpers, /* elements, */ defaults } from 'chart.js'
import { Line, Chart } from 'react-chartjs-2'
import { randomKey, chartCombineDataset } from 'Utils/index'
import { fromJS } from 'immutable'
import { lineOptions, lineStackedAreaOptions, percentageGraphOptions } from './defaultOptions'
import { createDataset } from './percentageDummyData'
import { withTheme } from 'ThemeContext/withTheme'

//var defaultColor = defaults.global.defaultColor
//let resolve = helpers.options.resolve
//let isPointInArea = helpers.canvas._isPointInArea

/*
defaults._set('line', {
  showLines: true,
  spanGaps: false,
  hover: {
    mode: 'label'
  },
  scales: {
    xAxes: [{
      type: 'category',
      id: 'x-axis-0'
    }],
    yAxes: [{
      type: 'linear',
      id: 'y-axis-0'
    }]
  }
})
*/

/*
Chart.controllers.line.extend(Chart.controllers.line.prototype, {
  draw: function() {
    var me = this
    var chart = me.chart
    var meta = me.getMeta()
    var points = meta.data || []
    var area = chart.chartArea
    var i = 0
    var ilen = points.length
    var halfBorderWidth

    if (me._showLine) {
      halfBorderWidth = (meta.dataset._model.borderWidth || 0) / 2

      helpers.canvas.clipArea(chart.ctx, {
        left: area.left,
        right: area.right,
        top: area.top - halfBorderWidth,
        bottom: area.bottom + halfBorderWidth
      })

      meta.dataset.draw()

      helpers.canvas.unclipArea(chart.ctx)
    }

    // Draw the points
    for (; i < ilen; ++i) {
      points[i].draw(area)
    }
  }
})
*/


/*
moveTo(point.x, point.y) //x coord y coord
lineTo(point.x, scale.endPoint) // start end
*/

function addComma(number) {
  if (number >= 1e3) {
    const unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3
    const unitname = ['k', 'm', 'B', 'T'][Math.floor(unit / 3) - 1]
    return (number / ('1e' + unit)).toFixed(0) + unitname
  }

  return number
}

function addPercentage(number) {
  return number + '%'
}

function combineChartData(data, type = null) {
  if (type === null || type === 'line') {
    return chartCombineDataset(data, lineOptions)
  } else if (type === 'lineStackedArea') {
    return chartCombineDataset(data, lineStackedAreaOptions)
  } else if (type === 'percentageGraph') {
    return chartCombineDataset(data, percentageGraphOptions)
  }
}

class LineChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  datasetKeyProvider() {
    return randomKey(5)
  }

  render() {
    const themes = this.props.themeContext.colors
    const valueOrDefault = helpers.valueOrDefault

    if(this.props.chartType === 'percentageGraph') {



      Chart.helpers.extend(Chart.elements.Line.prototype, {
        draw: function () {
          console.log("Draw function called")
          const me = this
          const vm = me._view
          const ctx = me._chart.ctx
          const {
            width,
            height,
            config
          } = me._chart

          const colors = {
            'green': [
              '#2fd7c4',
              '#39e5d1',
              '#2fd7c4'
            ],
            'blue': [
              '#5292e5',
              '#5d9ef2',
              '#5292e5'
            ],
            'grey': [
              '#acb0be',
              '#acb0be',
              '#acb0be'
            ]
          }

          const spanGaps = vm.spanGaps
          const points = me._children.slice()
          const globalDefaults = defaults.global
          const globalOptionLineElements = globalDefaults.elements.line
          let lastDrawnIndex = -1
          let index, current, previous, currentVM

          if (me._loop && points.length) {
            points.push(points[0])
          }

          ctx.save()

          ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle

          if (ctx.setLineDash) {
            ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash)
          }

          ctx.lineDashOffset = valueOrDefault(vm.borderDashOffset, globalOptionLineElements.borderDashOffset)
          ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle
          ctx.lineWidth = valueOrDefault(vm.borderWidth, globalOptionLineElements.borderWidth)
          ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor

          ctx.beginPath()
          lastDrawnIndex = -1

          let lines = {}

          for (index = 0; index < points.length; ++index) {
            current = points[index]
            previous = helpers.previousItem(points, index)
            currentVM = current._view

            if (index === 0) {
              if (!currentVM.skip) {
                ctx.moveTo(currentVM.x, currentVM.y)
                lastDrawnIndex = index
              }
            } else {
              previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex]
              if (!currentVM.skip) {
                if ((lastDrawnIndex !== (index - 1) && !spanGaps) || lastDrawnIndex === -1) {
                  ctx.moveTo(currentVM.x, currentVM.y)
                } else {
                  helpers.canvas.lineTo(ctx, previous._view, current._view)

                  lines[index] = {
                    previousVLine: {
                      ...previous._view
                    },
                    currentVLine: {
                      ...current._view
                    }
                  }
                }
                lastDrawnIndex = index
              }
            }
          }

          ctx.save()
          ctx.stroke()

          const barWidth = 3
          const barSpaceWidth = 2
          const lineWidth = 1

          let gradient = ctx.createLinearGradient(0, 0, 180, 800)
          let cs = 0
          for (let g = 0; g <= 1; g += 0.5){
            gradient.addColorStop(g, colors[config.options.color][cs])
            cs++
          }

          ctx.restore()

          const findYMaxValue = Object.values(lines).reduce(
            (p, n) => (p.currentVLine.y > n.currentVLine.y) ? n : p
          )
          const findYMaxIndex = findYMaxValue && Object.values(lines).findIndex(
            (l) => l.currentVLine.y === findYMaxValue.currentVLine.y
          )

          const previousIndices = Object.values(lines)
          .filter((r, i) => i <= findYMaxIndex).reverse()

          let previousIndicesList = {}
          previousIndices && Object.values(previousIndices).map((el, i) => {
            previousIndicesList[i] = {
              currentX: el.currentVLine.x,
              previousX: el.previousVLine.x,
              currentY: el.currentVLine.y,
              previousY: el.previousVLine.y
            }
            /*
            if (i + 1 === previousIndices.length) {
              previousIndicesList[i + 1] = {
                currentX: el.previousVLine.x,
                previousX: el.previousVLine.x,
                currentY: el.previousVLine.y,
                previousY: el.previousVLine.y
              }
            }
            */
            return true
          })

          let createLeftIndexes = []
          previousIndicesList && Object.values(previousIndicesList).map((el, i) => {
            let calcAspectRatio = (el.previousY - el.currentY) / (el.currentX - el.previousX)
            let returner = 0
            for (let c = el.currentX; c > el.previousX; c--) {
              createLeftIndexes.push({
                x: c.toFixed(0),
                y: (el.currentY + (returner * calcAspectRatio)),
                currentX: el.currentX,
                currentY: el.currentY,
                previousX: el.previousX,
                previousY: el.previousY
              })
              returner++
            }
            return true
          })


          ctx.beginPath()
          createLeftIndexes && createLeftIndexes.map((el, i) => {
            if (
              el.x % (barWidth + barSpaceWidth) > barSpaceWidth
              && el.x % (barWidth + barSpaceWidth) <= (barWidth + barSpaceWidth)
            ) {
              ctx.moveTo(el.x, height + el.y)
              ctx.lineTo(el.x, el.y)
              ctx.lineWidth = lineWidth
              ctx.strokeStyle = gradient
              ctx.stroke()
            }
            return true
          })

          /*
          // add shadow to left indexes
          ctx.beginPath()
          createLeftIndexes && createLeftIndexes.map((el, i) => {
            if (
              el.x.toFixed(0) % (5) > 3
              && el.x.toFixed(0) % (5) <= (4)
            ) {

              ctx.moveTo(el.x + lineWidth, height + el.y)
              ctx.lineTo(el.x + lineWidth, el.y)
              ctx.lineWidth = lineWidth
              ctx.strokeStyle = '#2C3551'
              ctx.stroke()
            }
            return true
          })
          ctx.save()
          */

          // end create left indexes

          // start create right indexes
          const nextIndices = Object.values(lines)
          .filter((r, i) => i > findYMaxIndex)

          let nextIndicesList = {}
          nextIndices && Object.values(nextIndices).map((el, i) => {
            nextIndicesList[i] = {
              currentX: el.currentVLine.x,
              previousX: el.previousVLine.x,
              currentY: el.currentVLine.y,
              previousY: el.previousVLine.y
            }
            return true
          })

          let createRightIndexes = []
          nextIndicesList && Object.values(nextIndicesList).map((el, i) => {
            let calcAspectRatio = (el.previousY - el.currentY) / (el.currentX - el.previousX)
            let returner = 0
            for (let c = el.previousX; c < el.currentX; c++) {
              createRightIndexes.push({
                x: c.toFixed(0),
                y: (el.previousY - (returner * calcAspectRatio)),
                currentX: el.currentX,
                currentY: el.currentY,
                previousX: el.previousX,
                previousY: el.previousY
              })
              returner++
            }
            return true
          })


          ctx.beginPath()
          createRightIndexes && createRightIndexes.map((el, i) => {
            if (
              el.x % (barWidth + barSpaceWidth) > barSpaceWidth
              && el.x % (barWidth + barSpaceWidth) <= (barWidth + barSpaceWidth)
            ) {

              ctx.moveTo(el.x, height + el.y)
              ctx.lineTo(el.x, el.y)
              ctx.lineWidth = lineWidth
              ctx.strokeStyle = gradient
              ctx.stroke()

            }
            return true
          })
          ctx.save()


          // add shadow to right indexes
          /*
          ctx.beginPath()
          createRightIndexes && createRightIndexes.map((el, i) => {
            if (
              el.x.toFixed(0) % (barWidth + barSpaceWidth) > barWidth
              && el.x.toFixed(0) % (barWidth + barSpaceWidth) <= (barWidth + lineWidth)
            ) {

              ctx.moveTo(el.x + lineWidth, height + el.y)
              ctx.lineTo(el.x + lineWidth, el.y)
              ctx.lineWidth = lineWidth
              ctx.strokeStyle = '#2C3551'
              ctx.stroke()
            }
            return true
          })
          ctx.save()
          */
          // end create right indexes

          // start put top index
          // white border


          ctx.beginPath()
          ctx.restore()
          ctx.moveTo(findYMaxValue.currentVLine.x - 0,
            height + findYMaxValue.currentVLine.y)
          ctx.lineTo(findYMaxValue.currentVLine.x - 0,
            findYMaxValue.currentVLine.y)
          ctx.lineWidth = barWidth
          ctx.strokeStyle = '#fff'
          ctx.stroke()
          ctx.save()


          /*
            // white border left shadow
          ctx.beginPath()
          ctx.restore()
          ctx.moveTo(findYMaxValue.currentVLine.x - barWidth,
            height + findYMaxValue.currentVLine.y)
          ctx.lineTo(findYMaxValue.currentVLine.x - barWidth,
            findYMaxValue.currentVLine.y)
          ctx.lineWidth = lineWidth
          ctx.strokeStyle = '#2C2B3E'
          ctx.stroke()
          ctx.save()

          // white border right shadow
          ctx.beginPath()
          ctx.restore()
          ctx.moveTo(findYMaxValue.currentVLine.x + lineWidth,
            height + findYMaxValue.currentVLine.y)
          ctx.lineTo(findYMaxValue.currentVLine.x + lineWidth,
            findYMaxValue.currentVLine.y)
          ctx.lineWidth = lineWidth
          ctx.strokeStyle = '#2C2B3E'
          ctx.stroke()
          ctx.save()
          */

          // end put top index
        }
      })
    }

    const defaultProps = {
      width: 1200,
      height: 300,
      options: {
        responsive: false,
        plugins: {
          datalabels: false,
        },
        legend: {
          display: false,
        },
        tooltips: {
          xAlign: 'center',
          yAlign: 'bottom',
          backgroundColor: '#fff',
          titleFontColor: '#21243B',
          bodyFontColor: '#21243B',
          footerFontColor: '#21243B',
          xPadding: 14,
          yPadding: 14,
          cornerRadius: 10,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: themes.chartStadiumBarBorder,
                lineWidth: 0.7,
                drawBorder: true,
                drawTicks: false,
              },
              ticks: {
                fontColor: themes.textColor,
                fontSize: 12,
                fontFamily: 'ClanOTNews',
                fontWeight: 'normal',
                stepSize: 1,
                beginAtZero: true,
                padding: 20,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: themes.chartStadiumBarBorder,
                lineWidth: 0.7,
                drawBorder: true,
                drawTicks: false,
              },
              ticks: {
                display: true,
                fontColor: themes.textColor,
                fontSize: 12,
                fontFamily: 'ClanOTNews',
                fontWeight: 'normal',
                max: 250,
                stepSize: 50,
                beginAtZero: true,
                padding: 20,
              },
            },
          ],
        },
        color: 'blue'
      },
    }

    let props = fromJS(defaultProps)
      .mergeDeep(this.props)
      .toJS()

    let plugins = []

    if (props.backgroundColor || themes.chartBackground) {
      plugins.push({
        beforeDraw: (chart, easing) => {
          let ctx = chart.chart.ctx
          let chartArea = chart.chartArea

          ctx.save()
          ctx.fillStyle = props.backgroundColor || themes.chartBackground
          ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
          )
          ctx.restore()
        },
      })
    }

    if (props.xAxesFlatten) {
      props.options.scales.xAxes[0].ticks = {
        ...props.options.scales.xAxes[0].ticks,
        callback: (value, index, values) => {
          if (props.xAxesFlatten) {
            let space = props.flattenSpace || 11
            if (value.length === 1) {
              space = props.flattenSpace || 2
            }
            if (index === 0) {
              return ' '.repeat(props.flattenFirstSpace || space) + value
            }
            if (index === values.length - 1) {
              return value + ' '.repeat(props.flattenLastSpace || space)
            }
            return value
          }
          return value
        },
      }
    }

    if (props.yAxesPercentage) {
      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        max: 100,
        callback: (value, index, values) => {
          return addPercentage(value)
        },
      }
    }

    if (props.yAxesAbbreviate) {
      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        callback: (value, index, values) => {
          return addComma(value)
        },
      }
    }

    if (props.customTooltipText) {
      props.options.tooltips = {
        ...props.options.tooltips,
        callbacks: {
          title: (tooltipItem, data) => {
            const { datasetIndex, index } = tooltipItem[0]
            return (
              addComma(data.datasets[datasetIndex].data[index]) +
              ' ' +
              props.customTooltipText
            )
          },
          label: (tooltipItem, data) => {
            return null
          },
        },
      }
    }

    if (props.removeTooltip) {
      props.options.tooltips = {
        enabled: false,
      }
    }

    if (props.removePointRadius) {
      props.options.elements = {
        ...props.options.elements,
        point: {
          radius: 0,
        },
      }
    }

    if (props.ticksFontSize) {
      props.options.scales.xAxes[0].ticks = {
        ...props.options.scales.xAxes[0].ticks,
        fontSize: props.ticksFontSize,
      }

      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        fontSize: props.ticksFontSize,
      }
    }

    if (props.xAxesStepSize) {
      props.options.scales.xAxes[0].ticks = {
        ...props.options.scales.xAxes[0].ticks,
        stepSize: props.xAxesStepSize,
      }
    }

    if (props.yAxesStepSize) {
      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        stepSize: props.yAxesStepSize,
      }
    }

    if (props.yAxesMax) {
      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        max: props.yAxesMax,
      }
    }

    if (props.xAxesTicksFontBold) {
      props.options.scales.xAxes[0].ticks = {
        ...props.options.scales.xAxes[0].ticks,
        fontWeight: 'bold',
      }
    }

    if (props.yAxesTicksFontBold) {
      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        fontWeight: 'bold',
      }
    }

    const data = (props.chartType === 'percentageGraph')
    ? {"datasets": [{"data": createDataset(props.cvScore)}]}
    : combineChartData(props.dataSet, props.chartType)

    return (
      <React.Fragment>
        {data && <Line
          key={Math.random()}
          data={data}
          plugins={plugins}
          datasetKeyProvider={this.datasetKeyProvider}
          {...props}
        />}
      </React.Fragment>
    )
  }
}

export default withTheme(LineChart)
