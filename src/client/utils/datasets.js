import {
  chartColors,
  expectedNames,
  compareBrandChartColors,
  CVScoreChartColors,
} from 'Utils/globals'
import {
  ucfirst,
  metricSuffix,
  strToColor,
  normalize,
  getPropLabel,
  getLabelWithSuffix,
} from 'Utils'
import {
  isEmpty,
  isObject,
  isArray,
  isNumber,
  isFinite,
  isInteger,
  sortBy,
} from 'lodash'
import moment from 'moment'
import { setDatasetsFromValues } from './setDatasetsFromValues'

/**
 * Convert data to chart js structure
 * @constructor
 * @param {object} values - Values which comes from backend response.
 * @param {object} options - Option is the request params.
 * @param {object} args - Args attribute for other options:
 *
 * ...args
  {
    hoverBG: array
    backgroundColor: string,
    preparedDatasets: array,
    preparedLabels: array,
    singleDataset: bool,
    borderWidth: object || int
    useBrandLabels: bool,
    isMetric: bool - true if the endpoint used was /metric,
    customBorderColor: string,
    noBrandKeys: bool - payloads without brand key layer
    customKeys: array,
    customValueKey: string - custom key of data object (value default)
    compareBrands: bool - should be true if being used in compareBrands
    useBrands: bool - map through brandKeys instead of values
  }
  *
 */
const convertDataIntoDatasets = (values, options, ...args) => {
  const {
    hoverBG,
    isMetric,
    useBrands,
    borderWidth,
    noBrandKeys,
    singleDataset,
    preparedLabels,
    useBrandLabels,
    customValueKey,
    customValueKeyGetAll,
    backgroundColor,
    preparedDatasets,
    customBorderColor,
    customColors,
    compareBrands,
    cvScore,
    customKeys: argKeys,
  } = (args && !!args[0] && args[0]) || {}
 
  const {
    getValueinObject,
    datasetsFromValues,
    labels,
    customKeys,
    singleLevelJSON,
    brands
  } = setDatasetsFromValues({
    values,
    noBrandKeys,
    options,
    isMetric,
    preparedLabels,
    preparedDatasets,
    useBrandLabels,
    argKeys,
    customValueKey,
    customValueKeyGetAll,
    useBrands
  })
  return Object.keys(getValueinObject).reduce(
    (data, key, idx) => {
      const { datasets } = data
      const color = !!cvScore
        ? CVScoreChartColors
        : compareBrands
        ? compareBrandChartColors[idx]
        : chartColors[idx]
      return singleDataset
        ? // only one dataset is required sometimes
          // ie. doughnut chart in panoptic/engagement
          {
            labels: [...labels],
            datasets: [
              {
                borderColor: customBorderColor || color,
                label: expectedNames[options.property],
                data: datasetsFromValues || [0, 0, 0, 0],
                backgroundColor: backgroundColor || [
                  ...(datasets[0] ? datasets[0].backgroundColor : []),
                  color,
                ],
                hoverBackgroundColor: hoverBG
                  ? [
                      ...(datasets[0] ? datasets[0].hoverBackgroundColor : []),
                      color,
                    ]
                  : [],
              },
            ],
          }
        : {
            labels: [...labels],
            datasets: [
              ...datasets,
              {
                label: !!customKeys
                  ? customKeys[idx]
                  : compareBrands
                  ? brands[idx]
                  : key,
                backgroundColor: color,
                borderColor: customBorderColor || color,
                borderWidth: borderWidth || 1,
                hoverBackgroundColor: hoverBG ? color : null,
                data: singleLevelJSON
                  ? datasetsFromValues
                  : datasetsFromValues[idx] || [0, 0, 0, 0],
              },
            ],
          }
    },
    {
      labels: [],
      datasets: [],
    }
  )
}

const chartCombineDataset = (data, options, globalOptions) => {
  if (!data || !data.datasets || !data.datasets.length) return {}
  return {
    ...data,
    ...globalOptions,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      ...options[index],
    })),
  }
}

