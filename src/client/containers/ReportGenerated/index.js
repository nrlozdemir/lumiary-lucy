import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectReportsVideoReleasesBarChart,
  makeSelectReportsTopVideosCard,
  makeSelectReportsTopPerformingVideos,
  makeSelectReportsPacingCard,
  makeSelectReportsFilteringSection,
  makeSelectReportsColorTempData,
  makeSelectReport,
} from 'Reducers/generatedReport'

import { makeSelectSelectFilters } from 'Reducers/selectFilters'
import { makeSelectAuthProfile } from 'Reducers/auth'

import RouterLoading from 'Components/RouterLoading'

//import ReportsHeader from './sections/ReportsHeader'

import CreatedFilters from './sections/CreatedFilters'
import Slider from './sections/Slider'
import VideoReleasesBarChart from './sections/VideoReleasesBarChart'
import TopVideosCard from './sections/TopVideosCard'
import PacingCard from './sections/PacingCard'
import EngagementByProperty from './sections/EngagementByProperty'
import ColorTemperature from './sections/ColorTemperature'

class ReportGenerated extends React.Component {
  componentDidMount() {
    const {
      getReportRequest,
      match: { params },
    } = this.props

    const id = params && params.id

    getReportRequest({ id })
  }

  render() {
    const {
      report: { data: report },

      setSelectedVideo,
      selects,
      profile: { brand },

      getVideoReleasesBarChartRequest,
      getCompetitorTopVideosRequest,
      getTopPerformingVideosRequest,
      getPacingCardDataRequest,
      getColorTempDataRequest,
      getFilteringSectionDataRequest,

      videoReleasesBarChart,
      competitorTopVideos,
      topPerformingVideos,
      pacingChartData,
      colorTempData,
      filteringSectionData,
    } = this.props

    if (!report) {
      return <RouterLoading />
    }

    return (
      <React.Fragment>
        {/*<ReportsHeader />*/}
        <CreatedFilters
          report={report}
          brands={[
            {
              name: brand.name,
              uuid: brand.uuid,
            },
            ...brand.competitors,
          ]}
        />
        <Slider
          action={getTopPerformingVideosRequest}
          setSelectedVideo={setSelectedVideo}
          data={topPerformingVideos}
          report={report}
        />
        <VideoReleasesBarChart
          action={getVideoReleasesBarChartRequest}
          data={videoReleasesBarChart}
          report={report}
        />
        <TopVideosCard
          action={getCompetitorTopVideosRequest}
          data={competitorTopVideos}
          report={report}
        />
        <PacingCard
          action={getPacingCardDataRequest}
          data={pacingChartData}
          report={report}
        />
        <EngagementByProperty
          action={getFilteringSectionDataRequest}
          data={filteringSectionData}
          report={report}
        />
        <ColorTemperature
          action={getColorTempDataRequest}
          data={colorTempData}
          selects={selects}
          report={report}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectAuthProfile(),

  report: makeSelectReport(),
  videoReleasesBarChart: makeSelectReportsVideoReleasesBarChart(),
  competitorTopVideos: makeSelectReportsTopVideosCard(),
  topPerformingVideos: makeSelectReportsTopPerformingVideos(),
  pacingChartData: makeSelectReportsPacingCard(),
  colorTempData: makeSelectReportsColorTempData(),
  filteringSectionData: makeSelectReportsFilteringSection(),

  selects: makeSelectSelectFilters(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ReportGenerated)
