import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectReportsColorTempData,
} from 'Reducers/generatedReport'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'

import ColorTemperatureModule from 'Components/Modules/ColorTemperatureModule'

import style from './style.scss'

import { platforms } from './options'

class ColorTemperature extends React.Component {
  callBack = (data) => {
    const { getColorTempDataRequest, reportId } = this.props
    getColorTempDataRequest({ ...data, reportId })
  }

  render() {
    const {
      colorTempData: { data },
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

const mapStateToProps = createStructuredSelector({
  colorTempData: makeSelectReportsColorTempData(),
  selects: makeSelectSelectFilters(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ColorTemperature)
