import { chartColors, expectedNames } from 'Utils/globals'
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
    preparedDatasets: array,
    preparedLabels: array,
    singleDataset: bool,
    borderWidth: object || int
    }
  *
 */

const convertDataIntoDatasets = (values, options, ...args) => {
  let labels
  let datasetsFromValues
  let singleLevelJSON
  let customKey = false
  let getValueinObject

  const arg = args && !!args[0] && args[0]
  const brands = Object.keys(values.data)
  const brandObjects = brands.map((b) => values.data[b])
  getValueinObject = brandObjects[0][options.property[0]]

  const timeBucket =
    options.dateBucket !== 'none' ? getTimeBucket(getValueinObject) : null

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
    labels = Object.keys(getValueinObject)
  }

  // if timebucket or proportionOf werent selected, it will get data from single level json
  if (!timeBucket && !options.proportionOf) {
    datasetsFromValues = Object.keys(getValueinObject).map(
      (key) => getValueinObject[key]
    )
    labels = Object.keys(getValueinObject)
    singleLevelJSON = true
  }
  console.log(brands)
  if (brands.length > 1) {
    datasetsFromValues = brandObjects.map((brand, idx) =>
      Object.keys(brand[Object.keys(brand)[0]]).map(
        (key) => brandObjects[idx][Object.keys(brand)[0]][key]
      )
    )
    singleLevelJSON = false
    getValueinObject = brands
  }
  console.log(datasetsFromValues)
  // Object.keys(
  // 	brandObjects[0][Object.keys(brandObjects[0])]
  // ).map((value) => brandObjects.map((brand) => brand.duration[value]))
  // You can pass prepared labels or datasets in args
  labels = (arg && arg.preparedLabel) || labels
  datasetsFromValues = (arg && arg.preparedDatasets) || datasetsFromValues
  return Object.keys(getValueinObject).reduce(
    (data, key, idx) => {
      const { datasets } = data
      const color = chartColors[idx]
      return arg && arg.singleDataset
        ? {
            labels: [
              ...data.labels,
              `${key}${
                !!options.property && options.property == 'duration'
                  ? ' seconds'
                  : options.property == 'frameRate'
                  ? 'fps'
                  : ''
              }`,
            ],
            datasets: [
              {
                label: expectedNames[options.property],
                data: datasetsFromValues || [0, 0, 0, 0],
                backgroundColor: arg.backgroundColor || [
                  ...(datasets[0] ? datasets[0].backgroundColor : []),
                  color,
                ],
                hoverBackgroundColor:
                  arg && arg.hoverBG
                    ? [
                        ...(datasets[0]
                          ? datasets[0].hoverBackgroundColor
                          : []),
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
                label: customKey ? labels[idx] : key,
                backgroundColor: color,
                borderColor: color,
                borderWidth: (arg && arg.borderWidth) || 1,
                hoverBackgroundColor: arg && arg.hoverBG ? color : null,
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
const compareSharesData = (data) => {
  return data.map((item) => {
    return {
      type: capitalizeFirstLetter(item.platform),
      datas: {
        labels: Object.keys(item.data.color).map((color) => ({
          name: color
            .split('-')
            .map((c) => capitalizeFirstLetter(c))
            .join('-'),
          count: item.data.color[color],
        })),
        datasets: [
          {
            label: capitalizeFirstLetter(item.platform),
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

export {
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
}
