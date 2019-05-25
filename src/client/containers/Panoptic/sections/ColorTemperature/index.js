import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticColorTemperature } from 'Reducers/panoptic'
import { platforms } from './options'
import ColorTemperatureModule from 'Components/Modules/ColorTemperatureModule'
import style from './style.scss'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'

class PanopticColorTemperature extends React.Component {
  callBack = (data) => {
    this.props.getColorTemperatureData(data)
  }

  render() {
    const {
      colorTemperatureData: { data, loading, error },
    } = this.props
    const moduleName = 'Panoptic/ColorTemperature'
    const selectKey = 'PCT-asd'
    const selectValue =
      this.props.selects.values[moduleName] &&
      this.props.selects.values[moduleName][selectKey].value &&
      this.props.selects.values[moduleName][selectKey].value.label
    return (
      <ColorTemperatureModule
        extraClasses={style.colorChartContent}
        chartWrapperClass={style.colorTemperatureChartWrapper}
        borderLess
        verticalText
        infoLabels={['Views', 'Likes', 'Comment', 'Shares']}
        moduleKey={moduleName}
        data={data}
        title="Color Temperature / Sentiment Comparison"
        action={this.callBack}
        selectValue={selectValue}
        filters={[
          {
            type: 'colorTempature',
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
