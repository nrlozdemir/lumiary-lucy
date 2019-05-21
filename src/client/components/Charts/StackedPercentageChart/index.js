import React from 'react'
import { helpers, /* elements, */ defaults } from 'chart.js'
import { Line, Chart } from 'react-chartjs-2'
import { randomKey, chartCombineDataset } from 'Utils/index'
import { fromJS } from 'immutable'
import { percentageGraphOptions } from './defaultOptions'
import { withTheme } from 'ThemeContext/withTheme'

function combineChartData(data, type = null) {
  return chartCombineDataset(data, percentageGraphOptions)
}

class StackedPercentageChart extends React.Component {
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

    Chart.helpers.extend(Chart.elements.Line.prototype, {
      draw: function () {
        const me = this
        const vm = me._view
        const ctx = me._chart.ctx
        const {
          width,
          height,
          config
        } = me._chart

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

        if (config.options.chartType === 'percentageGraph') {

          const barWidth = (config.options.barWidth) ? config.options.barWidth : 3
          const barSpaceWidth = (config.options.barSpaceWidth) ? config.options.barSpaceWidth : 2
          const lineWidth = 1

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
            'lightGrey': [
              '#c6c9d7',
              '#c6c9d7',
              '#c6c9d7'
            ],
            'grey': [
              '#acb0be',
              '#acb0be',
              '#acb0be'
            ],
            'purple': [
              '#8562f3',
              '#9576f5',
              '#8562f3'
            ]
          }

          let gradient = ctx.createLinearGradient(0, 0, 180, 800)
          let cs = 0
          for (let g = 0; g <= 1; g += 0.5) {
            gradient.addColorStop(g, colors[config.options.color][cs])
            cs++
          }
          const tickColor = (config.options.tickColor) ? config.options.tickColor : themes.topValueColor

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
              el.x % (barWidth + barSpaceWidth) > barSpaceWidth &&
              el.x % (barWidth + barSpaceWidth) <= (barWidth + barSpaceWidth)
            ) {
              ctx.moveTo(el.x, height + el.y)
              ctx.lineTo(el.x, el.y)
              ctx.lineWidth = lineWidth
              ctx.strokeStyle = gradient
              ctx.stroke()
            }
            return true
          })

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
              el.x % (barWidth + barSpaceWidth) > barSpaceWidth &&
              el.x % (barWidth + barSpaceWidth) <= (barWidth + barSpaceWidth)
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

          ctx.beginPath()
          ctx.restore()
          ctx.moveTo(findYMaxValue.currentVLine.x - barWidth + 0.4,
            height + findYMaxValue.currentVLine.y)
          ctx.lineTo(findYMaxValue.currentVLine.x - barWidth + 0.4,
            findYMaxValue.currentVLine.y)
          ctx.lineWidth = barWidth
          ctx.strokeStyle = tickColor
          ctx.stroke()
          ctx.save()
        }
      }
    })

    const defaultProps = {
      width: 1200,
      height: 300,
      options: {
        animation: false,
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

    if (props.chartType === 'percentageGraph') {
      props.options.chartType = 'percentageGraph'

      if (props.barWidth) {
        props.options.barWidth = props.barWidth
      }

      if (props.barSpaceWidth) {
        props.options.barSpaceWidth = props.barSpaceWidth
      }
    }

    let plugins = []


    return (
      <React.Fragment>
        {props.dataSet && <Line
          key={Math.random()}
          data={combineChartData(props.dataSet, props.chartType)}
          plugins={plugins}
          datasetKeyProvider={this.datasetKeyProvider}
          {...props}
        />}
      </React.Fragment>
    )
  }
}

export default withTheme(StackedPercentageChart)
