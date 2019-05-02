import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './styles.scss'
import Slider, { createSliderWithTooltip } from 'rc-slider';

const RangeSlider = createSliderWithTooltip(Slider.Range)

const defaultHandleStyle = [
  {
    width: '32px',
    height: '32px',
    marginTop: '-8px',
    borderColor: '#fff',
  },
  {
    width: '32px',
    height: '32px',
    marginTop: '-8px',
    borderColor: '#fff',
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
  backgroundColor: '#21243B',
}

class RangeWithBadge extends Component {
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
			tipProps,
			handleLabel,
      customClass,
    } = this.props

    const { value } = this.state

    return (
      <div className="range-slider">
        <RangeSlider
					overlayClassName='customOverlay'
					overlayStyle='font-size:15px'
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
					tipProps={tipProps}
					handleLabel={handleLabel}
          marks={marks}
        />
      </div>
    )
  }
}

export default RangeWithBadge
