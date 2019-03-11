import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { bindActionCreators, compose } from "redux"
import { reduxForm } from "redux-form"

import { chartCombineDataset } from "Utils"
import { actions, makeSelectLibraryDetail } from "Reducers/libraryDetail"
import { actions as libraryActions, makeSelectLibrary } from "Reducers/library"

import { barData_DatasetOptions, radarData_DatasetOptions, lineChartData_DatasetOptions } from './options'
import LibraryDetailHeader from "./sections/LibraryDetailHeader"
import LibraryDetailChartHeader from "./sections/LibraryDetailChartHeader"
import LibraryDetailDoughnutChart from "./sections/LibraryDetailDoughnutChart"
import LibraryDetailColorTemperature from "./sections/LibraryDetailColorTemperature"
import LibraryDetailShotByShot from "./sections/LibraryDetailShotByShot"

/* eslint-disable react/prefer-stateless-function */
export class LibraryDetail extends React.Component {
  constructor(props) {
    super(props)
    this.slide = React.createRef()
    this.state = {
      sliderVal: 0,
      maxValue: 1000
    }
  }

  componentDidMount() {
    const {
      match,
      getVideos,
      getBarChartRequest,
      getDoughnutChartRequest,
      getColorTempRequest,
      getShotByShotRequest
    } = this.props

    getVideos()

    if (match.params.videoId) {
      getBarChartRequest(match.params.videoId)
      getDoughnutChartRequest(match.params.videoId)
      getColorTempRequest(match.params.videoId)
      getShotByShotRequest(match.params.videoId)
    }
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps
    const {
      match,
      getBarChartRequest,
      getDoughnutChartRequest,
      getColorTempRequest,
      getShotByShotRequest
    } = this.props

    if (prevMatch.params.videoId !== match.params.videoId) {
      getBarChartRequest(match.params.videoId),
        getDoughnutChartRequest(match.params.videoId)
      getColorTempRequest(match.params.videoId)
      getShotByShotRequest(match.params.videoId)
    }
  }

  render() {
    const {
      libraryDetail: {
        barChartData,
        doughnutLineChartData,
        colorTempData,
        shotByShotData
      },
      library: { videos },
      match: { params: { videoId } }
    } = this.props

    const { videoUrl, title, socialIcon } = videos.find(({ id }) => id == videoId) || {}

    let barData = null
    let lineChartDataCombined = null
    let radarDataCombined = null

    if (barChartData) {
      barData = chartCombineDataset(barChartData, barData_DatasetOptions)
    }
    if (shotByShotData) {
      radarDataCombined = chartCombineDataset(shotByShotData.radarData, radarData_DatasetOptions)
    }

    return (
      <React.Fragment>
        <LibraryDetailHeader
          videoName={title}
          publishedPlatform={socialIcon}
        />
        {barData && <LibraryDetailChartHeader
          barData={barData}
          videoUrl={videoUrl}
          title={title}
          socialIcon={socialIcon}
        />}
        {doughnutLineChartData && doughnutLineChartData.doughnutData && <LibraryDetailDoughnutChart
          doughnutData={doughnutLineChartData.doughnutData}
        />}
        <LibraryDetailColorTemperature
          colorTempData={colorTempData}
        />
        {shotByShotData && <LibraryDetailShotByShot
          sliderWithThumbnails={shotByShotData.sliderWithThumbnails}
          slideImages={shotByShotData.slideImages}
          radarData={radarDataCombined}
          videoList={shotByShotData.videoList}
        />
        }
      </React.Fragment>
    )
  }
}

LibraryDetail.propTypes = {
  barChartData: PropTypes.object,
  doughnutLineChartData: PropTypes.object,
  colorTempData: PropTypes.object,
  shotByShotData: PropTypes.object,
  getBarChartRequest: PropTypes.func.isRequired,
  getDoughnutChartRequest: PropTypes.func.isRequired,
  getColorTempRequest: PropTypes.func.isRequired,
  getShotByShotRequest: PropTypes.func.isRequired

}

const mapStateToProps = createStructuredSelector({
  libraryDetail: makeSelectLibraryDetail(),
  library: makeSelectLibrary(),
})

function mapDispatchToProps(dispatch) {
  return {
    getVideos: () => dispatch(libraryActions.loadVideos()),
    getBarChartRequest: id => dispatch(actions.getBarChartRequest(id)),
    getDoughnutChartRequest: id => dispatch(actions.getDoughnutChartRequest(id)),
    getColorTempRequest: id => dispatch(actions.getColorTempRequest(id)),
    getShotByShotRequest: id => dispatch(actions.getShotByShotRequest(id)),
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
  withConnect
)(LibraryDetail)
