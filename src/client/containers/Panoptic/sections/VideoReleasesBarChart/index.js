import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticVideoReleases } from 'Reducers/panoptic'

import ModuleVideoReleasesBarChart from 'Components/Modules/VideoReleasesBarChart'

class VideoReleasesBarChart extends Component {
  callBack = (data, moduleKey) => {
    this.props.getVideoReleasesData(data)
  }

  render() {
    const {
      videoReleasesData: { data, loading, error }
    } = this.props

    return (
      <ModuleVideoReleasesBarChart
        data={data}
        moduleKey={'Panoptic/VideoReleasesBarChart'}
        title="Video Releases vs Engagement"
        action={this.callBack}
        filters={[{
          type: 'engagement',
          selectKey: 'PVR-sad',
          placeHolder: 'Engagement',
        },
        {
          type: 'platform',
          selectKey: 'PVR-asd',
          placeHolder: 'Platform',
        },
        {
          type: 'timeRange',
          selectKey: 'PVR-wds',
          placeHolder: 'Date',
        }]}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  videoReleasesData: makeSelectPanopticVideoReleases(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(VideoReleasesBarChart)
