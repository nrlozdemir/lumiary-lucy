import {
  chartColors,
  expectedNames,
  compareBrandChartColors,
} from 'Utils/globals'
import {
  ucfirst,
  metricSuffix,
  strToColor,
  normalize,
  getTimeBucket,
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
  }
  *
 */

const convertDataIntoDatasets = (values, options, ...args) => {
  const {
    hoverBG,
    isMetric,
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
    customKeys: argKeys,
  } = (args && !!args[0] && args[0]) || {}

  let labels
  let datasetsFromValues
  let singleLevelJSON
  let customKeys = argKeys
  let getValueinObject

  const brands = Object.keys(values.data || values)

  const brandObjects = brands.map((b) =>
    values.data ? values.data[b] : values[b]
  )

  getValueinObject = noBrandKeys
    ? values[options.property[0]]
    : brandObjects[0][options.property[0]]

  const timeBucket =
    !!options.dateBucket && options.dateBucket !== 'none'
      ? getTimeBucket(getValueinObject)
      : null

  if (!!getValueinObject && getValueinObject.hasOwnProperty('subtotal')) {
    delete getValueinObject.subtotal
  }

  // If time bucket was  selected, it will change labels to time labels
  // defined within a data object from the api response
  if (timeBucket) {
    datasetsFromValues = Object.keys(getValueinObject).map((item) =>
      timeBucket.map((date) => getValueinObject[item][date])
    )
    labels = timeBucket
  }

  // If proportionOf was  selected, it will change labels to time labels and it will set up datasets according to selected proportionOf
  if (options.proportionOf) {
    datasetsFromValues = Object.keys(getValueinObject).map((key) =>
      Object.keys(getValueinObject[key]).map(
        (item) =>
          // users should not see the subtotal value in the graphs
          getValueinObject[key][item]
      )
    )
    labels = Object.keys(getValueinObject).map((k) =>
      getLabelWithSuffix(k, options.property[0])
    )
  }

  // if timebucket or proportionOf werent selected, it will get data from single level json
  if (!timeBucket && !options.proportionOf) {
    datasetsFromValues = Object.keys(getValueinObject).map(
      (key) => getValueinObject[key]
    )
    labels = Object.keys(getValueinObject).map((k) =>
      getLabelWithSuffix(k, options.property[0])
    )
    singleLevelJSON = true
  }

  if (brands.length > 1 && !noBrandKeys) {
    datasetsFromValues = brandObjects.map((brand, idx) => {
      const brandProp = Object.keys(brand)[0]
      const brandDataObj = brandObjects[idx][brandProp]
      if (isMetric) {
        return brandDataObj
      } else {
        return Object.keys(brand[brandProp]).map((key) => brandDataObj[key])
      }
    })
    singleLevelJSON = false
    getValueinObject = brands
  }

  // metric data comes with sum and percent
  if (isMetric) {
    datasetsFromValues = datasetsFromValues.map((d) =>
      !timeBucket
        ? d.percent || 0
        : Object.keys(d.percents).map((key) => d.percents[key] || 0)
    )
    customKeys = !customKeys ? brands : customKeys
  }
  // if dataset values type of object, get value in the object
  if (
    datasetsFromValues &&
    typeof datasetsFromValues[0] === 'object' &&
    !Array.isArray(datasetsFromValues[0])
  ) {
    datasetsFromValues = datasetsFromValues.map((d) =>
      customValueKey
        ? d[customValueKey] || 0
        : customValueKeyGetAll
        ? d
        : d.value || 0
    )
  }

  // Object.keys(
  //  brandObjects[0][Object.keys(brandObjects[0])]
  // ).map((value) => brandObjects.map((brand) => brand.duration[value]))
  // You can pass prepared labels or datasets in args
  labels =
    (preparedLabels ? preparedLabels : useBrandLabels ? brands : labels) ||
    labels

  datasetsFromValues = preparedDatasets || datasetsFromValues
  return Object.keys(getValueinObject).reduce(
    (data, key, idx) => {
      const { datasets } = data
      const color = compareBrands
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
            rightTitle: `${metricSuffix(f.count)} ${ucfirst(
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

const convertMultiRequestDataIntoDatasets = (payload, options, revert) => {
  const datasetLabels = Object.keys(payload)
  const property = options.property[0]

  // get first payload for labels
  const firstPayload = payload[datasetLabels[0]].data
  const firstPayloadBrand = Object.keys(firstPayload)[0]
  const firstPayloadLabels = Object.keys(
    firstPayload[firstPayloadBrand][property]
  ).filter((key) => key !== 'subtotal')

  const datasets = (!revert ? datasetLabels : firstPayloadLabels).map(
    (label, index) => {
      const data = (!revert ? firstPayloadLabels : datasetLabels).map((key) => {
        const currentLabel = payload[!revert ? label : key].data
        const brand = Object.keys(currentLabel)[0]
        const response = currentLabel[brand][property]

        return response[!revert ? key : label]
      })

      return {
        label: ucfirst(label),
        backgroundColor: chartColors[index],
        borderColor: chartColors[index],
        borderWidth: 1,
        data,
      }
    }
  )
  return {
    labels: !revert
      ? firstPayloadLabels.map((key) => ucfirst(key))
      : datasetLabels.map((label) => ucfirst(label)),
    datasets,
  }
}

const isDataSetEmpty = (data) => {
  if (!!data && !!data.datasets && !!data.datasets.length) {
    return data.datasets.every((dataset) =>
      !!dataset.data && !!dataset.data.length
        ? dataset.data.every(
            (val) => val === 0 || val === undefined || val === null
          )
        : true
    )
  } else {
    return true
  }
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

const parseAverage = (payload) => {
  let calculateAverage = Object.keys(payload).reduce((acc, key) => {
    const keyName = key !== 'video' && key.substr(0, key.indexOf('.'))
    if (keyName) {
      if (key.includes('LibraryAverage')) {
        acc[keyName] = {
          ...acc[keyName],
          average: percentageBeautifier(payload[key]),
        }
      }
      if (key.includes('LibraryMax')) {
        acc[keyName] = {
          ...acc[keyName],
          max: percentageBeautifier(payload[key]),
        }
      }
    }

    return acc
  }, {})

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
const convertVideoEngagementData = (data, metric = 'views') => {
  if (isEmpty(data)) {
    return []
  }

  const formats = Object.keys(data)

  const dateBuckets = Object.keys(data[formats[0]][metric])

  return formats.map((fmt) => {
    const videoCounts = dateBuckets.map((db) =>
      !!data[fmt] && !!data[fmt][db] ? data[fmt][db] : 0
    )

    const engagementCounts = dateBuckets.map((db) =>
      !!data[fmt] && !!data[fmt][metric] && !!data[fmt][metric][db]
        ? -Math.abs(data[fmt][metric][db])
        : 0
    )

    const maxCount = (array) => Math.max.apply(null, array.map(Math.abs))

    return {
      maxVideo: maxCount(videoCounts),
      maxEngagement: maxCount(engagementCounts),
      labels: dateBuckets.map(
        (db, idx) => `${db[0]}${/\d/.test(db) ? idx : ''}`
      ),
      label: fmt,
      datasets: [
        {
          data: videoCounts,
          label: 'Videos',
          backgroundColor: '#2FD7C4',
          display: false,
        },
        {
          data: engagementCounts,
          label: 'Engagement',
          backgroundColor: '#5292E5',
        },
      ],
    }
  })
}

const getMinMaxFromDatasets = (datasets = [], initial = 0, type = 'max') => {
  return !!datasets.length
    ? datasets.reduce((result, dataset) => {
        const { data } = dataset

        if (!!data && !!data.length) {
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
    : 0
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
const convertIntoLibAndIndustryDoughnut = (obj, property, color = '') => {
  const result = {
    maxKey: null,
    maxValue: null,
    chartData: null,
  }

  const keys = (!!obj && Object.keys(obj)) || []

  const vals = (!!keys.length && Object.values(obj)) || []

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

    result.maxKeyLabel = maxKey
    result.maxKey = getLabelWithSuffix(maxKey, property)
    result.maxValue = maxVal
    result.chartData = {
      labels: keys.map((key) => getLabelWithSuffix(key, property)),
      datasets: [
        {
          borderColor: '#ACB0BE',
          data: vals.map((val) => (val * 100).toFixed(2)),
          backgroundColor: keys.map((key) => (key === maxKey ? color : '#fff')),
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

const percentageManipulation = (bucket) => {
  if (isObject(bucket)) {
    Object.keys(bucket).map((el, i) => {
      if (isNumber(bucket[el]) && isFinite(bucket[el])) {
        bucket[el] = percentageBeautifier(bucket[el])
      } else if (isArray(bucket[el])) {
        bucket[el].forEach((item, index) => {
          if (isNumber(bucket[el][index])) {
            bucket[el][index] = percentageBeautifier(item)
          } else {
            bucket[el][index] = percentageManipulation(bucket[el][index])
          }
        })
      } else if (isObject(bucket[el])) {
        Object.keys(bucket[el]).map((key, k) => {
          bucket[el][key] = percentageManipulation(bucket[el][key])
        })
      }
    })
  } else if (isArray(bucket)) {
    bucket.forEach((item, index) => {
      if (isNumber(bucket[index]) && isFinite(bucket[el])) {
        bucket[index] = percentageBeautifier(item)
      } else if (isArray(bucket[index])) {
        bucket[index].forEach((arrayItem, arrayIndex) => {
          if (isNumber(bucket[index][arrayIndex])) {
            bucket[index][arrayIndex] = percentageBeautifier(arrayItem)
          } else {
            bucket[index][arrayIndex] = percentageManipulation(
              bucket[index][arrayIndex]
            )
          }
        })
      } else if (isObject(bucket[index])) {
        Object.keys(bucket[index]).map((key, k) => {
          bucket[index][key] = percentageManipulation(bucket[index][key])
        })
      }
    })
  } else if (isNumber(bucket) && isFinite(bucket)) {
    return percentageBeautifier(bucket)
  }

  return bucket
}

/*
 returns the chartYAxisMax, chartYAxisStepSize from the api
 */

const getCVScoreChartAttributes = (data) => {
  const maxVideoPercent =
    (!!data &&
      Object.keys(data).reduce((accumulator, key) => {
        const maxPercentInSet = Math.max(...data[key].videoPercents)
        return maxPercentInSet > accumulator ? maxPercentInSet : accumulator
      }, 0)) ||
    0

  const chartYAxisMax = maxVideoPercent > 50 ? 100 : 50
  const chartYAxisStepSize = maxVideoPercent > 50 ? 25 : 12.5

  return {
    chartYAxisMax,
    chartYAxisStepSize,
  }
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
    // console.log('type', type)
    // console.log('property', property)
    // console.log('data', data)
    // console.log('bucket', bucket)
    // console.log('metric', metric)
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

export {
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
}
