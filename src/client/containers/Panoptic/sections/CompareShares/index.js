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
        data={data}
        moduleKey={'Panoptic/compareShares'}
        leftTitle="Facebook"
        rightTitle="YouTube"
        title="Dominant Color On Facebook and YouTube By Views"
        action={this.callBack}
        loading={loading}
        filters={[
          {
            type: 'dateRange',
            selectKey: 'PCS-wds',
            placeHolder: 'Date',
          },
        ]}
        infoText={`The two top graphs compare the dominant color within a video by engagement and platform for the past month. Each graph axis represents a color from the 12-hue color palette. Engagement increases from the center of the wheel to the outer edges via plotted points, showing a propensity range toward particular colors. The bar graphs below show the top three dominant colors for each platform.`}
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
