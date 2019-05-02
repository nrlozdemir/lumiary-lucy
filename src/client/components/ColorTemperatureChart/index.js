import React from 'react'
import cx from 'classnames'
import style from './style.scss'
import { ColorTemperature } from './ColorTemperature'

const ColorTemperatureChart = ({
	colorTempData,
	borderLess,
	verticalText,
	chartWrapperClass,
	context
}) => {
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
				<ColorTemperature temp={temp} verticalText={verticalText} />
				{temp.text && <div className={style.chartInfo}>{temp.text}</div>}
			</div>
		))
	)
}

export default ColorTemperatureChart
