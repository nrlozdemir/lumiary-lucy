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

export {
  randomKey,
  searchTermInText,
  socialIconSelector,
  toSlug,
  chartCombineDataset,
  shadeHexColor,
  capitalizeFirstLetter,
}
