import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectReportsColorComparison } from 'Reducers/reports'

import classnames from 'classnames'
import style from './style.scss'

import RadarChartModule from 'Components/Modules/RadarChartModule'

class ColorComparison extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getColorComparisonData(data)
  }
  render() {
    const {
      colorComparisonData: { data, loading, error },
    } = this.props
    return (
      <RadarChartModule
        leftTitle={data && data.length > 0 && data[0].type}
        rightTitle={data && data.length > 0 && data[1].type}
        data={data}
        moduleKey={'Reports/ColorComparison'}
        title="Video Library Color Comparison"
        action={this.callBack}
        filters={[
          {
            type: 'timeRange',
            selectKey: 'RVC-swda',
            placeHolder: 'Date',
          },
        ]}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  colorComparisonData: makeSelectReportsColorComparison(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ColorComparison)
