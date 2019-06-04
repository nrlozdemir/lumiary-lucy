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

import RouterLoading from 'Components/RouterLoading'

import ContentVitalityScore from '../section/ContentVitalityScore'
import VideoComparison from '../section/VideoComparison'
import PerformanceComparison from '../section/PerformanceComparison'
import ColorComparison from '../section/ColorComparison'

class CompareBrand extends React.Component {
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
      comparebrandValues: { data: comparebrandValues },
      predefinedReportValues: { data: predefinedReportValues },

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
      params && params.id
        ? report
        : params.type === 'compare-brands'
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
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...reportsActions, ...generatedReportActions }, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(CompareBrand)
