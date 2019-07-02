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

import { getLocationParams } from 'Utils'

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
      location: { search },
      brandInsightFormSubmit,
      brandInsightValues: { data: brandInsightValues },
    } = this.props
    if (!brandInsightValues) {
      const urlParams = getLocationParams(search)
      const parsedData =
        !!urlParams &&
        Object.keys(urlParams).reduce((acc, curr) => {
          acc[curr] = { value: urlParams[curr] }
          return acc
        }, {})
      brandInsightFormSubmit({ ...parsedData, title: urlParams.title, report_uuid: urlParams.report_uuid }, true)
    }
  }

  componenWillUnmount() {
    this.props.createdReportControl({
      isSaved: false,
      uuid: null,
    })
  }

  render() {
    const {
      match: { params },
      location: { search },
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

    if (
      !brandInsightValues ||
      !brandInsightValues.brand ||
      !brandInsightValues.date ||
      !brandInsightValues.engagement ||
      !brandInsightValues.title ||
      !brandInsightValues.social
    ) {
      return null
    }

    return (
      <React.Fragment>
        {/*<ReportsHeader />*/}
        <CreatedFilters
          report={brandInsightValues}
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
          report={brandInsightValues}
        />
        <VideoReleasesBarChart
          action={getVideoReleasesBarChartRequest}
          data={videoReleasesBarChart}
          report={brandInsightValues}
        />
        <TopVideosCard
          action={getCompetitorTopVideosRequest}
          data={competitorTopVideos}
          report={brandInsightValues}
        />
        <PacingCard
          action={getPacingCardDataRequest}
          data={pacingChartData}
          report={brandInsightValues}
        />
        <EngagementByProperty
          action={getFilteringSectionDataRequest}
          data={filteringSectionData}
          report={brandInsightValues}
        />
        {/*<ColorTemperature
          action={getColorTempDataRequest}
          data={colorTempData}
          selects={selects}
          report={urlParams}
        />
        */}
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
