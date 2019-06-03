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

    getReportRequest({ id })
  }

  render() {
    const {
      report: { data: report },

      getContentVitalityScoreData,
      getColorComparisonData,
      getPerformanceComparisonData,
      getVideoComparisonData,

      contentVitalityScoreData,
      colorComparisonData,
      performanceComparisonData,
      videoComparisonData,
    } = this.props

    if (!report) {
      return <RouterLoading />
    }

    return (
      <div>
        <ContentVitalityScore
          action={getContentVitalityScoreData}
          data={contentVitalityScoreData}
          report={report}
        />
        <VideoComparison
          action={getVideoComparisonData}
          data={videoComparisonData}
          report={report}
        />
        <PerformanceComparison
          action={getPerformanceComparisonData}
          data={performanceComparisonData}
          report={report}
        />
        <ColorComparison
          action={getColorComparisonData}
          data={colorComparisonData}
          report={report}
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
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...reportsActions, ...generatedReportActions }, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(CompareBrand)
