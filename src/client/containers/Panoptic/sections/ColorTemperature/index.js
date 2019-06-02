import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticColorTemperature } from 'Reducers/panoptic'
import ColorTemperatureModule from 'Components/Modules/ColorTemperatureModule'
import style from './style.scss'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'

class PanopticColorTemperature extends React.Component {
  callBack = (data) => {
    const { getColorTemperatureData } = this.props
    getColorTemperatureData(data)
  }

  render() {
    const {
      colorTemperatureData: {
        data: { data, platforms, labels },
        loading,
        error,
      },
    } = this.props

    const moduleName = 'Panoptic/ColorTemperature'
    const selectKey = 'PCT-asd'
    const selectValue =
      this.props.selects.values[moduleName] &&
      this.props.selects.values[moduleName][selectKey].value &&
      this.props.selects.values[moduleName][selectKey].value.label

    console.log(data)

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
          {
            type: 'dateRange',
            selectKey: 'PCT-wds',
            placeHolder: 'Date',
          },
        ]}
        platforms={platforms}
        isEmpty={!data.length}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  colorTemperatureData: makeSelectPanopticColorTemperature(),
  selects: makeSelectSelectFilters(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(PanopticColorTemperature)
