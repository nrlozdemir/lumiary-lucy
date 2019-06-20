import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { reduxForm } from 'redux-form'

import { actions, makeSelectLibraryDetail } from 'Reducers/libraryDetail'
import { actions as libraryActions, makeSelectLibrary } from 'Reducers/library'

import LibraryDetailChartHeader from './sections/LibraryDetailChartHeader'
import LibraryDetailDoughnutChart from './sections/LibraryDetailDoughnutChart'
import LibraryDetailColorTemperature from './sections/LibraryDetailColorTemperature'
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
      getBarChartRequest,
      getDoughnutChartRequest,
      getColorTempRequest,
      getShotByShotRequest,
      getSelectedVideo,
      getSelectedVideoAverage,
      themeContext: { colors },
    } = this.props

    if (match.params.videoId) {
      getSelectedVideo(match.params.videoId)
      getSelectedVideoAverage(match.params.videoId)
      getBarChartRequest({ LibraryDetailId: 1 })
      getDoughnutChartRequest({
        LibraryDetailId: match.params.videoId,
        themeColors: colors,
      })
      getColorTempRequest({ LibraryDetailId: 1 })
      getShotByShotRequest({ LibraryDetailId: 1 })
    }
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps
    const {
      match,
      getBarChartRequest,
      getDoughnutChartRequest,
      getColorTempRequest,
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
      getSelectedVideo(match.params.videoId)
      getSelectedVideoAverage(match.params.videoId)
      getBarChartRequest({ LibraryDetailId: 1 })
      getColorTempRequest({ videoId: match.params.videoId })
      getShotByShotRequest({ LibraryDetailId: 1 })
    }
  }

  render() {
    const {
      libraryDetail: {
        barChartData,
        doughnutData,
        colorTempData,
        shotByShotData,
        shotInfoData,
        selectedVideo,
        selectedVideoAverage,
      },
      match: {
        params: { videoId },
      },
    } = this.props

    return (
      <React.Fragment>
        {barChartData && (
          <LibraryDetailChartHeader
            barChartData={barChartData}
            selectedVideoAverage={selectedVideoAverage}
            videoUrl={`${mediaUrl}/lumiere/${userUuid}/${
              selectedVideo.uuid
            }.mp4`}
            title={selectedVideo.title}
            socialIcon={selectedVideo.socialIcon}
            cvScore={selectedVideo['cvScores.value']}
          />
        )}
        {doughnutData && <LibraryDetailDoughnutChart />}
        {colorTempData && (
          <LibraryDetailColorTemperature
            videoId={videoId}
            colorTempData={colorTempData}
          />
        )}
        {shotByShotData && (
          <LibraryDetailShotByShot
            shots={shotByShotData.video.shots}
            slideImages={shotByShotData.slideImages}
            shotInfo={shotInfoData && shotInfoData}
            videoList={shotByShotData.videoList}
          />
        )}
      </React.Fragment>
    )
  }
}

LibraryDetail.propTypes = {
  barChartData: PropTypes.object,
  doughnutLineChartData: PropTypes.object,
  colorTempData: PropTypes.object,
  shotByShotData: PropTypes.object,
  getBarChartRequest: PropTypes.func,
  getDoughnutChartRequest: PropTypes.func,
  getColorTempRequest: PropTypes.func,
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
    getBarChartRequest: (id) => dispatch(actions.getBarChartRequest(id)),
    getDoughnutChartRequest: (id) =>
      dispatch(actions.getDoughnutChartRequest(id)),
    getColorTempRequest: (id) => dispatch(actions.getColorTempRequest(id)),
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
