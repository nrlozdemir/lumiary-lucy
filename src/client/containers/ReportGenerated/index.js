import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions as generatedReportActions,
  makeSelectReportsVideoReleasesBarChart,
  makeSelectReportsTopVideosCard,
  makeSelectReportsTopPerformingVideos,
  makeSelectReportsPacingCard,
  makeSelectReportsFilteringSection,
  makeSelectReportsColorTempData,
  makeSelectReport,
} from 'Reducers/generatedReport'

import {
  actions as reportsActions,
  makeSelectReportsBrandInsightValues,
} from 'Reducers/reports'

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

    if (id) {
      getReportRequest({ id })
    }
  }

  render() {
    const {
      match: { params },
      report: { data: report },
      brandInsightValues: { data: brandInsightValues },

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

    const reportValues = params && params.id ? report : brandInsightValues

    if (!reportValues) {
      return <RouterLoading />
    }

    return (
      <React.Fragment>
        {/*<ReportsHeader />*/}
        <CreatedFilters
          report={reportValues}
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
          report={reportValues}
        />
        <VideoReleasesBarChart
          action={getVideoReleasesBarChartRequest}
          data={videoReleasesBarChart}
          report={reportValues}
        />
        <TopVideosCard
          action={getCompetitorTopVideosRequest}
          data={competitorTopVideos}
          report={reportValues}
        />
        <PacingCard
          action={getPacingCardDataRequest}
          data={pacingChartData}
          report={reportValues}
        />
        <EngagementByProperty
          action={getFilteringSectionDataRequest}
          data={filteringSectionData}
          report={reportValues}
        />
        <ColorTemperature
          action={getColorTempDataRequest}
          data={colorTempData}
          selects={selects}
          report={reportValues}
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
  brandInsightValues: makeSelectReportsBrandInsightValues(),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...generatedReportActions, ...reportsActions }, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ReportGenerated)
