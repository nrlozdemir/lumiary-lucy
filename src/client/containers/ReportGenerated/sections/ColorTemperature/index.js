import React from 'react'
import { platforms } from './options'
import ColorTemperatureModule from 'Components/Modules/ColorTemperatureModule'
import style from './style.scss'

class BrandInsightsColorTemperature extends React.Component {
  render() {
    const { colorTempData, selectWarmColor, handleSelectFilters } = this.props
    const moduleName = 'BrandInsight/ColorTemperature'
    const selectKey = 'PCT-asd'
    const selectValue =
      this.props.selects.values[moduleName] &&
      this.props.selects.values[moduleName][selectKey].value &&
      this.props.selects.values[moduleName][selectKey].value.label
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
          },
        ]}
        platforms={platforms}
        selectValue={selectValue}
      />
    )
  }
}

export default BrandInsightsColorTemperature