const radarChartCalculate = (data) => {
  let colorsData

  if (data && !!data.length) {
    colorsData = data
    colorsData.map((el, i) => {
      el.total = el.data.labels
        .map((a, k) => a)
        .reduce((prev, next) => prev + parseFloat(next.count), 0)

      el.progress = []

      el.data.datasets[0].backgroundColor = 'rgba(255, 255, 255, 0.3)'
      el.data.datasets[0].borderColor = 'transparent'
      el.data.datasets[0].pointBackgroundColor = '#ffffff'
      el.data.datasets[0].pointBorderColor = '#ffffff'
      el.data.datasets[0].data = []

      el.data.labels
        .map((sub, k) => sub)
        .sort((a, b) =>
          parseFloat(a.count) < parseFloat(b.count)
            ? 1
            : parseFloat(b.count) < parseFloat(a.count)
            ? -1
            : 0
        )
        .filter((m, j) => j < 3)
        .map((f, k) => {
          el.progress.push({
            leftTitle: f.name,
            color: strToColor(f.name),
            rightTitle: `${metricSuffix(f.count)}% ${ucfirst(
              el.data.datasets[0].metric
            )}`,
            value: ((f.count / el.total) * 100).toFixed(0),
          })
        })

      el.data.labels.map((sub, k) => {
        data[i].data.labels[k].color = strToColor(sub.name)
        data[i].data.labels[k].selected = !!el.progress.find(
          (selected, i) => selected.color === strToColor(sub.name)
        )
        data[i].data.datasets[0].data.push(sub.count)
      })
    })
  }
  return colorsData
}

const compareSharesData = (payload, options) => {
  const isArray = Array.isArray(payload)
  const data = isArray ? payload : Object.keys(payload.data)

  return data.map((value) => {
    const brand = isArray ? Object.keys(value.data)[0] : value
    const item = isArray ? value.data[brand] : payload.data[brand]
    const keyName = Object.keys(item)[0]

    const labelsObj = { ...item[keyName] }

    delete labelsObj.subtotal

    const labels = Object.entries(labelsObj)

    const type = (isArray ? value.platform : value) || keyName

    return {
      type: ucfirst(type),
      data: {
        labels: labels.map((color) => ({
          name: color[0]
            .split('-')
            .map((c) => ucfirst(c))
            .join('-'),
          count: color[1],
        })),
        datasets: [
          {
            label: ucfirst(brand),
            metric: options.metric,
          },
        ],
      },
    }
  })
}

const mapMultirequestLabels = ({
  revert,
  datasetLabels,
  firstPayloadLabels,
  payload,
  property,
  customOptions
}) => {
  const { backgroundColors = [], borderColors = [], borderWidth = 1 } = customOptions
  const mappingLabels = !revert ? datasetLabels : firstPayloadLabels
  return (mappingLabels).map(
    (label, index) => {
      const mappingData = !revert ? firstPayloadLabels : datasetLabels
      const data = (mappingData).map((key) => {
        const currentLabel = payload[!revert ? label : key].data
        const brand = Object.keys(currentLabel)[0]
        const response = currentLabel[brand][property]

        return response[!revert ? key : label]
      })

      const backgroundColor = backgroundColors[index] || chartColors[index]
      const borderColor = borderColors[index] || chartColors[index]

      return {
        label: ucfirst(label),
        backgroundColor,
        borderColor,
        borderWidth,
        data,
      }
    }
  )
}

const convertMultiRequestDataIntoDatasets = (
  payload,
  options,
  revert,
  customOptions = {}
) => {
  const datasetLabels = Object.keys(payload)
  const property = options.property[0]

  // get first payload for labels
  const firstPayload = payload[datasetLabels[0]].data
  const firstPayloadBrand = Object.keys(firstPayload)[0]
  const firstPayloadLabels = Object.keys(
    firstPayload[firstPayloadBrand][property]
  ).filter((key) => key !== 'subtotal')

  const datasets = mapMultirequestLabels({
    revert,
    datasetLabels,
    firstPayloadLabels,
    payload,
    property,
    customOptions
  })
  return {
    labels: !revert
      ? firstPayloadLabels.map((key) => ucfirst(key))
      : datasetLabels.map((label) => ucfirst(label)),
    datasets,
  }
}

const isDataSetEmpty = (data = {}) => {
  const { datasets = [] } = { ...data }
  if(!datasets.length) {
    return true
  }
  return data.datasets.every((dataset) =>
    !!dataset.data && !!dataset.data.length
      ? dataset.data.every(
          (val) => val === 0 || val === undefined || val === null
        )
      : true
  )
}

/*
  /brand/{brandUuid}/compare
  @sentiment {string} - 'happy-sad', 'energetic-calm', 'natural-synthetic'
 */
