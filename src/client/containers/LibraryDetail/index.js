import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'

import { actions, makeSelectLibraryDetail } from 'Reducers/libraryDetail'
import { actions as libraryActions, makeSelectLibrary } from 'Reducers/library'

import LibraryDetailChartHeader from './sections/LibraryDetailChartHeader'
import LibraryDetailDoughnutChart from './sections/LibraryDetailDoughnutChart'
// import LibraryDetailColorTemperature from './sections/LibraryDetailColorTemperature'
import LibraryDetailShotByShot from './sections/LibraryDetailShotByShot'
import { userUuid, mediaUrl } from 'Utils/globals'
import { withTheme } from 'ThemeContext/withTheme'

/* eslint-disable react/prefer-stateless-function */
export class LibraryDetail extends React.Component {
  constructor(props) {
    super(props)
    this.slide = React.createRef()
    this.state = {
      sliderVal: 0,
      maxValue: 1000,
    }
  }

  componentDidMount() {
    const {
      match,
      getDoughnutChartRequest,
      // getColorTempRequest,
      getShotByShotRequest,
      getSelectedVideo,
      getSelectedVideoAverage,
      themeContext: { colors },
    } = this.props

    if (match.params.videoId) {
      getSelectedVideo({ brandUuid: userUuid, videoId: match.params.videoId })
      getSelectedVideoAverage(match.params.videoId)
      getDoughnutChartRequest({
        LibraryDetailId: match.params.videoId,
        themeColors: colors,
      })
      // getColorTempRequest(match.params.videoId)
      getShotByShotRequest(match.params.videoId)
    }
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps
    const {
      match,
      getDoughnutChartRequest,
      // getColorTempRequest,
      getShotByShotRequest,
      themeContext: { colors },
    } = this.props
    if (
      prevMatch.params.videoId !== match.params.videoId ||
      prevProps.themeContext.colors.ageSliderBorder !== colors.ageSliderBorder
    ) {
      getDoughnutChartRequest({
        LibraryDetailId: match.params.videoId,
        themeColors: colors,
      })
    }
    if (prevMatch.params.videoId !== match.params.videoId) {
      getSelectedVideo({ brandUuid: userUuid, videoId: match.params.videoId })
      getSelectedVideoAverage(match.params.videoId)
      // getColorTempRequest({ videoId: match.params.videoId })
      getShotByShotRequest(match.params.videoId)
    }
  }

  getVideoRef = (v) => {
    this.video = v.current
  }

  render() {
    const {
      libraryDetail: {
        shotByShotData: { data: shotByShotData, loading: shotByShotLoading },
        selectedVideo,
        selectedVideoAverage,
      },
      match: {
        params: { videoId },
      },
    } = this.props

    return (
      <React.Fragment>
        <LibraryDetailChartHeader
          selectedVideoAverage={selectedVideoAverage}
          videoUrl={`${mediaUrl}/lumiere/${userUuid}/${videoId}.mp4`}
          title={selectedVideo && selectedVideo.title}
          socialIcon={selectedVideo && selectedVideo.socialIcon}
          cvScore={selectedVideo && selectedVideo['cvScores.value']}
          getVideoRef={this.getVideoRef}
        />
        <LibraryDetailDoughnutChart
          videoId={videoId}
          videoDuration={this.video && this.video.duration}
        />
        <LibraryDetailShotByShot
          shots={
            (!!shotByShotData &&
              !!shotByShotData.video &&
              shotByShotData.video.shots) ||
            []
          }
          loading={shotByShotLoading}
        />
      </React.Fragment>
    )
  }
}

LibraryDetail.propTypes = {
  barChartData: PropTypes.object,
  doughnutLineChartData: PropTypes.object,
  // colorTempData: PropTypes.object,
  getBarChartRequest: PropTypes.func,
  getDoughnutChartRequest: PropTypes.func,
  // getColorTempRequest: PropTypes.func,
  getShotByShotRequest: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  libraryDetail: makeSelectLibraryDetail(),
  library: makeSelectLibrary(),
})

function mapDispatchToProps(dispatch) {
  return {
    getSelectedVideo: (id) => dispatch(actions.getSelectedVideoRequest(id)),
    getSelectedVideoAverage: (id) =>
      dispatch(actions.getSelectedVideoAverageRequest(id)),
    getVideos: () => dispatch(libraryActions.loadVideos()),
    getDoughnutChartRequest: (id) =>
      dispatch(actions.getDoughnutChartRequest(id)),
    // getColorTempRequest: (id) => dispatch(actions.getColorTempRequest(id)),
    getShotByShotRequest: (id) => dispatch(actions.getShotByShotRequest(id)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  reduxForm({
    form: 'libraryDetail',
  }),
  withConnect,
  withTheme
)(LibraryDetail)
