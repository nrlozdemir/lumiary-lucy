function randomKey(char) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < char; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

function socialIconSelector(key) {
  if (!key) return
  const keyToLowerCase = key.toLowerCase()
  const socialIcons = {
    facebook: 'icon-Facebook-Bubble',
    twitter: 'icon-Twitter-Bubble',
    instagram: 'icon-Instagram-Bubble',
    youtube: 'icon-YouTube-Bubble',
    pinterest: 'icon-Pinterest-Bubble',
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
    'red-orange': '#dd501d',
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

export {
  randomKey,
  searchTermInText,
  socialIconSelector,
  toSlug,
  chartCombineDataset,
  shadeHexColor,
  capitalizeFirstLetter,
  radarChartCalculate,
}
