import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectGeneratedReport } from 'Reducers/generatedReport'
import RouterLoading from 'Components/RouterLoading'
//import ReportsHeader from './sections/ReportsHeader'
import CreatedFilters from './sections/CreatedFilters'
import Slider from 'Components/Modules/SliderModule'
import VideoReleasesBarChart from './sections/VideoReleasesBarChart'
import TopVideosCard from './sections/TopVideosCard'
import PacingCard from './sections/PacingCard'
import EngagementByProperty from './sections/EngagementByProperty'
import ColorTemperature from './sections/ColorTemperature'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'
//import style from './style.scss'

class ReportGenerated extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadGeneratedReport()
  }

  changeSelectedVideo = (video) => {
    this.props.setSelectedVideo(video)
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { selectWarmColor, selectResolution, selectDuration } = this.state
    const {
      generatedReport: {
        data: {
          topPerformingVideos,
          videoReleasesData,
          topVideosOverTime,
          verticalStackedChartData,
          colorTempData,
        },
        selectedVideo,
        loading,
        error,
      },
      match: { params },
    } = this.props

    if (!selectedVideo || loading) {
      return <RouterLoading />
    }
    return (
      <React.Fragment>
        {/*<ReportsHeader />*/}
        <CreatedFilters />
        {topPerformingVideos && (
          <Slider
            selectedVideo={selectedVideo}
            data={topPerformingVideos}
            changeSelectedVideo={this.changeSelectedVideo}
            title="Top Performing Videos"
          />
        )}
        {videoReleasesData && (
          <VideoReleasesBarChart data={videoReleasesData} />
        )}
        {topVideosOverTime && (
          <TopVideosCard
            chartData={topVideosOverTime}
            selectResolution={selectResolution}
            handleSelectFilters={this.handleSelectFilters}
          />
        )}

        <PacingCard reportId={params && params.id} />

        {verticalStackedChartData && (
          <EngagementByProperty
            data={verticalStackedChartData}
            handleSelectFilters={this.handleSelectFilters}
            selectDuration={selectDuration}
          />
        )}
        {colorTempData && (
          <ColorTemperature
            colorTempData={colorTempData}
            handleSelectFilters={this.handleSelectFilters}
            selectWarmColor={selectWarmColor}
            selects={this.props.selects}
          />
        )}

      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  generatedReport: makeSelectGeneratedReport(),
  selects: makeSelectSelectFilters(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ReportGenerated)
