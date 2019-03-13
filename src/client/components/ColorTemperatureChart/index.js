import React from 'react'
import classnames from 'classnames'

import style from './style.scss'
import { ColorTemperature } from './ColorTemperature'

const ColorTemperatureChart = ({
  colorTempData,
  borderLess,
  verticalText,
  showDescription,
}) => {
  const wrapper = classnames(style.temperatureContentWrapper, {
    [style.borderless]: borderLess,
  })
  return (
    colorTempData &&
    colorTempData.map((temp, index) => (
      <div key={index} className={wrapper}>
        <ColorTemperature
          temp={temp}
          verticalText={verticalText}
          showDescription={showDescription}
        />
      </div>
    ))
  )
}

export default ColorTemperatureChart
