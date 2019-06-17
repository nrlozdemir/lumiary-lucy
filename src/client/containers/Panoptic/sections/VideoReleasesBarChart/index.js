import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticVideoReleases } from 'Reducers/panoptic'
import { isDataSetEmpty } from 'Utils'

import VideoReleasesBarChartModule from 'Components/Modules/VideoReleasesBarChartModule'

class VideoReleasesBarChart extends Component {
  callBack = (data, moduleKey) => {
    this.props.getVideoReleasesData(data)
  }

  shouldComponentUpdate(nextProps) {
    const {
      videoReleasesData: { loading: nextLoading },
    } = nextProps

    const {
      videoReleasesData: { loading },
    } = this.props

    return !nextLoading & !!loading
  }

  render() {
    const {
      videoReleasesData: { data, loading, error },
    } = this.props

    const isEmpty =
      !loading &&
      (!data ||
        (!!data &&
          (!data.length ||
            (!!data.length &&
              data.every((dataset) => isDataSetEmpty(dataset))))))

    return (
      <VideoReleasesBarChartModule
        data={data}
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
