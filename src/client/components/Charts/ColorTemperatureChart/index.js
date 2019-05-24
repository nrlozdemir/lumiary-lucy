import React from 'react'
import cx from 'classnames'
import style from './style.scss'
import ColorTemperature from './ColorTemperature'

const ColorTemperatureChart = ({
  colorTempData,
  borderLess,
  verticalText,
  chartWrapperClass,
  selectValue,
}) => {
  const colSpan =
    (!!colorTempData && !!colorTempData.length && 12 / colorTempData.length) ||
    1
  const arr = selectValue && selectValue.split('/')
  const chartWrapper = cx(
    chartWrapperClass,
    style.temperatureContentWrapper,
    `col-${colSpan}`,
    { [style.borderless]: borderLess }
  )
  console.log(arr)

  return (
    colorTempData &&
    colorTempData.map((temp, index) => (
      <div key={index} className={chartWrapper}>
        <ColorTemperature
          verticalText={verticalText}
          selectValue={selectValue}
          temp={{ ...temp, topText: arr && arr[0], bottomText: arr && arr[1] }}
        />
        {temp.text && <div className={style.chartInfo}>{temp.text}</div>}
      </div>
    ))
  )
}

export default ColorTemperatureChart
