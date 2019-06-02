import React from 'react'
import ColorTemperatureModule from 'Components/Modules/ColorTemperatureModule'

import style from './style.scss'

import { platforms } from './options'

class ColorTemperature extends React.Component {
  callBack = (data) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  render() {
    const {
      data: { data },
      selects,
    } = this.props

    const moduleName = 'BrandInsight/ColorTemperature'
    const selectKey = 'PCT-asd'
    const selectValue =
      selects.values[moduleName] &&
      selects.values[moduleName][selectKey].value &&
      selects.values[moduleName][selectKey].value.label
    return (
      <ColorTemperatureModule
        moduleClass={style.moduleContainer}
        extraClasses={style.colorChartContent}
        chartWrapperClass={style.colorTemperatureChartWrapper}
        borderLess
        verticalText
        infoLabels={['Views', 'Likes', 'Comment', 'Shares']}
        moduleKey={'BrandInsight/ColorTemperature'}
        data={data}
        title="Color Temperature / Sentiment Comparison"
        action={this.callBack.bind(this)}
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

export default ColorTemperature
