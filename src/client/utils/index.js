import { defaultFilters } from 'Reducers/selectFilters'

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

const splitCamelCaseToString = (s) => ucfirst(s.split(/(?=[A-Z])/).join(' '))

function socialIconSelector(key, isSquare) {
  if (!key) return
  const keyToLowerCase = key.toLowerCase()
  const socialIcons = {
    facebook: !isSquare ? 'icon-Facebook-Bubble' : 'icon-facebook-square',
    twitter: !isSquare ? 'icon-Twitter-Bubble' : 'icon-twitter-square',
    instagram: !isSquare ? 'icon-Instagram-Bubble' : 'icon-instagram-square',
    youtube: !isSquare ? 'icon-YouTube-Bubble' : 'icon-youtube-square',
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

const metricSuffix = (number) => {
  number = parseInt(number)
  if (number >= 1e3) {
    const unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3
    const unitname = ['k', 'm', 'B', 'T'][Math.floor(unit / 3) - 1]
    return (number / ('1e' + unit)).toFixed(1) + unitname
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

const getMaximumValueIndexFromArray = (data) =>
  Object.values(data).indexOf(Math.max(...Object.values(data)))

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

const getBrandNameAndCompetitorsName = (profile) => {
  const { brand } = profile

  if (!!brand && !!brand.name && !!brand.competitors) {
    return [brand.name, ...brand.competitors.map((c) => c.name)]
  }

  return [brand.name]
}

const ucfirst = (string = '') => {
  return !!string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

const normalize = (input, min, max, low_range, high_range) => {
  const range = max - min
  const norm = (input - min) / range

  const scale_range = high_range - low_range
  return norm * scale_range + low_range
}

const getFilteredCompetitors = (competitors, report) =>
  competitors.filter((uuid) => report.brands.indexOf(uuid) > -1)

const getFilteredCompetitorValues = (competitors, data) => {
  const filteredCompetitors = competitors.filter(
    (name) => Object.keys(data).indexOf(name) > -1
  )
  return filteredCompetitors.reduce((obj, name) => {
    obj[name] = data[name]
    return obj
  }, {})
}

const floatCvScore = (val) => Number.parseFloat(val).toFixed(1)

/*
 reduce selectFilter values
 into { type: value } map which is easily read by azazzle
*/
const selectFiltersToType = (selectValues = {}) => {
  return Object.keys(selectValues).reduce((values, key) => {
    const filterValue = selectValues[key]
    const filterType = filterValue.type

    if (
      filterType === 'platformEngagement' ||
      filterType === 'propertyEngagement'
    ) {
      const whichValueKey =
        filterType === 'platformEngagement' ? 'platform' : 'property'
      values[whichValueKey] = !!filterValue.value
        ? filterValue.value.value.split('|')[0]
        : defaultFilters[filterType].split('|')[0]
      values.metric = !!filterValue.value
        ? filterValue.value.value.split('|')[1]
        : defaultFilters[filterType].split('|')[1]
      return values
    }

    values[filterType] = !!filterValue.value
      ? !!filterValue.value.value && !!filterValue.value.value.startDate
        ? [filterValue.value.value.startDate, filterValue.value.value.endDate]
        : filterValue.value.value
      : defaultFilters[filterType]

    return values
  }, {})
}

export const getCvScoreColor = (val = 0) => {
  switch (true) {
    case val > 50 && val < 75:
      return '#8562f3'
    case val > 75 && val < 100:
      return '#2fd7c4'
    default:
      return '#5292e5'
  }
}

const getLocationParams = (value) => {
  const urlSplit = value.replace('?', '').split('&')

  return urlSplit.reduce((obj, val) => {
    const keyAndValue = val.split('=')
    obj[keyAndValue[0]] = keyAndValue[1]
    return obj
  }, {})
}

//can sort and get the top n values of flat array of objects
const getNValuesOfObject = ({ obj = {}, n, sortOrder = '' }) => {
  const keys = Object.keys(obj)
  if (!keys.length) {
    return obj
  }
  let newObj = {}
  let newArr = keys.map((i) => ({ key: i, value: obj[i] }))

  if (sortOrder) {
    let sortCallBack = null

    switch (sortOrder) {
      case 'asc':
        sortCallBack = (a, b) => a[1] - b[1]
        break
      case 'desc':
        sortCallBack = (a, b) => b[1] - a[1]
        break
      default:
        sortCallBack = null
    }

    if (sortCallBack) {
      const sortable = []
      for (const key in obj) {
        sortable.push([key, obj[key]])
      }
      sortable.sort(sortCallBack)
      newArr = sortable.map((item) => {
        return { key: item[0], value: item[1] }
      })
    }
  }
  if (!!n && n > 0 && n < newArr.length) {
    newArr = newArr.slice(0, n)
  }
  newArr.forEach((item) => {
    newObj = { ...newObj, [item.key]: item.value }
  })
  return newObj
}

const valuesIsEqual = (num, equal) => num.every((o) => o === equal)

const normalizationBubbleMapping = (arr, tMin, tMax) => {
  if (!arr.length || !tMin || !tMax) return {}
  const numbers = arr.map((a) => a.value)

  if (valuesIsEqual(numbers, 0) || (!numbers && !numbers.length)) return {}
  const allNumberSame = valuesIsEqual(numbers, numbers[0])
  const [min, max] = [Math.min(...numbers), Math.max(...numbers)]
  const [rMin, rMax] = [
    allNumberSame ? 1 : !min ? 1 : min,
    allNumberSame ? numbers[0] : max,
  ]

  return numbers.map((m, i) => {
    const value = (((!m ? 1 : m) - rMin) / (rMax - rMin)) * (tMax - tMin) + tMin
    return {
      name: arr[i].name,
      color: arr[i].color,
      value: value === tMin ? (tMin * 6) / 8 : value,
      oldValue: arr[i].value,
    }
  })
}

/*
  Convert seconds to hh:mm:ss
  hh, wont show if not available, mm always shows
 */
const secondsToHHMMSS = (s = 0) => {
  if (!!s) {
    const date = new Date(s * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getSeconds()

    return `${!!hh ? `${hh < 10 ? '0' : ''}${hh}:` : ''}${
      mm < 10 ? '0' : ''
    }${mm}:${ss < 10 ? '0' : ''}${ss}`
  } else {
    return '00:00:00'
  }
}

export {
  randomKey,
  socialIconSelector,
  toSlug,
  searchTermInText,
  shadeHexColor,
  metricSuffix,
  strToColor,
  getMaximumValueIndexFromArray,
  ucfirst,
  normalize,
  floatCvScore,
  selectFiltersToType,
  getTimeBucket,
  getLabelWithSuffix,
  getDateBucketFromRange,
  getBrandAndCompetitors,
  getBrandNameAndCompetitorsName,
  getFilteredCompetitors,
  getFilteredCompetitorValues,
  getLocationParams,
  splitCamelCaseToString,
  getNValuesOfObject,
  normalizationBubbleMapping,
  secondsToHHMMSS,
}