const convertColorTempToDatasets = (values = {}, sentiment = 'happy-sad') => {
  const { platformMetricSums, industryMetricSums } = values

  const metricObj = industryMetricSums || platformMetricSums

  const metricSums = Object.keys(
    !!industryMetricSums ? industryMetricSums : platformMetricSums
  )

  const colorTempsAndSentiments =
    !!metricSums.length &&
    metricSums.map((pf) => ({
      colorTemperature: metricObj[pf].colorTemperature,
      sentiments: metricObj[pf].sentiments,
    }))

  if (isEmpty(values) || isEmpty(metricObj) || !colorTempsAndSentiments) {
    return { labels: [], data: undefined, platforms: [] }
  }

  const metrics = ['likes', 'views', 'comments', 'shares']

  const { min, max } = Object.keys(metricObj).reduce(
    (acc, pf, idx) => {
      const metricData = metricObj[pf]

      Object.keys(metricData).forEach((metric) => {
        const metricVal = metricData[metric]
        if (!acc.min || !acc.max) {
          acc.min = metricVal
          acc.max = metricVal
        } else {
          if (metricVal < acc.min) {
            acc.min = metricVal
          }
          if (metricVal > acc.max) {
            acc.max = metricVal
          }
        }
      })

      return acc
    },
    { min: null, max: null }
  )

  const data = metrics.map((metric) => ({
    data: metricSums.map((platform, idx) => {
      const { colorTemperature, sentiments } = colorTempsAndSentiments[idx]

      const sentimentObj = sentiments.find((s) => !!s[sentiment.split('-')[0]])

      return {
        x: colorTemperature.scale,
        y: sentimentObj.scale,
        count: metricObj[platform][metric],
        color: chartColors[idx],
        size: normalize(metricObj[platform][metric], min, max, 10, 60),
      }
    }),
  }))

  return {
    data,
    platforms: metricSums.map((key, idx) => ({
      name: ucfirst(key),
      color: chartColors[idx],
    })),
    labels: metrics.map((key) => ucfirst(key)),
  }
}

export const calculateAverageVideoMap = (payload, calculateAverageData) => {
  let calculateAverage = calculateAverageData
  Object.keys(payload.video).forEach((payloadRow) => {
    const item = payloadRow
      .replace('cvScores.library_', '')
      .replace('_p', 's.p')
    let keyName = item.substr(0, item.indexOf('.'))

    if (item.includes('diffFromLibrary')) {
      calculateAverage[keyName] = {
        ...calculateAverage[keyName],
        diff: percentageBeautifier(payload.video[item]),
      }
    }
    if (item.includes('value')) {
      keyName = keyName.slice(0, keyName.length - 1)
      calculateAverage[keyName] = {
        ...calculateAverage[keyName],
        value: percentageBeautifier(payload.video[item]),
      }
    }
    if (item.includes('percentile')) {
      keyName = keyName.slice(0, keyName.length - 1)
      calculateAverage[keyName] = {
        ...calculateAverage[keyName],
        percentile: percentageBeautifier(
          payload.video[`cvScores.library_${item.replace('s.', '_')}`]
        ),
      }
    }
    calculateAverage[keyName] = {
      ...calculateAverage[keyName],
      keyName: keyName,
      order: getOrder(keyName),
    }
  })
  return calculateAverage
}

const getOrder = (keyName) => {
  let order = 0
  switch (keyName) {
    case 'view':
      order = 1
      break
    case 'like':
      order = 2
      break
    case 'comment':
      order = 3
      break
    case 'share':
      order = 4
      break
    default:
      order = 0
  }
  return order
}

const parseAverage = (payload) => {
  let calculateAverage = Object.keys(payload).reduce((acc, key) => {
    const keyIncludesLibraryMax = key.includes('LibraryMax')
    const objKeyValue = keyIncludesLibraryMax ? 'max' : 'average'
    if(key !== 'video') {
      const keyName = key.substr(0, key.indexOf('.'))
      return {
        ...acc,
        [keyName]: {
          ...acc[keyName],
          [objKeyValue]: percentageBeautifier(payload[key]),          
        }
      }
    }

    return acc
  }, {})

  calculateAverage = calculateAverageVideoMap(payload, calculateAverage)

  const returnData = Object.values(calculateAverage).sort((a, b) => {
    return a.order > b.order
  })

  return returnData
}

