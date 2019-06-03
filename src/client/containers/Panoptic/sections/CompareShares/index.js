import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticCompareShares } from 'Reducers/panoptic'
//import classnames from 'classnames'
import RadarChartModule from 'Components/Modules/RadarChartModule'
//import style from './style.scss'

class CompareShares extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getCompareSharesData(data)
  }
  render() {
    const {
      compareSharesData: { data, loading, error },
    } = this.props
    return (
      <RadarChartModule
        data={data || []}
        moduleKey={'Panoptic/compareShares'}
        leftTitle="Facebook"
        rightTitle="YouTube"
        title="Dominant Color On Facebook and YouTube By Shares"
        action={this.callBack}
        filters={[
          {
            type: 'dateRange',
            selectKey: 'PCS-wds',
            placeHolder: 'Date',
          },
        ]}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  compareSharesData: makeSelectPanopticCompareShares(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(CompareShares)
