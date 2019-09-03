import React from 'react'
import { Bar, Chart } from 'react-chartjs-2'
import { barDataOptions } from './options'
import { withTheme } from 'ThemeContext/withTheme'
import { metricSuffix, customChartToolTip } from 'Utils'
import { percentageManipulation } from 'Utils/datasets'

const emptyData = {
  datasets: [],
}

const rectProto = Chart.elements.Rectangle.prototype.draw

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw() {
    if (this._chart.config.type !== 'bar') {
      return rectProto.apply(this, arguments)
    }

    const { ctx } = this._chart
    const vm = this._view
    const strokeColor =
      this._chart.options &&
      this._chart.options.chartArea &&
      this._chart.options.chartArea.backgroundColor
    const strokeWidth =
      this._chart.options &&
      this._chart.options.chartArea &&
      this._chart.options.chartArea.barSpacing

    let left,
      right,
      top,
      bottom,
      startCorner = 0

    left = vm.x - vm.width / 2
    right = vm.x + vm.width / 2
    top = vm.y
    bottom = vm.base

    ctx.beginPath()
    ctx.fillStyle = vm.backgroundColor

    const corners = [[left, bottom], [left, top], [right, top], [right, bottom]]

    let corner = corners[(startCorner + 0) % 4]
    ctx.moveTo(corner[0], corner[1])

    for (let i = 1; i < 4; i += 1) {
      corner = corners[(startCorner + i) % 4]
      let nextCornerId = i + 1
      if (nextCornerId === 4) {
        nextCornerId = 0
      }

      const width = corners[2][0] - corners[1][0]
      const height = corners[0][1] - corners[1][1]
      const x = corners[1][0]
      const y = corners[1][1]

      ctx.moveTo(x, y)
      ctx.lineTo(x + width, y)
      ctx.lineTo(x + width, y + height)
      ctx.lineTo(x, y + height)
      ctx.lineTo(x, y)
      if (strokeWidth && strokeColor) {
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = strokeColor
        ctx.stroke()
      }
    }
    ctx.fill()
  },
})

const plugins = [
  {
    beforeDraw: function(chart, easing) {
      let ctx = chart.chart.ctx
      let chartArea = chart.chartArea
      if (
        chart.config.options.chartArea &&
        chart.config.options.chartArea.backgroundColor
      ) {
        ctx.save()
        ctx.fillStyle = chart.config.options.chartArea.backgroundColor
        ctx.fillRect(
          chartArea.left,
          chartArea.top,
          chartArea.right - chartArea.left,
          chartArea.bottom - chartArea.top
        )
        ctx.restore()
      }

      let configX = chart.config.options.scales.xAxes
      //Save the rendering context state
      ctx.save()
      ctx.strokeStyle = configX[0].gridLines.color
      ctx.lineWidth = configX[0].gridLines.lineWidth

      ctx.beginPath()
      ctx.moveTo(chart.chartArea.right, chart.chartArea.top)
      ctx.lineTo(chart.chartArea.right, chart.chartArea.bottom)
      ctx.stroke()

      //Restore the rendering context state
      ctx.restore()
    },
  },
]

