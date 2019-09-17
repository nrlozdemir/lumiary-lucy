import React from 'react'
import RangeWithBadge from 'Components/Form/RangeWithBadge'
import classnames from 'classnames'

const RangeWithBadgeComponent = ({
  themeType,
  handleStyle,
  trackStyle,
  railStyle,
  dotStyle,
  parentCallback,
}) => {
  return (
    <RangeWithBadge
      customClass={classnames('customRangeSlider', {
        dark: themeType === 'dark',
        light: themeType === 'light',
      })}
      minValue={0}
      maxValue={100}
      input={{ onChange: (val) => parentCallback(val) }}
      handleStyle={handleStyle}
      trackStyle={trackStyle}
      railStyle={railStyle}
      min={0}
      max={100}
      tipProps={{
        visible: true,
        overlayClassName: classnames('customTooltip', {
          dark: themeType === 'dark',
          light: themeType === 'light',
        }),
        overlayStyle: {
          background: 'none',
          border: 'none',
          boxShadow: 'none',
        },
        arrowContent: '',
      }}
      dotStyle={dotStyle}
      step={1}
      dots={true}
    />
  )
}

export { RangeWithBadgeComponent }
