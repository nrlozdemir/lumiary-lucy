import React from 'react'
import cx from 'classnames'
import style from './style.scss'
import { ColorTemperature } from './ColorTemperature'

const ColorTemperatureChart = ({
  colorTempData,
  borderLess,
  verticalText,
  chartWrapperClass,
  noStaticTexts
}) => {

  const dataColors = [{
    "type": "video",
    "color": "#5292E5"
  }, {
    "type": "library",
    "color": "#2FD7C4"
  }, {
    "type": "industry",
    "color": "#8562F3"
  }, {
    "color": "#ffffff"
  }, {
    "color": "#21243B"
  }]

  const staticTexts = !!noStaticTexts && [{
    "text": "This is a blurb that will explain what this graph is showing",
    "topText": "Happy",
    "bottomText": "Sad",
    "leftText": "Cool",
    "rightText": "Warm"
  }, {
    "text": "This is a blurb that will explain what this graph is showing",
    "topText": "Energetic",
    "bottomText": "Calm",
    "leftText": "Cool",
    "rightText": "Warm"
  }, {
    "text": "This is a blurb that will explain what this graph is showing",
    "topText": "Natural",
    "bottomText": "Synthetic",
    "leftText": "Cool",
    "rightText": "Warm"
  }]

  const colSpan =
    (!!colorTempData && !!colorTempData.length && 12 / colorTempData.length) ||
    1

  const chartWrapper = cx(
    chartWrapperClass,
    style.temperatureContentWrapper,
    `col-${colSpan}`,
    { [style.borderless]: borderLess }
  )

  return (
    colorTempData &&
    colorTempData.map((temp, index) => (
      <div key={index} className={chartWrapper}>
        <ColorTemperature
          temp={{
            ...(!!noStaticTexts ? staticTexts[index] : {}),
            data: temp.data.map((item, index) => ({
              ...item,
              ...dataColors[index]
            }))
          }}
          verticalText={verticalText}
        />
        {!!noStaticTexts && staticTexts[index].text && <div className={style.chartInfo}>{staticTexts[index].text}</div>}
      </div>
    ))
  )
}

export default ColorTemperatureChart
