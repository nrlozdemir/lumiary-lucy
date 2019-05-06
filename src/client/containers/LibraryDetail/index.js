import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { bindActionCreators, compose } from "redux"
import { reduxForm } from "redux-form"

import { chartCombineDataset } from "Utils"
import { actions, makeSelectLibraryDetail } from "Reducers/libraryDetail"
import { actions as libraryActions, makeSelectLibrary } from "Reducers/library"

import { radarData_DatasetOptions } from './options'
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
      getBarChartRequest({ LibraryDetailId: match.params.videoId });
      getDoughnutChartRequest({ LibraryDetailId: match.params.videoId });
      getColorTempRequest({ LibraryDetailId: match.params.videoId });
      getShotByShotRequest({ LibraryDetailId: match.params.videoId });
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
      getBarChartRequest({ LibraryDetailId: match.params.videoId });
      getDoughnutChartRequest({ LibraryDetailId: match.params.videoId });
      getColorTempRequest({ LibraryDetailId: match.params.videoId });
      getShotByShotRequest({ LibraryDetailId: match.params.videoId });
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

    const { videoUrl, title, socialIcon, cvScore, id } = videos.find(({ id }) => id == videoId) || {}

    let radarDataCombined = null

    if (shotByShotData) {
      radarDataCombined = chartCombineDataset(shotByShotData.radarData, radarData_DatasetOptions)
    }

    return (
      <React.Fragment>
        {barChartData && cvScore && <LibraryDetailChartHeader
          barChartData={barChartData}
          videoUrl={videoUrl}
          title={title}
          socialIcon={socialIcon}
          cvScore={cvScore}
          id={id}
        />}
        {doughnutLineChartData && doughnutLineChartData.doughnutData && <LibraryDetailDoughnutChart
          doughnutData={doughnutLineChartData.doughnutData}
        />}
        <LibraryDetailColorTemperature
        	libraryDetailId={videoId}
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
