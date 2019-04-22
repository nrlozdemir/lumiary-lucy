import React from 'react'
import classnames from 'classnames'

const PureBarChart = (props) => {
  const {bar, stat} = props.data
  const selected = props.selected
  const zeroFill = parseInt(bar.zeroFill)
  const barStyle = props.barStyle
  const barSelectedStyle = props.barSelectedStyle
  const aspectRatio = (bar.maxHeight / 100).toFixed(2)

  return (
    stat.map((element, index) => {
      const elementScore = (zeroFill > 0 && element.score === 0) ? (element.score + zeroFill) : element.score
      return <div
        key={index}
        data-label={element.label.substring(0, bar.labelCharLength)}
        className={classnames(barStyle, {
          [barSelectedStyle]: (element.label === selected)
        })}
        style={{height: Math.ceil(elementScore * aspectRatio), width: bar.width}}>
      </div>
    })
  )
}

export default PureBarChart
