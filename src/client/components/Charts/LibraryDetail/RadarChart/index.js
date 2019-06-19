import React from 'react'
import { Radar } from 'react-chartjs-2'
import { withTheme } from 'ThemeContext/withTheme'
import { metricSuffix } from 'Utils'

const plugins = [
  {
    beforeDraw: function(chart, easing) {
      let ctx = chart.chart.ctx
      let chartArea = chart.chartArea
      chart.config.data.datasets.forEach(function(dataset, i) {
        const meta = chart.controller.getDatasetMeta(i)
        meta.data.forEach(function(bar, index) {
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
          
          /*
            clientX: 306
​            clientY: 489

            layerX: 266
            layerY: 428
            ​
            offsetX: 0
            offsetY: 0
            ​
            pageX: 306
            pageY: 2340
            ​
            screenX: 306
            screenY: 666

            x: 306
            y: 489


            console.log("i: " + index + 
            ",clientX: " + e.clientX + ", clientY: " + e.clientY + 
            ",layerX: " + e.layerX + ", layerY: " + e.layerY + 
            ",offsetX: " + e.offsetX + ", offsetY: " + e.offsetY + 
            ",pageX: " + e.pageX + ", pageY: " + e.pageY + 
            ",screenX: " + e.screenX + ", screenY: " + e.screenY + 
            ", posX: " + pointLabelPosition.x + ", posY:" + pointLabelPosition.y
            )
            
          */
          
            ctx.canvas.addEventListener('click', (e) => {

            if (pointLabelPosition.x > e.offsetX - 12 && pointLabelPosition.x < e.offsetX + 12 && 
              pointLabelPosition.y > e.offsetY - 12 && pointLabelPosition.y < e.offsetY + 12
            ) {
              console.log("i: " + index + ",X: " + e.offsetX + ", Y: " + e.offsetY + ", posX: " + pointLabelPosition.x + ", posY:" + pointLabelPosition.y)
            }
          })
          

          /*
          ctx.canvas.addEventListener('mouseover', (e) => {
            console.log(e)
          })
          */

          //console.log(pointLabelPosition.x, pointLabelPosition.y)

          if (selected) {
            ctx.stroke()
            // ctx.shadowColor = 'black'
            // ctx.shadowBlur = 0
            // ctx.shadowOffsetX = 0
            // ctx.shadowOffsetY = 8
          }
        })
      })
    },
  },
]

const RadarChart = (props) => {
  const { data, width = 430, height = 430 } = props
  const themes = props.themeContext.colors
  let parsedData = data
  parsedData.datasets[0].backgroundColor = themes.chartBackgroundColor
  parsedData.datasets[0].pointBackgroundColor = themes.chartPointBackgroundColor
  parsedData.datasets[0].pointBorderColor = themes.chartPointBorderColor
  const maxTicksStepLimit = parsedData.datasets[0].data.every(
    (n) => n <= 100000 // 100k
  )
    ? 100000 // 100k
    : Math.max(...parsedData.datasets[0].data) // any big number than 100k
  return (
    <Radar
      data={parsedData}
      width={width}
      height={height}
      plugins={plugins}
      options={{
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        layout: {
          padding: 30,
        },
        tooltips: {
          backgroundColor: '#fff',
          cornerRadius: 6,
          titleFontColor: '#000',
          mode: 'point',
          titleFontFamily: 'ClanOTBold',
          bodyFontColor: '#000',
          yAlign: 'bottom',
          xAlign: 'center',
          displayColors: false,
          callbacks: {
            title: () => '',
            label: function(tooltipItem, data) {
              return data.labels[tooltipItem['index']].name
            },
            afterLabel: function(tooltipItem, data) {
              return (
                metricSuffix(data.labels[tooltipItem['index']].count) + ' Shares'
              )
            },
          },
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
              return metricSuffix(value)
            },
            backdropColor: 'transparent',
            fontSize: 10,
            display: true,
            maxTicksLimit: 5,
            min: 0,
            max: 100,
            beginAtZero: true,
            stepSize: 25,
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
