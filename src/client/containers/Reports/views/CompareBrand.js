import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions as reportsActions,
  makeSelectReportsContentVitalityScore,
  makeSelectReportsColorComparison,
  makeSelectReportsPerformanceComparison,
  makeSelectReportsVideoComparison,
  makeSelectReportsComparebrandValues,
  makeSelectReportsPredefinedReportValues,
} from 'Reducers/reports'

import {
  actions as generatedReportActions,
  makeSelectReport,
} from 'Reducers/generatedReport'

import { getLocationParams } from 'Utils'

import { makeSelectAuthProfile } from 'Reducers/auth'

import RouterLoading from 'Components/RouterLoading'

import ContentVitalityScore from '../section/ContentVitalityScore'
import VideoComparison from '../section/VideoComparison'
import PerformanceComparison from '../section/PerformanceComparison'
import ColorComparison from '../section/ColorComparison'

class CompareBrand extends React.Component {
  componentDidMount() {
    const {
      location: { search },
      compareBrandFormSubmit,
      comparebrandValues: { data: comparebrandValues },
    } = this.props
    const urlParams = getLocationParams(search)
    if (
      !comparebrandValues &&
      urlParams &&
      urlParams.brand_one_uuid &&
      urlParams.brand_two_uuid &&
      urlParams.title
    ) {
      const urlParams = getLocationParams(search)
      compareBrandFormSubmit(
        {
          [urlParams.brand_one_uuid]: true,
          [urlParams.brand_two_uuid]: true,
          title: urlParams.title,
          saved: urlParams.saved
        },
        true
      )
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
      report: { data: report },
      comparebrandValues: { data: comparebrandValues },
      predefinedReportValues: { data: predefinedReportValues },
      authProfile = {},
      getContentVitalityScoreData,
      getColorComparisonData,
      getPerformanceComparisonData,
      getVideoComparisonData,
      contentVitalityScoreData,
      colorComparisonData,
      performanceComparisonData,
      videoComparisonData,
    } = this.props

    const reportValues =
      params.type === 'compare-brands'
        ? comparebrandValues
        : predefinedReportValues

    if (!reportValues) {
      return <RouterLoading />
    }

    return (
      <div>
        <ContentVitalityScore
          action={getContentVitalityScoreData}
          data={contentVitalityScoreData}
          report={reportValues}
          authProfile={authProfile}
        />
        <VideoComparison
          action={getVideoComparisonData}
          data={videoComparisonData}
          report={reportValues}
        />
        <PerformanceComparison
          action={getPerformanceComparisonData}
          data={performanceComparisonData}
          report={reportValues}
        />
        <ColorComparison
          action={getColorComparisonData}
          data={colorComparisonData}
          report={reportValues}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  report: makeSelectReport(),
  contentVitalityScoreData: makeSelectReportsContentVitalityScore(),
  colorComparisonData: makeSelectReportsColorComparison(),
  videoComparisonData: makeSelectReportsVideoComparison(),
  performanceComparisonData: makeSelectReportsPerformanceComparison(),

  comparebrandValues: makeSelectReportsComparebrandValues(),
  predefinedReportValues: makeSelectReportsPredefinedReportValues(),
  authProfile: makeSelectAuthProfile(),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...reportsActions, ...generatedReportActions }, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(CompareBrand)
