
import { modifyTooltip } from 'Utils/tooltip'
import { metricSuffix, customChartToolTip, ucfirst } from 'Utils'

export const tooltips = (props, theData) => {
  const {
    data,
    tooltipType = false,
    platform = false,
    themeContext = {}
  } = props
  const { colors: themes = {} } = themeContext

  return (!!tooltipType &&
    (tooltipType === 'basic' &&
      customChartToolTip(themes, {
        callbacks: {
          title: () => '',
          label: function (tooltipItem, data) {
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
      ))
}

export const generateThisData = (colorOrder) => {
  const useAllVals = true

  const thisData = Object.keys(colorOrder).reduce((accumulator, key) => {
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

  return thisData
}