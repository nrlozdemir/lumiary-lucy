import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticVideoReleases } from 'Reducers/panoptic'
import { chartCombineDataset, isDataSetEmpty } from 'Utils'

import VideoReleasesBarChartModule from 'Components/Modules/VideoReleasesBarChartModule'
import { videoReleasesData_DatasetOptions } from './options'

class VideoReleasesBarChart extends Component {
  callBack = (data, moduleKey) => {
    this.props.getVideoReleasesData(data)
  }

  render() {
    const {
      videoReleasesData: { data, loading, error },
    } = this.props

    const combineData = {
      labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      label: 'Live Action',
      datasets: data,
    }

    const combinedData = [
      chartCombineDataset(combineData, videoReleasesData_DatasetOptions),
    ]

    console.log(combinedData)

    const isEmpty =
      !loading &&
      (!combinedData ||
        (!!combinedData &&
          (!combinedData.length ||
            (!!combinedData.length &&
              combinedData.every((dataset) => isDataSetEmpty(dataset))))))

    return (
      <VideoReleasesBarChartModule
        data={combinedData}
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
          },
        ]}
        legend={[
          { label: 'Videos', color: 'cool-blue' },
          { label: 'Engagement', color: 'coral-pink' },
        ]}
        isEmpty={isEmpty}
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
