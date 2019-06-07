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
      data: {
        data: { data, platforms, labels },
        loading,
        error,
      },
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
        extraClasses={style.colorChartContent}
        chartWrapperClass={style.colorTemperatureChartWrapper}
        borderLess
        verticalText
        infoLabels={labels}
        moduleKey={moduleName}
        data={data}
        title="Color Temperature / Sentiment Comparison"
        action={this.callBack}
        selectValue={selectValue}
        filters={[
          {
            type: 'colorTemperature',
            selectKey: selectKey,
            placeHolder: 'Color Tempature',
          },
        ]}
        platforms={platforms}
        isEmpty={!loading && !data}
      />
    )
  }
}

export default ColorTemperature
