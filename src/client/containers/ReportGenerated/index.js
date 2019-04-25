import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectGeneratedReport } from 'Reducers/generatedReport'
import RouterLoading from 'Components/RouterLoading'
import style from './style.scss'
import ReportsHeader from './sections/ReportsHeader'
import CreatedFilters from './sections/CreatedFilters'
import Slider from './sections/Slider'
import VideoReleasesBarChart from './sections/VideoReleasesBarChart'
import TopVideosCard from './sections/TopVideosCard'
import PacingCard from './sections/PacingCard'
import FilteringSection from './sections/FilteringSection'
import ColorTemperature from './sections/ColorTemperature'

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
    const {
      selectLikes,
      selectDate,
      selectPlatforms,
      selectWarmColor,
      selectResolution,
      selectDuration,
    } = this.state
    const {
      generatedReport: {
        data: {
          topPerformingVideos,
          videoReleasesData,
          topVideosOverTime,
          pacingChartData,
          verticalStackedChartData,
          colorTempData,
        },
        selectedVideo,
        loading,
        error,
      },
    } = this.props

    if (!selectedVideo || loading) {
      return <RouterLoading />
    }
    return (
      <React.Fragment>
        {/*<ReportsHeader />*/}
        <div className="grid-container col-12 mr-40 ml-40 mt-72 mb-72">
          <CreatedFilters />
          {topPerformingVideos && (
            <Slider
              selectedVideo={selectedVideo}
              data={topPerformingVideos}
              changeSelectedVideo={this.changeSelectedVideo}
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
          {pacingChartData && (
            <PacingCard
              handleSelectFilters={this.handleSelectFilters}
              barData={pacingChartData}
              selectDate={selectDate}
              selectLikes={selectLikes}
            />
          )}
          {verticalStackedChartData && (
            <FilteringSection
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
            />
          )}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  generatedReport: makeSelectGeneratedReport(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ReportGenerated)
