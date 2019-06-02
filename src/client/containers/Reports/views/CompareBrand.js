import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectReportsContentVitalityScore,
  makeSelectReportsColorComparison,
  makeSelectReportsPerformanceComparison,
  makeSelectReportsVideoComparison,
} from 'Reducers/reports'

import ContentVitalityScore from '../section/ContentVitalityScore'
import VideoComparison from '../section/VideoComparison'
import PerformanceComparison from '../section/PerformanceComparison'
import ColorComparison from '../section/ColorComparison'

class CompareBrand extends React.Component {
  render() {
    const {
      match: { params },

      getContentVitalityScoreData,
      getColorComparisonData,
      getPerformanceComparisonData,
      getVideoComparisonData,

      contentVitalityScoreData,
      colorComparisonData,
      performanceComparisonData,
      videoComparisonData,
    } = this.props

    const id = params && params.id

    const report = {
      id,
      brands: [
        {
          name: 'barstoolsports',
          uuid: '1cc05ce9-d9a3-4be0-b564-d02fbdcd87a6',
        },
        {
          name: 'bleacherreport',
          uuid: 'd65aa957-d094-4cf3-8d37-dafe50e752ea',
        },
      ],
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
  contentVitalityScoreData: makeSelectReportsContentVitalityScore(),
  colorComparisonData: makeSelectReportsColorComparison(),
  videoComparisonData: makeSelectReportsVideoComparison(),
  performanceComparisonData: makeSelectReportsPerformanceComparison(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(CompareBrand)
