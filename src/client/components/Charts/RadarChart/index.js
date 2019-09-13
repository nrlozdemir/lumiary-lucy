import React from 'react'
import { Radar } from 'react-chartjs-2'
import { withTheme } from 'ThemeContext/withTheme'
import { metricSuffix, customChartToolTip, ucfirst } from 'Utils'
import { percentageBeautifier } from 'Utils/datasets'
import { modifyTooltip } from 'Utils/tooltip'
import { generatePlugins } from './plugins'

const RadarChart = (props) => {
  const plugins = generatePlugins(props)
  const {
    data,
    key,
    width,
    height,
    tooltipType = false,
    platform = false,
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

  labels.forEach((label) => {
    if (colorOrder[label.name]) {
      colorOrder[label.name] = label
    }
  })

  const useAllVals = true

  const thisData = Object.keys(colorOrder).reduce(
    (accumulator, key) => {
      let count = colorOrder[key].count || 0
      if (count !== 0 || useAllVals) {
        accumulator.dataKeys.push(key)
        accumulator.dataValues.push(count || 0)
      }
      return accumulator
    },
    {
      dataKeys: [],
      dataValues: [],
    }
  )

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
        layout: {
          padding: 35,
        },
        tooltips:
          (!!tooltipType &&
            (tooltipType === 'basic' &&
              customChartToolTip(themes, {
                callbacks: {
                  title: () => '',
                  label: function(tooltipItem, data) {
                    const count =
                      (data &&
                        data.labels &&
                        data.labels[tooltipItem['index']] &&
                        data.labels[tooltipItem['index']].count) ||
                      0
                    const metric =
                      (data &&
                        data.datasets &&
                        data.datasets[0] &&
                        data.datasets[0].metric) ||
                      ''
                    const name =
                      data &&
                      data.labels &&
                      data.labels[tooltipItem['index']] &&
                      data.labels[tooltipItem['index']].name
                    return `${metricSuffix(count) || 0}% ${ucfirst(metric) ||
                      ''} ${!!name && `| ${name}`}`
                  },
                },
              }))) ||
          (tooltipType === 'extended' &&
            modifyTooltip(
              {
                template: 'RadarChartTemplate',
                data: theData,
                metric:
                  (data &&
                    data.datasets &&
                    data.datasets[0] &&
                    ucfirst(data.datasets[0].metric)) ||
                  '',
                platform: !!platform && platform,
                options: {
                  background: themes.tooltipBackground,
                  textColor: themes.tooltipTextColor,
                  caretColor: themes.tooltipBackground,
                },
              },
              {
                mode: 'single',
              }
            )),
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
