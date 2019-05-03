import React from 'react'
import { platforms } from './options'
import ColorTemperatureModule from 'Components/Modules/ColorTemperatureModule'
import style from './style.scss'

class BrandInsightsColorTemperature extends React.Component {

	render() {
		const {
			colorTempData,
			selectWarmColor,
			handleSelectFilters,
		} = this.props

		return (
			<ColorTemperatureModule
				moduleClass={style.moduleContainer}
				extraClasses={style.colorChartContent}
				chartWrapperClass={style.colorTemperatureChartWrapper}
				borderLess
				verticalText
				infoLabels={['Views', 'Likes', 'Comment', 'Shares']}
				moduleKey={'BrandInsight/ColorTemperature'}
				data={colorTempData}
				title="Color Temperature / Sentiment Comparison"
				action={handleSelectFilters}
				filters={[
					{
						type: 'colorTempature',
						selectKey: 'PCT-asd',
						placeHolder: 'Color Tempature',
					}
				]}
				platforms={platforms}
			/>
		)
	}
}

export default BrandInsightsColorTemperature
