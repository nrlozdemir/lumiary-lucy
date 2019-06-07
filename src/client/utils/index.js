import { chartColors, expectedNames } from 'Utils/globals'
import { isEmpty } from 'lodash'

function randomKey(char) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < char; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

/*
  Returns an array of time labels from the api response
  * Expected labels:
     week - ['Week 1', 'Week 2', 'Week 3', 'Week 4']
     month - array of 3 months from the current
     dayOfWeek - array of 7 days from the current
 */
const getTimeBucket = (value) => {
  const keys = Object.keys(value)
  if (!!keys.length) {
    // sometimes there is a null key
    return Object.keys(value[keys[0]])
      .reduce(
        (all, label) => [...all, ...(label !== 'null' ? [label] : [])],
        []
      )
      .reverse()
  }
  return []
}

const getLabelWithSuffix = (label, property) => {
  let suffix

  switch (property) {
    case 'duration':
      suffix = 'seconds'
      break
    case 'frameRate':
      suffix = 'FPS'
      break
    default:
      suffix = ''
  }
  return `${label} ${suffix}`
}

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
  }
  *
 */

const convertDataIntoDatasets = (values, options, ...args) => {
  let labels
  let datasetsFromValues
  let singleLevelJSON
  let customKeys
  let getValueinObject

  const {
    hoverBG,
    isMetric,
    borderWidth,
    noBrandKeys,
    singleDataset,
    preparedLabels,
    useBrandLabels,
    backgroundColor,
    preparedDatasets,
    customBorderColor,
  } = (args && !!args[0] && args[0]) || {}

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

  delete getValueinObject.subtotal

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
    customKeys = brands
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
      const color = chartColors[idx]
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
                label: !!customKeys ? customKeys[idx] : key,
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

function socialIconSelector(key) {
  if (!key) return
  const keyToLowerCase = key.toLowerCase()
  const socialIcons = {
    facebook: 'icon-Facebook-Bubble',
    twitter: 'icon-Twitter-Bubble',
    instagram: 'icon-Instagram-Bubble',
    youtube: 'icon-YouTube-Bubble',
  }

  return socialIcons[keyToLowerCase]
}

function toSlug(str) {
  str = str.replace(/^\s+|\s+$/g, '')
  str = str.toLowerCase()

  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const to = 'aaaaeeeeiiiioooouuuunc------'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return str
}

function chartCombineDataset(data, options, globalOptions) {
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

function searchTermInText(text, term, New) {
  const splitWords = term.split(' ')
  let bool = false

  if (New) {
    splitWords.forEach((word) => {
      if (
        String(text)
          .toLowerCase()
          .indexOf(String(word).toLowerCase()) > -1
      )
        bool = true
    })
  } else {
    if (text === term) bool = true
  }

  return bool
}

const shadeHexColor = (color, percent) => {
  if (!color || !percent) return
  let f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  )
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const addComma = (number) => {
  number = parseInt(number)
  if (number >= 1e3) {
    const unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3
    const unitname = ['k', 'm', 'B', 'T'][Math.floor(unit / 3) - 1]
    return (number / ('1e' + unit)).toFixed(0) + unitname
  }

  return number
}

const strToColor = (str) => {
  str = str.toLowerCase().replace(/\s/g, '')

  const color = {
    red: '#cc2226',
    'orange-red': '#dd501d',
    orange: '#eb7919',
    'yellow-orange': '#f8b90b',
    yellow: '#fff20d',
    'yellow-green': '#aac923',
    green: '#13862b',
    'blue-green': '#229a78',
    blue: '#3178b0',
    'blue-purple': '#79609b',
    purple: '#923683',
    'red-purple': '#b83057',
  }
  return color[str]
}

const radarChartCalculate = (data) => {
  let colorsData
  if (data && data.length > 0) {
    colorsData = data
    colorsData.map((el, i) => {
      el.total = el.datas.labels
        .map((a, k) => a)
        .reduce((prev, next) => prev + parseFloat(next.count), 0)
      el.progress = []

      el.datas.datasets[0].backgroundColor = 'rgba(255, 255, 255, 0.3)'
      el.datas.datasets[0].borderColor = 'transparent'
      el.datas.datasets[0].pointBackgroundColor = '#ffffff'
      el.datas.datasets[0].pointBorderColor = '#ffffff'
      el.datas.datasets[0].data = []

      el.datas.labels
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
            rightTitle: `${f.count}k Shares`,
            value: ((f.count / el.total) * 100).toFixed(0),
          })
        })

      el.datas.labels.map((sub, k) => {
        data[i].datas.labels[k].color = strToColor(sub.name)
        data[i].datas.labels[k].selected = !!el.progress.find(
          (selected, i) => selected.color === strToColor(sub.name)
        )
        data[i].datas.datasets[0].data.push(sub.count)
      })
    })
  }

  return colorsData
}

const getMaximumValueIndexFromArray = (data) =>
  Object.values(data).indexOf(Math.max(...Object.values(data)))

