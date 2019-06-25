import React from 'react'
import { Radar, Chart } from 'react-chartjs-2'
import { withTheme } from 'ThemeContext/withTheme'
import { metricSuffix } from 'Utils'

function openTooltip(chart, easing, datasetIndex, pointIndex){
  if(chart.tooltip._active == undefined)
     chart.tooltip._active = []
  var activeElements = chart.tooltip._active
  var requestedElem = chart.getDatasetMeta(datasetIndex).data[pointIndex]
  for(var i = 0; i < activeElements.length; i++) {
      if(requestedElem._index == activeElements[i]._index)  
         return
  }
  activeElements.push(requestedElem)
  chart.tooltip._active = activeElements
  chart.tooltip.update(true)
  chart.draw()
}

function closeTooltip(chart, datasetIndex, pointIndex){
  var activeElements = chart.tooltip._active
  if (activeElements == undefined || activeElements.length == 0) {
    return
  }
  var requestedElem = chart.getDatasetMeta(datasetIndex).data[pointIndex]
  for (var i = 0; i < activeElements.length; i++) {
      if (requestedElem._index == activeElements[i]._index)  {
         activeElements.splice(i, 1)
         break
      }
  }
  chart.tooltip._active = activeElements
  chart.tooltip.update(true)
  chart.draw()
}

function closeAllTooltips(chart){
  chart.tooltip._active = []
  chart.tooltip.update(true)
  chart.draw()
}

let tooltipArea = {}
const plugins = [
  {
    beforeDraw: function(chart, easing) {
      let ctx = chart.chart.ctx
      let chartArea = chart.chartArea
      chart.config.data.datasets.forEach(function(dataset, i) {
        chart.controller.getDatasetMeta(i).data.forEach(function(bar, index) {
          ctx.beginPath()
          const color = chart.config.data.labels[index].color
          const selected = chart.config.data.labels[index].selected
          const pointLabelPosition = bar._scale.getPointPosition(
            index,
            bar._scale.getDistanceFromCenterForValue(bar._scale.max) +
              (selected ? 31 : 25)
          )
          // draw a circle at that point
          ctx.beginPath()
          ctx.arc(
            pointLabelPosition.x,
            pointLabelPosition.y,
            selected ? 12 : 6,
            0,
            2 * Math.PI,
            false
          )
          ctx.fillStyle = color
          ctx.fill()

          tooltipArea[index] = {
            index: index,
            sector: bar,
            x: pointLabelPosition.x,
            y: pointLabelPosition.y
          }

          if (selected) {
            ctx.stroke()
            // ctx.shadowColor = 'black'
            // ctx.shadowBlur = 0
            // ctx.shadowOffsetX = 0
            // ctx.shadowOffsetY = 8
          }
        })
      })

      // circles mouse on event
      ctx.canvas.addEventListener('mousemove', (e) => {
        Object.values(tooltipArea).map((p, i) => {
          if (p.x > e.offsetX - 12 
            && p.x < e.offsetX + 12 
            && p.y > e.offsetY - 12 
            && p.y < e.offsetY + 12
          ) {
            chart.options.tooltips.enabled = true
            openTooltip(chart, easing, 0, p.index)
          } else {
            if (chart.tooltip._active.length > 0) {
              chart.options.tooltips.enabled = false
              //closeTooltip(chart, 0, p.index)
            }
          }
        })
      })

      ctx.canvas.addEventListener('mouseout', (e) => {

        chart.options.tooltips.enabled = false
        if (chart.tooltip._active.length > 0) {
          closeAllTooltips(chart)
        }
      })
    },
  },
]

Chart.Tooltip.positioners.custom = function(e, p) {
  if ( ! e.length) {
    return false
  }

  return {
    x: tooltipArea[e[0]._index].x,
    y: tooltipArea[e[0]._index].y
  }
}


const RadarChart = (props) => {
  const { data, width = 400, height = 400 } = props
  const themes = props.themeContext.colors
  let parsedData = data
  parsedData.datasets[0].backgroundColor = 'rgb(82, 146, 229, 0.5)'
  parsedData.datasets[0].pointBackgroundColor = 'transparent'
  parsedData.datasets[0].pointBorderColor = 'transparent'
  parsedData.datasets[0].pointHoverBackgroundColor = 'transparent'
  parsedData.datasets[0].pointHoverBorderColor = 'transparent'

  parsedData.datasets[0].pointBorderWidth = 0
  parsedData.datasets[0].pointHoverBorderWidth = 0
  parsedData.datasets[0].pointHitRadius = 0

  
  let maxTicksStepLimit = Object.values(parsedData.datasets[0].data).reduce((prev, next) => {
    return (prev < next) ? next : prev
  }, 10)

  if (maxTicksStepLimit > 10) {
    maxTicksStepLimit = (Math.ceil(maxTicksStepLimit / 10) * 10)
  }

  const maxTicksLimit = 5
  const lineWidth = 16
  const stepSize = 1

  return (
    <Radar
      data={parsedData}
      width={width}
      height={height}
      plugins={plugins}
      options={{
        elements: {
          line: {
            tension: 0
          }
        },
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          },
        },
        tooltips: {
          enabled: false,
          position: 'custom',
          mode: 'label',
          backgroundColor: themes.tooltipBackground,
          cornerRadius: 6,
          titleFontColor: themes.tooltipRadarChartTextColor,
          titleFontFamily: 'ClanOTBold',
          titleFontStyle: 'normal',
          titleFontSize: 12,
          bodyFontColor: themes.tooltipRadarChartTextColor,
          bodyFontFamily: 'ClanOTBold',
          bodyFontStyle: 'normal',
          bodyFontSize: 12,
          xPadding: 12,
          yPadding: 12,
          caretPadding: 0,
          bodySpacing: 0,
          titleMarginBottom: 8,
          caretSize: 8,
          yAlign: 'bottom',
          xAlign: 'center',
          displayColors: false,
          callbacks: {
            title: function(items, data) {
              return [
                'This Video:',
                data.datasets[0].data[items[0].index] + '%',
                data.labels[items[0].index].name
              ].join(' ')
            },
            label: function(items, data) {
              return [
                'This Shot:',
                data.datasets[0].data[items.index] + '%',
                data.labels[items.index].name
              ].join(' ')
            },
            labelColor: function(tooltipItem, chart) {
              return {
                borderColor: 'transparent',
                backgroundColor: 'transparent'
              }
            },
            labelTextColor: function(tooltipItem, chart) {
                return themes.tooltipRadarChartTextColor
            }
          }
        },
        plugins: {
          datalabels: false,
        },
        scale: {
          gridLines: {
            lineWidth: lineWidth,
            zeroLineColor: '#FFF',
            color: themes.bodyBackground,
          },
          pointLabels: {
            callback: function(value, index, values) {
              return ''
            },
            lineHeight: 4,
          },
          ticks: {
            callback: function(value) {
              return ''
            },
            backdropColor: 'transparent',
            fontSize: 10,
            display: true,
            maxTicksLimit: maxTicksLimit,
            min: 0,
            max: maxTicksStepLimit,
            beginAtZero: true,
            stepSize: stepSize,
          },
          angleLines: {
            color: 'rgba(90, 99, 134, 0.3)',
          },
        },
      }}
    />
  )
}

export default withTheme(RadarChart)