const StackedBarChart = (props) => {
  const {
    barData = emptyData,
    height = 300,
    width = 500,
    barSpacing,
    datalabels = false,
    xGridDisplay,
    hideLabels = false,
    metricTitle = false,
  } = props

  const themes = props.themeContext.colors

  return (
    <Bar
      key={Math.random()}
      data={{
        labels: !!barData && !!barData.labels && barData.labels,
        datasets:
          (!!barData &&
            !!barData.datasets &&
            barData.datasets.map((data, index) => {
              const indexValues = data.data.map((v, i) => {
                return barData.datasets.map((d) => d.data[i])
              })
              return {
                ...data,
                data: data.data.map((value, i) => {
                  const totalValue = indexValues[i].reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )

                  return percentageManipulation(
                    Math.round(value / (totalValue / 100))
                  )
                }),
              }
            })) ||
          [],
      }}
      width={width}
      options={{
        ...barDataOptions,
        tooltips: {
          enabled: false,
          custom: function(tooltipModel) {
            console.dir(this)
            const defaults = {
              maxWidth: 240,
              headerFontSize: 14,
              bodyFontSize: 12,
              fontFamily: 'ClanOTBold',
              background: '#505050',
              textColor: '#ffffff',

              // caret styles
              caretWidth: 8,
              caretHeight: 8,
              caretPadding: 10,
              caretColor: '#505050',

              // tolerance 'px' inside for tooltip position
              tolerance: 60,
            }

            // Tooltip Element
            let tooltipEl = document.getElementById('chartjs-tooltip')

            // Caret Element
            let caretEl = document.getElementById('chart-caret')

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div')
              tooltipEl.id = 'chartjs-tooltip'
              document.body.appendChild(tooltipEl)
            }

            if (!caretEl) {
              caretEl = document.createElement('div')
              caretEl.id = 'chart-caret'
              document.body.appendChild(caretEl)
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0
              caretEl.style.opacity = 0
              return
            }

            tooltipEl.style.zIndex = 1000

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform')
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign)
            } else {
              tooltipEl.classList.add('no-transform')
            }

            function getBody(bodyItem) {
              return bodyItem.lines
            }

            // Set Text
            if (tooltipModel.body) {
              const titleLines = tooltipModel.title || []
              const bodyLines = tooltipModel.body.map(getBody)

              let innerHtml = '<div class="chartjs-tooltip-title">'

              titleLines.forEach(function(title) {
                innerHtml +=
                  '<p style="font-size:' +
                  defaults.headerFontSize +
                  '; font-family:' +
                  defaults.fontFamily +
                  ';' +
                  '">' +
                  title +
                  '</p>'
              })
              innerHtml += '</div><div class="chartjs-tooltip-body">'

              bodyLines.forEach(function(body, i) {
                innerHtml +=
                  '<p style="font-size:' +
                  defaults.bodyFontSize +
                  '; font-family:' +
                  defaults.fontFamily +
                  ';' +
                  '">' +
                  body +
                  '</p>'
              })
              innerHtml += '</div>'

              tooltipEl.innerHTML = innerHtml
            }

            // `this` will be the overall tooltip
            const position = this._chart.canvas.getBoundingClientRect()

            console.log('==>', position, tooltipModel)

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1
            tooltipEl.style.position = 'absolute'
            tooltipEl.style.backgroundColor = defaults.background // 'rgb(226, 54, 54)'

            tooltipEl.style.padding = '10px'
            tooltipEl.style.borderRadius = '5px'
            tooltipEl.style.pointerEvents = 'none'

            // Caret Styling
            caretEl.style.opacity = 1

            let caretLeft =
              position.left +
              window.pageXOffset +
              tooltipModel.caretX -
              defaults.caretWidth

            console.log(
              '!!!',
              position.right,
              window.pageXOffset,
              tooltipModel.caretX,
              defaults.caretWidth
            )

            let caretTop =
              position.top +
              window.pageYOffset +
              tooltipModel.caretY -
              defaults.caretHeight -
              defaults.caretPadding

            let tooptipLeft =
              position.left +
              window.pageXOffset +
              tooltipModel.caretX -
              tooltipEl.clientWidth / 2

            let tooltipTop =
              position.top +
              window.pageYOffset +
              tooltipModel.caretY -
              tooltipEl.clientHeight -
              (defaults.caretHeight + defaults.caretPadding)

            if (
              position.left +
              defaults.tolerance +
              70 + // leftPadding for legend infromations
                window.pageXOffset >
              caretLeft
            ) {
              console.log('left')
              tooptipLeft = tooptipLeft + tooltipEl.clientWidth / 3
            }

            if (
              position.width - (70 + defaults.tolerance) <
              tooltipModel.caretX
            ) {
              console.log('right')
              tooptipLeft = tooptipLeft - tooltipEl.clientWidth / 3
            }

            let arrowUp = {
              borderLeft: `${defaults.caretWidth}px solid transparent`,
              borderRight: `${defaults.caretWidth}px solid transparent`,
              borderBottom: `${defaults.caretHeight}px solid ${defaults.caretColor}`,
            }
            let arrowDown = {
              borderLeft: `${defaults.caretWidth}px solid transparent`,
              borderRight: `${defaults.caretWidth}px solid transparent`,
              borderTop: `${defaults.caretHeight}px solid ${defaults.caretColor}`,
            }

            let arrowLeft = {
              borderTop: `${defaults.caretWidth}px solid transparent`,
              borderBottom: `${defaults.caretWidth}px solid transparent`,
              borderRight: `${defaults.caretHeight}px solid ${defaults.caretColor}`,
            }
            let arrowRight = {
              borderTop: `${defaults.caretWidth}px solid transparent`,
              borderBottom: `${defaults.caretWidth}px solid transparent`,
              borderLeft: `${defaults.caretHeight}px solid ${defaults.caretColor}`,
            }

            tooltipEl.style.left = tooptipLeft + 'px'

            tooltipEl.style.top = tooltipTop + 'px'
            tooltipEl.style.color = '#ffffff'
            tooltipEl.style.textAlign = 'center'

            let caretStyles = arrowDown

            caretStyles.left = caretLeft + 'px'
            caretStyles.top = caretTop + 'px'
            caretStyles.width = 0
            caretStyles.height = 0
            caretStyles.position = 'absolute'

            for (let i in caretStyles) {
              caretEl.style[i] = caretStyles[i]
            }
            // caretEl.style = caretStyles
          },
        },
        chartArea: {
          backgroundColor: themes.chartBackground,
          barSpacing,
        },
        ...(datalabels
          ? {
              plugins: {
                datalabels: {
                  formatter: (value, { datasetIndex, dataIndex }) => {
                    const ogValue =
                      !!barData &&
                      !!barData.datasets &&
                      !!barData.datasets[datasetIndex] &&
                      !!barData.datasets[datasetIndex].data &&
                      !!barData.datasets[datasetIndex].data.length &&
                      !!barData.datasets[datasetIndex].data[dataIndex]
                        ? barData.datasets[datasetIndex].data[dataIndex]
                        : value

                    return metricSuffix(ogValue)
                  },
                  align: 'center',
                  anchor: 'center',
                  color: '#fff',
                  font: {
                    size: 14,
                    family: 'ClanOTBold',
                  },
                },
              },
            }
          : {}),
        scales: {
          xAxes: [
            {
              ...barDataOptions.scales.xAxes[0],
              ticks: {
                ...barDataOptions.scales.xAxes[0].ticks,
                fontColor: themes.textColor,
                padding: 17,
                display: !hideLabels,
              },
              gridLines: {
                ...barDataOptions.scales.xAxes[0].gridLines,
                color: themes.chartStadiumBarBorder,
                display: xGridDisplay || false,
              },
            },
          ],
          yAxes: [
            {
              ...barDataOptions.scales.yAxes[0],
              ticks: {
                ...barDataOptions.scales.yAxes[0].ticks,
                fontColor: themes.textColor,
              },
              gridLines: {
                ...barDataOptions.scales.yAxes[0].gridLines,
                color: themes.chartStadiumBarBorder,
                zeroLineColor: themes.chartStadiumBarBorder,
              },
            },
          ],
        },
      }}
      plugins={plugins}
      height={height}
    />
  )
}

export default withTheme(StackedBarChart)
