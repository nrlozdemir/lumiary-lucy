import React from 'react'
import { Radar } from 'react-chartjs-2'
import { withTheme } from 'ThemeContext/withTheme'
import { percentageBeautifier } from 'Utils/datasets'
import { generatePlugins } from './plugins'
import { tooltips, generateThisData } from './utils'

const colorOrder = {
  Red: {},
  'Orange-Red': {},
  Orange: {},
  'Yellow-Orange': {},
  Yellow: {},
  'Yellow-Green': {},
  Green: {},
  'Blue-Green': {},
  Blue: {},
  'Blue-Purple': {},
  Purple: {},
  'Red-Purple': {},
}

const RadarChart = (props) => {
  const plugins = generatePlugins(props)
  const {
    data,
    width,
    height,
  } = props
  const themes = props.themeContext.colors
  let parsedData = data || {}
  let maxTicksStepLimit = 100000
  let stepSize = 25000

  const hasData =
    !!parsedData && !!parsedData.datasets && !!parsedData.datasets[0]

  if (hasData) {
    parsedData.datasets[0].backgroundColor = themes.chartBackgroundColor
    parsedData.datasets[0].pointBackgroundColor =
      themes.chartPointBackgroundColor
    parsedData.datasets[0].pointBorderColor = themes.chartPointBorderColor
    parsedData.datasets[0].pointBorderWidth = 4

    const max = Math.max(...parsedData.datasets[0].data)
    stepSize = max / 4
    maxTicksStepLimit = max
  }

  const { labels = [] } = parsedData

  labels.forEach((label) => {
    if (colorOrder[label.name]) {
      colorOrder[label.name] = label
    }
  })
  const thisData = generateThisData(colorOrder)

  const theData =
    labels.length === 0
      ? {}
      : {
          datasets: [
            {
              ...parsedData.datasets[0],
              data: thisData.dataValues,
            },
          ],
          labels: thisData.dataKeys.map((color) => {
            return colorOrder[color]
          }),
        }

  return (
    <Radar
      key={`radar-${Math.floor(Math.random() * 1000)}`}
      width={width}
      height={height}
      data={theData}
      plugins={plugins}
      options={{
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: tooltips(props, theData),
        plugins: {
          datalabels: false,
        },
        scale: {
          gridLines: {
            display: true,
            lineWidth: 25,
            color: themes.bodyBackground,
          },
          pointLabels: {
            callback: function(value, index, values) {
              return ''
            },
            lineHeight: 4,
            borderColor: themes.textColor,
          },
          ticks: {
            display: false,
            stepSize,
            callback: function(value) {
              return percentageBeautifier(value) + '%'
            },
            backdropColor: '#000',
            fontSize: 10,
            fontFamily: 'ClanOTNews',
            fontColor: themes.chartTickColor,
            maxTicksLimit: 5,
            min: 0,
            max: hasData ? maxTicksStepLimit : 0,
            beginAtZero: true,
          },
          angleLines: {
            display: false,
            customColor: themes.chartAngleLineColor,
          },
        },
      }}
    />
  )
}

export default withTheme(RadarChart)
