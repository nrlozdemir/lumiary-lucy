import React from 'react'
import PropTypes from 'prop-types'

import Module from 'Components/Module'
import ColorTemperatureChart from 'Components/ColorTemperatureChart'

import cx from 'classnames'
import style from './styles.scss'

const ColorTemperatureModule = ({
	data,
	moduleKey,
	title,
	action,
	filters,
	legend,
	labels,
	borderLess,
	verticalText,
	infoLabels,
	children,
	extraClasses,
	chartWrapperClass,
}) => {
	console.log(data)
	return (
		<Module
			moduleKey={moduleKey}
			title={title}
			action={action}
			legend={legend}
			filters={filters}
		>
			<div className={style.colorChartContainer}>
				<div
					className={cx(extraClasses, style.colorChartContent)}
				>
					{!!data && !!data.length && (
						<ColorTemperatureChart
							chartWrapperClass={chartWrapperClass}
							infoLabels={infoLabels}
							colorTempData={data}
							borderLess={borderLess}
							verticalText={verticalText}
						/>
					)}
				</div>
				{!!infoLabels && !!infoLabels.length && (
					<div className={style.infoWrapperContainer}>
						{infoLabels.map((info, idx) => (
							<div
								className={style.infoWrapper}
								key={`colorChart-infoText_${idx}`}
							>
								<div className={style.infoHandle}>
									<span className={style.infoText}>{info}</span>
								</div>
							</div>
						))}
					</div>
				)}
				{children}
			</div>
		</Module>
	)
}

ColorTemperatureModule.defaultProps = {
	data: [],
	infoLabels: [],
	borderLess: false,
	verticalText: false,
}

ColorTemperatureModule.propTypes = {
	data: PropTypes.any.isRequired,
	moduleKey: PropTypes.string.isRequired,
	title: PropTypes.string,
	subTitle: PropTypes.string,
	legend: PropTypes.object,
	filters: PropTypes.array,
	borderLess: PropTypes.bool,
	verticalText: PropTypes.bool,
	infoLabels: PropTypes.array,
	wrapperClasses: PropTypes.string,
}

export default ColorTemperatureModule
