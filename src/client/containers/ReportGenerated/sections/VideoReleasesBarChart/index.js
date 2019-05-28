import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectReportsVideoReleasesBarChart,
} from 'Reducers/generatedReport'

import VideoReleasesBarChartModule from 'Components/Modules/VideoReleasesBarChartModule'

class VideoReleasesBarChart extends React.Component {
  componentDidMount() {
    const { getVideoReleasesBarChartRequest, reportId } = this.props
    getVideoReleasesBarChartRequest({ reportId })
  }

  render() {
    const {
      videoReleasesBarChart: { data },
    } = this.props

    let chartData = {}

    if (data) {
      chartData = data
      chartData.labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

      Object.values(chartData.datasets).map((el, i) => {
        chartData.datasets[i].label = 'Dataset 2'
        chartData.datasets[i].backgroundColor = '#5292E5'
        if (i % 2 == 0) {
          chartData.datasets[i].label = 'Dataset 1'
          chartData.datasets[i].backgroundColor = '#2FD7C4'
        }
      })
    }

    return (
      <VideoReleasesBarChartModule
        data={data && chartData}
        moduleKey={'ReportGenerated/VideoReleasesBarChartModule'}
        title="Video Releases vs Engagement"
        legend={[
          { label: 'Videos', color: 'cool-blue' },
          { label: 'Engagement', color: 'coral-pink' },
        ]}
        legendEnd={true}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  videoReleasesBarChart: makeSelectReportsVideoReleasesBarChart(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(VideoReleasesBarChart)
