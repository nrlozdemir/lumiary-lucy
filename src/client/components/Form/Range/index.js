import React, { Component } from 'react'
//import classnames from 'classnames'
//import style from './styles.scss'
import Slider from 'rc-slider'
import { withTheme } from 'ThemeContext/withTheme'

const RangeSlider = Slider.Range

class Range extends Component {
  constructor(props) {
    super(props)
    const { minValue, maxValue } = this.props
    this.state = {
      value: [minValue, maxValue],
    }
  }

  onSliderChange(value) {
    const {
      input: { onChange = () => {} },
    } = this.props

    this.setState({
      value,
    })

    onChange(value)
  }

  render() {
    const { value } = this.state
    const {
      themeContext: { colors },
    } = this.props
    const defaultHandleStyle = [
      {
        width: '32px',
        height: '32px',
        marginTop: '-8px',
        backgroundColor: colors.rangeSliderTick,
        borderColor: colors.rangeSliderTick,
      },
      {
        width: '32px',
        height: '32px',
        marginTop: '-8px',
        borderColor: colors.rangeSliderTick,
        backgroundColor: colors.rangeSliderTick,
      },
    ]

    const defaultTrackStyle = [
      {
        height: '16px',
        backgroundColor: '#2FD7C4',
      },
    ]

    const defaultRailStyle = {
      height: '16px',
      borderRadius: '8px',
      backgroundColor: colors.trackColor,
    }
    const {
      className,
      input: { onChange },
      minValue,
      maxValue,
      handleStyle = defaultHandleStyle,
      trackStyle = defaultTrackStyle,
      railStyle = defaultRailStyle,
      dotStyle,
      customTicksUnvisible,
      min,
      max,
      step,
      dots,
      marks,
      customClass,
    } = this.props
    return (
      <div className="range-slider">
        <RangeSlider
          className={customClass}
          allowCross={false}
          value={value}
          defaultValue={value}
          handleStyle={handleStyle}
          trackStyle={trackStyle}
          railStyle={railStyle}
          dotStyle={dotStyle}
          onChange={this.onSliderChange.bind(this)}
          min={min}
          max={max}
          step={step}
          dots={dots}
          marks={marks}
          colors={colors}
        />
        {customTicksUnvisible ? null : (
          <div
            className="d-flex align-items-center justify-space-between mt-24 ticks"
            style={{ color: colors.textColor }}
          >
            <span>0-15s</span>
            <span>15-30s</span>
            <span>30-60s</span>
            <span>60s+</span>
          </div>
        )}
      </div>
    )
  }
}

export default withTheme(Range)
