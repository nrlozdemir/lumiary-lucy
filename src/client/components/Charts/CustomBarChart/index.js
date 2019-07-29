import React from 'react'
import classnames from 'classnames'
import styles from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import ToolTip from 'Components/ToolTip'

/*
Example Usage:
<PureBarChart
  data={[
    {"score": 25, "label": "Sunday"},
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
  selected: 'Sunday',
  options: {
    width: 8,
    maxHeight: 36,
    minHeight: 5,
    labelCharLength: 1,
    zeroFill: 1,
  },
}

class CustomBarChart extends React.Component {
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
      difference,
      text,
      originalData = {},
      metric = '',
    } = this.props

    const zeroFill = parseInt(options.zeroFill)
    const statMax = Object.values(data).reduce((prev, next) => {
      return prev.score < next.score ? next : prev
    })
    const { duskBackground } = this.props.themeContext.colors

    return (
      <React.Fragment>
        <div className={barsWrapperStyle}>
          {data &&
            data.map((element, index) => {
              const elementScore =
                zeroFill > 0 && element.score === 0
                  ? element.score + zeroFill
                  : element.score
              const isSelected = element.label === selected
              let heightPx = Math.ceil(
                Math.abs((elementScore * (options.maxHeight - options.minHeight)) / statMax.score)
              )

              //if height is 0, we reassign 1 to height bcoz of ux experience.
              //empty area doesn't seem good.
              const height = options.minHeight + heightPx
              const ogData =
                originalData.originalData && originalData.originalData[index]
                  ? originalData.originalData[index].toLocaleString()
                  : 0
              const dayOfWeek = data[index] ? data[index].label || false : false
              const metricPlural =
                metric === ''
                  ? false
                  : metric === 1
                  ? `${metric}`
                  : `${metric}s`
              const dayText =
                ogData === false ||
                dayOfWeek === false ||
                metricPlural === false
                  ? ''
                  : `On ${dayOfWeek} there were ${ogData} ${metricPlural}`

              console.log(dayText, element.score, heightPx, height, isSelected)

              return (
                <React.Fragment key={index}>
                  <div
                    key={index}
                    data-label={element.label.substring(
                      0,
                      options.labelCharLength
                    )}
                    className={classnames(barStyle, {
                      [barSelectedStyle]: isSelected,
                      [styles.increase]: difference > 0,
                      [styles.decrease]: difference < 0,
                      [styles.noChange]: difference === 0,
                    })}
                    style={{
                      height: (height !== Infinity && `${height}`) || '100%',
                      width: options.width,
                      background: duskBackground,
                    }}
                    data-tip={dayText}
                    data-for={`panoptic-flipcards-day-${index}`}
                  />
                  <ToolTip
                    key={`panoptic-flipcards-day-${index}`}
                    effect="solid"
                    smallTooltip
                    id={`panoptic-flipcards-day-${index}`}
                  />
                </React.Fragment>
              )
            })}
        </div>
      </React.Fragment>
    )
  }
}

CustomBarChart.defaultProps = defaultProps

export default withTheme(CustomBarChart)
