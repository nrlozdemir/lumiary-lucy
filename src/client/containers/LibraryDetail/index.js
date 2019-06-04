import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { reduxForm } from 'redux-form'

import { chartCombineDataset } from 'Utils'
import { actions, makeSelectLibraryDetail } from 'Reducers/libraryDetail'
import { actions as libraryActions, makeSelectLibrary } from 'Reducers/library'

import { radarData_DatasetOptions } from './options'
import LibraryDetailChartHeader from './sections/LibraryDetailChartHeader'
import LibraryDetailDoughnutChart from './sections/LibraryDetailDoughnutChart'
import LibraryDetailColorTemperature from './sections/LibraryDetailColorTemperature'
import LibraryDetailShotByShot from './sections/LibraryDetailShotByShot'
import { userUuid } from 'Utils/globals'
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
      themeContext: { colors },
    } = this.props

    if (match.params.videoId) {
      getSelectedVideo(match.params.videoId)
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
      getBarChartRequest({ LibraryDetailId: 1 })
      getColorTempRequest({ videoId: match.params.videoId })
      getShotByShotRequest({ LibraryDetailId: 1 })
    }
  }

  render() {
    const {
      libraryDetail: {
        barChartData,
        doughnutLineChartData,
        colorTempData,
        shotByShotData,
        selectedVideo: {
          socialIcon,
          uuid,
          title,
          'cvScore.value': cvScore = 0.0,
        },
      },
      match: {
        params: { videoId },
      },
    } = this.props

    let radarDataCombined = null

    if (shotByShotData) {
      radarDataCombined = chartCombineDataset(
        {
          labels: [
            '#fff20d',
            '#f8b90b',
            '#eb7919',
            '#dd501d',
            '#cc2226',
            '#b83057',
            '#923683',
            '#79609b',
            '#3178b0',
            '#229a78',
            '#13862b',
            '#aac923',
          ],
          ...shotByShotData.radarData,
        },
        radarData_DatasetOptions
      )
    }

    return (
      <React.Fragment>
        {barChartData && (
          <LibraryDetailChartHeader
            barChartData={barChartData}
            videoUrl={`https://s3.amazonaws.com/quickframe-media-qa/lumiere/${userUuid}/${uuid}.mp4`}
            title={title}
            socialIcon={socialIcon}
            cvScore={cvScore}
          />
        )}
        {doughnutLineChartData && (
          <LibraryDetailDoughnutChart doughnutData={doughnutLineChartData} />
        )}
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
            radarData={radarDataCombined}
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