/* Converts the api responses from /metric & /brand/{brandUuid}/count
 * into chart data structures that
 * VideoReleases Vs Engagement will use (Panoptic/Reports)
 * @videoData {api response} from /brand/{brandUuid}/count
 * @engagementData {api response} from /metric
 *** Expected Output Structure: ***
  [{
    datasets: {array} -
      [{
        backgroundColor: string,
        data: array,
        display:bool,
        label: string
      }],
    label: string,
    labels: {array} [{string}],
    maxVideo: {int}
    maxEngagement: {int}
  }]
 */
const mapProperty = ({ data, labels, metric, durationLabels }) => {
  const emptyData = {
    Tuesday: 0,
    Monday: 0,
    Sunday: 0,
    Saturday: 0,
    Friday: 0,
    Thursday: 0,
    Wednesday: 0,
    total: 0,
    [metric]: {
      Tuesday: 0,
      Monday: 0,
      Sunday: 0,
      Saturday: 0,
      Friday: 0,
      Thursday: 0,
      Wednesday: 0,
    },
  }

  return labels.reduce((accumulator, key) => {
    const label = labels === durationLabels ? getLabelWithSuffix(key, 'duration') : key
    if (!accumulator[key]) {
      accumulator[key] = {
        metric,
        maxVideo: 100, // always 100% max
        maxEngagement: 0,
        label,
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Videos',
            backgroundColor: '#2FD7C4',
            display: false,
          },
          {
            data: [],
            label: 'Engagement',
            backgroundColor: '#5292E5',
          },
        ],
      }
    }

    const videos = data[key] || emptyData
    const engagement = videos[metric]

    for (let i = 0; i < 7; i++) {
      const weekday = moment()
        .subtract(i, 'days')
        .format('dddd')
      const weekdayShort = moment()
        .subtract(i, 'days')
        .format('dd')[0]

      // if (videos[weekday] > accumulator[key].maxVideo) {
      //   accumulator[key].maxVideo = videos[weekday]
      // }

      if (engagement[weekday] > accumulator[key].maxEngagement) {
        accumulator[key].maxEngagement = engagement[weekday]
      }

      accumulator[key].labels.unshift(weekdayShort)
      accumulator[key].datasets[0].data.unshift(
        Math.round((videos[weekday] / videos.total) * 100)
      )
      accumulator[key].datasets[1].data.unshift(
        engagement[weekday] === 0 ? 0 : engagement[weekday] * -1
      )
    }

    return accumulator
  }, {})
}

const convertVideoEngagementData = (data, metric = 'views') => {
  if (isEmpty(data)) {
    return {}
  }

  const objectKeys = Object.keys(data)

  const durationLabels = ['0-15', '16-30', '31-60', '60+']

  const labels = objectKeys.includes(...durationLabels)
    ? durationLabels
    : objectKeys

  const propertyMap = mapProperty({ data, labels, metric, durationLabels })

  return Object.values(propertyMap)
}

const getMinMaxFromDatasets = (datasets = [], initial = 0, type = 'max') => {
  let output = 0
  if (!!datasets.length) {
    output = datasets.reduce((result, dataset) => {
      const { data = [] } = dataset

      if (!!data.length) {
        const dataSetResult =
          type === 'max' ? Math.max(...data) : Math.min(...data)

        if (
          type === 'max' ? dataSetResult > result : dataSetResult < result
        ) {
          result = dataSetResult
        }
      }
      return result
    }, initial)
  }
  return output
}

//gets top n values by category of datasets.
//it defaultly returns top 5 datasets which have highest datas
export const getTopNValues = (datasets = [], n = 5) => {
  let filteredArray = []

  //returns new array with highest values
  datasets.forEach((item, index) => {
    const highest = item.data.reduce((accumulator, current) => {
      return current > accumulator ? current : accumulator
    }, 0)
    filteredArray.push({ index, highest })
  })

  //sort the array
  const sortedArray = filteredArray.sort((a, b) => {
    return b.highest - a.highest
  })

  //get n items
  const topNItems = sortedArray.slice(0, n)

  //get datasets with given indexes
  let newDatasets = []
  topNItems.forEach((item) => {
    newDatasets.push(datasets[item.index])
  })
  return newDatasets
}