const compareSharesData = (payload) => {
  const isArray = Array.isArray(payload)
  const data = isArray ? payload : Object.keys(payload.data)

  return data.map((value) => {
    const brand = isArray ? Object.keys(value.data)[0] : value
    const item = isArray ? value.data[brand] : payload.data[brand]
    const keyName = Object.keys(item)[0]
    const labels = Object.entries(item[keyName])
    const type = (isArray ? item.platform : value) || keyName

    return {
      type: capitalizeFirstLetter(type),
      datas: {
        labels: labels.map((color) => {
          return {
            name: color[0]
              .split('-')
              .map((c) => capitalizeFirstLetter(c))
              .join('-'),
            count: color[1],
          }
        }),
        datasets: [
          {
            label: capitalizeFirstLetter(type),
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
        label: capitalizeFirstLetter(label),
        backgroundColor: chartColors[index],
        borderColor: chartColors[index],
        borderWidth: 1,
        data,
      }
    }
  )
  return {
    labels: !revert
      ? firstPayloadLabels.map((key) => capitalizeFirstLetter(key))
      : datasetLabels.map((label) => capitalizeFirstLetter(label)),
    datasets,
  }
}

const isDataSetEmpty = (data) => {
  if (!!data && !!data.datasets && !!data.datasets.length) {
    return data.datasets.every((dataset) =>
      !!dataset.data && !!dataset.data.length
        ? dataset.data.every((val) => val === 0 || val === undefined)
        : true
    )
  } else {
    return true
  }
}

const getDateBucketFromRange = (dateRange) => {
  switch (dateRange) {
    case 'week':
      return 'dayOfWeek'
    case 'month':
      return 'week'
    case '3months':
      return 'month'
    default:
      return 'none'
  }
}

/*
  Get api payload for brand_uuid and competitors
 */
const getBrandAndCompetitors = (profile) => {
  const { brand } = profile

  if (!!brand && !!brand.uuid && !!brand.competitors) {
    return [brand.uuid, ...brand.competitors.map((c) => c.uuid)]
  }

  return [brand.uuid]
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

const ucfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const normalize = (input, min, max, low_range, high_range) => {
  const range = max - min
  const norm = (input - min) / range

  const scale_range = high_range - low_range
  return norm * scale_range + low_range
}

const parseAverage = (payload) => {
  let calculateAverage = Object.keys(payload).reduce((acc, key) => {
    const keyName = key.substr(0, key.indexOf('.'))
    if (key.includes('LibraryAverage')) {
      acc[keyName] = { average: parseInt(payload[key]) }
    }
    if (key.includes('LibraryMax')) {
      acc[keyName] = { max: parseInt(payload[key]) }
    }
    return acc
  }, {})

  Object.keys(payload.video).forEach((item) => {
    let keyName = item.substr(0, item.indexOf('.'))
    if (item.includes('diffFromLibrary')) {
      calculateAverage[keyName] = {
        ...calculateAverage[keyName],
        diff: parseInt(payload.video[item]),
      }
    }
    if (item.includes('value')) {
      keyName = keyName.slice(0, keyName.length - 1)
      calculateAverage[keyName] = {
        ...calculateAverage[keyName],
        value: parseInt(payload.video[item]),
      }
    }
  })
  console.log(calculateAverage)
  return calculateAverage
}

const getFilteredCompetitors = (competitors, report) =>
  competitors.filter((uuid) => report.brands.indexOf(uuid) > -1)

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
const convertVideoEngagementData = (
  videoData,
  engagementData,
  metric = 'all'
) => {
  if (isEmpty(engagementData)) {
    return []
  }

  const formats = Object.keys(engagementData).reduce((fmts, metricKey) => {
    for (const fmtKey in engagementData[metricKey].format) {
      if (fmts.indexOf(fmtKey) === -1 && fmtKey !== 'None') {
        fmts.push(fmtKey)
      }
    }
    return fmts
  }, [])

  let metricKeys = Object.keys(engagementData)

  if (metric !== 'all') {
    metricKeys.filter((m) => `${m}s` === metric)
  }

  const dateBuckets = Object.keys(
    engagementData[metricKeys[0]].format[formats[0]]
  )

  return formats.map((fmt) => {
    // sum up all engagement data from /metric by format and datebucket
    const engagementCounts = metricKeys.reduce((counts, metric) => {
      const fmtData = engagementData[metric].format[fmt]
      Object.keys(fmtData).forEach((day, idx) => {
        counts[idx] = Math.abs(counts[idx]) || 0
        counts[idx] += fmtData[day]
        counts[idx] = counts[idx] == 0 ? 0 : -Math.abs(counts[idx])
      })
      return counts
    }, [])

    // get dateBucketed video counts by format
    const videoFormatData =
      videoData[
        fmt
          .toLowerCase()
          .split(' ')
          .join('')
      ]

    const videoCounts = dateBuckets.map((dateBucketKey) => {
      if (!!videoFormatData) {
        return videoFormatData[dateBucketKey] || 0
      }
      return 0
    })

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

export {
  ucfirst,
  normalize,
  randomKey,
  searchTermInText,
  socialIconSelector,
  toSlug,
  chartCombineDataset,
  shadeHexColor,
  capitalizeFirstLetter,
  radarChartCalculate,
  isDataSetEmpty,
  convertDataIntoDatasets,
  getMaximumValueIndexFromArray,
  compareSharesData,
  convertMultiRequestDataIntoDatasets,
  getDateBucketFromRange,
  getBrandAndCompetitors,
  getFilteredCompetitors,
  convertColorTempToDatasets,
  addComma,
  parseAverage,
  convertVideoEngagementData,
}
