import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticVideoReleases } from 'Reducers/panoptic'
import { chartCombineDataset } from 'Utils'

import VideoReleasesBarChartModule from 'Components/Modules/VideoReleasesBarChartModule'
import { videoReleasesData_DatasetOptions } from './options'

class VideoReleasesBarChart extends Component {
  callBack = (data, moduleKey) => {
    this.props.getVideoReleasesData(data)
  }

  render() {
    const {
      videoReleasesData: { data, loading, error }
    } = this.props

    const combineData = {
      "labels": [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
      ],
      "datasets": data
    };

    return (
      <VideoReleasesBarChartModule
        data={chartCombineDataset(combineData, videoReleasesData_DatasetOptions)}
        moduleKey={'Panoptic/VideoReleasesBarChartModule'}
        title="Video Releases vs Engagement"
        action={this.callBack}
        filters={[
          {
            type: 'platform',
            selectKey: 'PVR-asd',
            placeHolder: 'Platform',
          },
          {
            type: 'dateRange',
            selectKey: 'PVR-wds',
            placeHolder: 'Date',
          }]}
        legend={[
          { label: 'Videos', color: 'cool-blue' },
          { label: 'Engagement', color: 'coral-pink' },
        ]}
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