// @param - Vals {object} key/value pair of label/oercentage
const convertIntoLibAndIndustryDoughnut = (obj = {}, property, color = '') => {
  const result = {
    maxKey: null,
    maxValue: null,
    chartData: null,
  }

  let vals = []
  const keys = Object.keys(obj)

  if(!!keys.length) {
    vals = Object.values(obj)
  }

  if (!!vals.length) {
    const { maxKey, maxVal } = keys.reduce(
      (max, currentKey) => {
        const { maxKey, maxVal } = max
        const val = Math.floor(obj[currentKey] * 100)
        const isHigher = val >= maxVal
        return {
          maxKey: isHigher ? currentKey : maxKey,
          maxVal: isHigher ? val : maxVal,
        }
      },
      { maxKey: null, maxVal: 0 }
    )
    const backgroundColor = keys.map(key => key === maxKey ? color : '#505050')
    result.maxKeyLabel = maxKey
    result.maxKey = getLabelWithSuffix(maxKey, property)
    result.maxValue = maxVal
    result.chartData = {
      labels: keys.map((key) => getLabelWithSuffix(key, property)),
      datasets: [
        {
          borderColor: '#ACB0BE',
          data: vals.map((val) => (val * 100).toFixed(2)),
          backgroundColor,
          hoverBackgroundColor: [],
        },
      ],
    }
  }
  return result
}

// convert an array of numbers into an array of their distrubted percentages
const convertNumberArrIntoPercentages = (arr = []) => {
  const sum = arr.reduce((tot, n) => (tot += n), 0)
  return arr.map((n) => parseFloat(((n / sum) * 100).toFixed(2)))
}

const percentageBeautifier = (value, precision) => {
  /*
  // all numbers converted to decimals
  // except 0
  if (value === 0) {
    return value
  }
  value = parseFloat(value).toFixed(2)
  const multiplier = Math.pow(100, precision || 1)
  value = Math.round(value * multiplier) / multiplier
  value = parseFloat(value).toFixed(1)
  return value
  */

  // all numbers converted to decimal with one 10th place
  // it's excepting 0 and integers
  if (isInteger(value) || value === 0) {
    return value
  }

  const multiplier = Math.pow(10, precision || 1)
  value = Math.round(value * multiplier) / multiplier

  if (value.toString().substr(-1, 1) == 0) {
    value = value.toString().replace('.0', '')
  }

  return value
}

const mapBucketObjectArray = (item) => {
  if (isNumber(item) && isFinite(item)) {
    item = percentageBeautifier(item)
  } else if (isArray(item)) {
    item.forEach((arrayItem, index) => {
      if (isNumber(item[index])) {
        item[index] = percentageBeautifier(arrayItem)
      } else {
        item[index] = percentageManipulation(item[index])
      }
    })
  } else if (isObject(item)) {
    Object.keys(item).map((key, k) => {
      item[key] = percentageManipulation(item[key])
    })
  }
  return item
}

const percentageManipulation = (bucket) => {
  if (isObject(bucket)) {
    Object.keys(bucket).map((el, i) => {
      bucket[el] = mapBucketObjectArray(bucket[el])
    })
  } else if (isArray(bucket)) {
    bucket.forEach((item, index) => {
      bucket[index] = mapBucketObjectArray(bucket[index])
    })
  } else if (isNumber(bucket) && isFinite(bucket)) {
    return percentageBeautifier(bucket)
  }

  return bucket
}

/*
 returns the chartYAxisMax, chartYAxisStepSize from the api
 */

const getCVScoreChartAttributes = (data, maxPercent) => {
  maxPercent =
    maxPercent !== undefined
      ? maxPercent
      : (!!data &&
          Object.keys(data).reduce((accumulator, key) => {
            const videoPercents = data[key].videoPercents
            const maxPercentInSet = Math.max(
              videoPercents ? videoPercents : data[key]
            )
            return maxPercentInSet > accumulator ? maxPercentInSet : accumulator
          }, 0)) ||
        0

  let chartYAxisMax
  switch (true) {
    case maxPercent > 50:
      chartYAxisMax = 100
      break
    case maxPercent < 50 && maxPercent > 33:
      chartYAxisMax = 50
      break
    case maxPercent < 33 && maxPercent > 25:
      chartYAxisMax = 33
      break
    case maxPercent < 25 && maxPercent > 20:
      chartYAxisMax = 25
      break
    case maxPercent < 20 && maxPercent > 15:
      chartYAxisMax = 20
      break
    case maxPercent < 15:
      chartYAxisMax = 15
      break
  }
  const chartYAxisStepSize = chartYAxisMax / 4
  const result = {
    chartYAxisMax,
    chartYAxisStepSize,
  }
  
  return result
}

