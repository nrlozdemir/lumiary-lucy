import React from 'react'
import PropTypes from 'prop-types'

import Module from 'Components/Module'
import { ColorTemperature as Chart } from 'Components/ColorTemperatureChart/ColorTemperature'

import style from './styles.scss'

const ColorTemperatureModule = ({
	data,
	moduleKey,
	title,
	action,
	filters,
	legend,
}) => {
	return (
		<Module
			moduleKey={moduleKey}
			title={title}
			action={action}
			legend={legend}
			filters={filters}
		>
			<div className={style.audienceContainer}>
				<div className="col-12" style={{ display: 'flex', padding: '40px 0' }}>
					{data &&
						data.length > 0 &&
						data.map((temp, index) => (
							<div
								className={classnames('col-4', style.chartWrapper)}
								key={'temp-chart-' + index}
							>
								<Chart temp={temp} />
								<div className={style.chartInfo}>{temp.text}</div>
							</div>
						))}
				</div>
			</div>
		</Module>
	)
}

ColorTemperatureModule.propTypes = {
	data: PropTypes.any.isRequired,
	moduleKey: PropTypes.string.isRequired,
	title: PropTypes.string,
	subTitle: PropTypes.string,
	legend: PropTypes.object,
	filters: PropTypes.array,
}

export default ColorTemperatureModule
