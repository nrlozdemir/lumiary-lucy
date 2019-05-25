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
      getVideos,
      getBarChartRequest,
      getDoughnutChartRequest,
      getColorTempRequest,
      getShotByShotRequest,
      themeContext: { colors },
    } = this.props

    getVideos()
    if (match.params.videoId) {
      getBarChartRequest({ LibraryDetailId: match.params.videoId })
      getDoughnutChartRequest({
        LibraryDetailId: match.params.videoId,
        themeColors: colors,
      })
      getColorTempRequest({ LibraryDetailId: match.params.videoId })
      getShotByShotRequest({ LibraryDetailId: match.params.videoId })
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
      getBarChartRequest({ LibraryDetailId: match.params.videoId })

      getColorTempRequest({ LibraryDetailId: match.params.videoId })
      getShotByShotRequest({ LibraryDetailId: match.params.videoId })
    }
  }

  render() {
    const {
      libraryDetail: {
        barChartData,
        doughnutLineChartData,
        colorTempData,
        shotByShotData,
      },
      library: { videos },
      match: {
        params: { videoId },
      },
    } = this.props

    const { videoUrl, title, socialIcon, cvScore, id } =
      videos.find(({ id }) => id == videoId) || {}

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
        {barChartData && cvScore && (
          <LibraryDetailChartHeader
            barChartData={barChartData}
            videoUrl={videoUrl}
            title={title}
            socialIcon={socialIcon}
            cvScore={cvScore}
            id={id}
          />
        )}
        {doughnutLineChartData && (
          <LibraryDetailDoughnutChart doughnutData={doughnutLineChartData} />
        )}
        <LibraryDetailColorTemperature
          libraryDetailId={videoId}
          colorTempData={colorTempData}
        />
        {shotByShotData && (
          <LibraryDetailShotByShot
            sliderWithThumbnails={shotByShotData.sliderWithThumbnails}
            slideImages={shotByShotData.slideImages}
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
