import React from 'react'
import classnames from 'classnames'

const PureBarChart = (props) => {
  const {
		options,
		selected,
		data : { stat },
		barStyle,
		barSelectedStyle
	} = props

  const zeroFill = parseInt(options.zeroFill)
  const aspectRatio = (options.maxHeight / 100).toFixed(2)

  return (
    stat.map((element, index) => {
			const elementScore = (zeroFill > 0 && element.score === 0)
				? (element.score + zeroFill)
				: element.score
      return <div
        key={index}
        data-label={element.label.substring(0, options.labelCharLength)}
        className={classnames(barStyle, {
          [barSelectedStyle]: (element.label === selected)
        })}
        style={{height: Math.ceil(elementScore * aspectRatio), width: options.width}}>
      </div>
    })
  )
}

export default PureBarChart
