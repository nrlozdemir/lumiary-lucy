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
              //closeAllTooltips(chart)
            }
          }
        })
      })

      ctx.canvas.addEventListener('mouseout', (e) => {
        if (chart.tooltip._active.length > 0) {
          closeAllTooltips(chart)
        }
      })
    },
  },
]

console.log(Chart.Tooltip)

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
  const { data, width = 430, height = 430 } = props
  const themes = props.themeContext.colors
  let parsedData = data
  parsedData.datasets[0].backgroundColor = themes.chartBackgroundColor
  parsedData.datasets[0].pointBackgroundColor = themes.chartPointBackgroundColor
  parsedData.datasets[0].pointBorderColor = themes.chartPointBorderColor
  
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
          padding: 30,
        },
        tooltips: {
          enabled: true,
          position: 'custom',
          mode: "label",
          backgroundColor: '#fff',
          cornerRadius: 6,

          titleFontColor: '#23294b',
          titleFontFamily: 'ClanOTBold',
          titleFontStyle: 'bold',
          titleFontSize: 13,

          bodyFontColor: '#23294b',
          bodyFontFamily: 'ClanOTBold',
          bodyFontStyle: 'bold',
          bodyFontSize: 13,

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
                return '#23294b';
            }
          }
        },
        plugins: {
          datalabels: false,
        },
        scale: {
          gridLines: {
            lineWidth: 20,
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
            maxTicksLimit: 6,
            min: 0,
            max: 8,
            beginAtZero: true,
            stepSize: 1,
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