/*
  Converts responses from `/brand/{brandUuid}/properties` into a dataset
  @param data {obj} straight response from the request
  @param options - {
    *
    type: {string} 'market' || 'library'
    *
    property: {string} 'aspectRatio' || duration' || 'format' || 'frameRate' || 'pacing' || 'resolution',
    *
    metric: {string} 'shares' || 'views' || 'likes' || 'comments'
    *
    percentage: {bool}
    *
    hoverBg: {bool}
    *
    borderColor: {string}
    *
    backgroundColors: {array}
    *
    max: {object}
    *
  }
 */
const convertPropertiesIntoDatasets = (data, options = {}) => {
  const {
    max,
    type,
    property,
    metric,
    percentage,
    hoverBg = true,
    borderColor,
    backgroundColors,
  } = options

  const dataType = type === 'library' ? 'myLibrary' : 'market'

  const bucket =
    !!data && !!data[dataType] && !!data[dataType][property]
      ? data[dataType][property]
      : null

  if (!type || !property || !data || !bucket || !metric) {
    return {}
  }

  return bucket.reduce(
    (data, bucketItem, idx) => {
      const { datasets, labels } = data
      const { bucket, library_proportion } = bucketItem

      const dataVal = percentage
        ? Math.round(parseFloat(library_proportion) * 100)
        : parseInt(bucketItem[metric]) || 0

      const color = chartColors[idx]

      return {
        labels: [...labels, bucket],
        datasets: [
          {
            borderColor: borderColor ? borderColor : color,
            label: expectedNames[options.property],
            data: [
              ...(!!datasets[0] && !!datasets[0].data ? datasets[0].data : []),
              dataVal,
            ],
            backgroundColor: backgroundColors
              ? backgroundColors
              : [
                  ...(datasets[0] ? datasets[0].backgroundColor : []),
                  max ? (max === bucket ? '#2FD7C4' : '#FFFFFF') : color,
                ],
            hoverBackgroundColor: hoverBg
              ? [
                  ...(datasets[0] ? datasets[0].hoverBackgroundColor : []),
                  color,
                ]
              : [],
          },
        ],
      }
    },
    {
      labels: [],
      datasets: [],
    }
  )
}

/*
 @ response { object } - { 0-15, 16-30, 30-60, 60+ }
 @ prop {string} - property
 @ oneChar {bool} - prefix with 'seconds' or 's'
 */

const convertDurationLabels = (response = {}, prop = null, oneChar = false) => {
  if(prop === 'duration') {
    return response
  }
  
  return Object.keys(response).reduce((acc, key) => {
      const label = oneChar
        ? getPropLabel(key, prop)
        : getLabelWithSuffix(key, prop)

      return key !== 'subtotal'
        ? {
            ...acc,
            [label]: response[key],
          }
        : acc
    }, {})
}

/* 
 input: { Facebook: { duration: { 0-15 } } } 
 output: { Facebook: { duration: { 0-15s | 0-15 seconds {oneChar} } } }
 */

const convertNestedDurationsIntoLabels = (response, oneChar = false) => {
  const property = 'duration'
  if (
    !!response &&
    !!Object.keys(response).length &&
    Object.keys(response).every((key) => !!response[key][property])
  ) {
    return Object.keys(response).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          [property]: convertDurationLabels(
            response[key][property],
            property,
            oneChar
          ),
        },
      }),
      {}
    )
  }
  return response
}

const getStepsConsistently = (max) => {
  const lengthOfMax = `${max}`.length
  const digitOfRounding = `1${'0'.repeat(lengthOfMax - 2)}`

  if (max <= 1000) {
    return Math.ceil(~~(max / 4) / 100) * 100
  }

  return (
    Math.ceil(~~(max / 4) / Number(digitOfRounding)) * Number(digitOfRounding)
  )
}

export {
  convertNestedDurationsIntoLabels,
  convertDurationLabels,
  convertPropertiesIntoDatasets,
  getCVScoreChartAttributes,
  convertDataIntoDatasets,
  chartCombineDataset,
  radarChartCalculate,
  compareSharesData,
  convertMultiRequestDataIntoDatasets,
  isDataSetEmpty,
  convertColorTempToDatasets,
  parseAverage,
  convertVideoEngagementData,
  getMinMaxFromDatasets,
  convertNumberArrIntoPercentages,
  convertIntoLibAndIndustryDoughnut,
  percentageManipulation,
  percentageBeautifier,
  getStepsConsistently,
}
