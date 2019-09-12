import React from 'react'

const replaceBoldElement = (text) => {
  const regex = new RegExp(/<b>(.*?)<\/b>/g)

  if (!regex.test(text)) {
    return text
  }

  const matched = text.match(regex)

  const values = matched.map((val) => val.replace(/<\/?b>/g, ''))
  if (!values.length) {
    return text
  }

  return (
    <React.Fragment>
      {text.split(regex).reduce((prev, current, i) => {
        if (!i) {
          return [current]
        }
        return prev.concat(
          values.includes(current) ? (
            <strong key={i + current}>{current}</strong>
          ) : (
            current
          )
        )
      }, [])}
    </React.Fragment>
  )
}
const replaceBoldString = (str) => {
  return str.replace(
    /(\d+\%)|(\d+\.\d+\%)|Fast|Medium|Slowest|Slow|0-15s|16-30s|31-60s|61+|Live Action|Cinemagraph|Stop Motion|Animation/gi,
    function(x) {
      return '<b>' + x + '</b>'
    }
  )
}

const textEdit = (text, item) => {
  text = item.value && text.replace('{value}', item.value)
  text = item.title && text.replace('{title}', item.title)
  text = item.percentage && text.replace('{percentage}', item.percentage)
  text = replaceBoldElement(text)
  return text
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export { textEdit, replaceBoldString, capitalize }
