import React from 'react'
import classnames from 'classnames'
import styles from './style.scss'

/*
Example Usage:
<PureBarChart
  data={[
    {"score": 25,	"label": "Sunday"},
    {"score": 48, "label": "Monday"},
    {"score": 36, "label": "Tuesday"},
    {"score": 54, "label": "Wednesday"},
    {"score": 88, "label": "Thursday"},
    {"score": 26, "label": "Friday"},
    {"score": 72, "label": "Saturday"}
  ]}
  selected="Sunday"
  difference={-20} />

Also take the following props: barsWrapperStyle, barStyle, barSelectedStyle, options{}
*/

const defaultProps = {
  barsWrapperStyle: styles.bars,
  barStyle: styles.barStyle,
  barSelectedStyle: styles.barSelectedStyle,
  selected: "Sunday",
  options: {
    width: 8,
    maxHeight: 36,
    labelCharLength: 1,
    zeroFill: 1
  }
}

export default class index extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      data,
      options,
      selected,
      barsWrapperStyle,
      barStyle,
      barSelectedStyle,
      difference
    } = this.props
    const zeroFill = parseInt(options.zeroFill)
    const aspectRatio = (options.maxHeight / 100).toFixed(2)

    return (
      <React.Fragment>
        <div className={barsWrapperStyle}>
          {data && data.map((element, index) => {
            const elementScore = (zeroFill > 0 && element.score === 0)
              ? (element.score + zeroFill)
              : element.score
            return <div
              key={index}
              data-label={element.label.substring(0, options.labelCharLength)}
              className={classnames(barStyle, {
                [barSelectedStyle]: (element.label === selected),
                [styles.increase]: (difference > 0),
                [styles.decrease]: (difference < 0),
                [styles.noChange]: (difference === 0)
              })}
              style={{height: Math.ceil(elementScore * aspectRatio), width: options.width}}>
            </div>
          })}
        </div>
      </React.Fragment>
    )
  }
}

 index.defaultProps = defaultProps
