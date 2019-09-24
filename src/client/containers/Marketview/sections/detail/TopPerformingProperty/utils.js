import {
  splitCamelCaseToString,
  //selectFiltersToType,
  customChartToolTip,
} from 'Utils'
import { getTopNValues, percentageManipulation } from 'Utils/datasets'

const LEGEND_COLOR_ORDER = [
  '#2fd7c4',
  '#8562f3',
  '#5292e5',
  '#acb0be',
  '#505050',
]

const customChartOptions = (colors) => {
  return {
    tooltips: customChartToolTip(colors, {
      callbacks: {
        title: () => '',
        label: (tooltipItem, data) => {
          const count =
            data &&
            data.datasets &&
            data.datasets[tooltipItem['datasetIndex']] &&
            data.datasets[tooltipItem['datasetIndex']].data[
              tooltipItem['index']
            ]
          const name =
            data &&
            data.datasets &&
            data.datasets[tooltipItem['datasetIndex']] &&
            data.datasets[tooltipItem['datasetIndex']].label
          return `${count ? count : 0}% ${!!name && `| ${name}`}`
        },
      },
    }),
  }
}

const referencesData = (chartData) => {
  return (
    chartData &&
    chartData.datasets &&
    chartData.datasets.map((item) => ({
      text: item.label,
      color: item.backgroundColor,
    }))
  )
}

const createTitle = (title, topProperty, container) => {
  return title
    ? title
    : `Top Performing ${
        topProperty ? `${splitCamelCaseToString(topProperty)},` : ''
      } Across All ${container === 'competitor' ? 'Competitors' : 'Platforms'}`
}

const chartTickOptions = () => {
  return {
    min: 0,
    max: 100,
    stepSize: 25,
    callback(value) {
      return `${value}%`
    },
  }
}

const normalizeData = (chartData = {}) => {
  if (chartData.datasets && chartData.datasets.length) {
    const { datasets, labels } = chartData
    //find the highest value for each group
    let highestValuesArr = []
    labels.forEach((item, index) => {
      highestValuesArr[index] = 0
      datasets.forEach((dataset) => {
        highestValuesArr[index] += dataset.data[index]
      })
    })

    //change the data related to highest value as percentages
    const newData = {
      ...chartData,
      datasets: datasets.map((dataset) => {
        return {
          ...dataset,
          oldData: [...dataset.data],
          data: dataset.data.map((data, i) => {
            const highestValue = highestValuesArr[i]
            return percentageManipulation((data * 100) / highestValue)
          }),
        }
      }),
    }
    return newData
  }
  return chartData
}

const createChartData = (data) => {
  if (!!data.datasets && !!data.datasets.length && data.datasets.length > 5) {
    const top5datasets = getTopNValues(data.datasets, 5)
    data = { ...data, datasets: top5datasets }
  }
  data = normalizeData(data)

  !!data &&
    !!data.datasets &&
    data.datasets.forEach((set, index) => {
      set.backgroundColor = LEGEND_COLOR_ORDER[index]
    })
  return data
}

export {
  customChartOptions,
  referencesData,
  createTitle,
  chartTickOptions,
  normalizeData,
  createChartData,
}
