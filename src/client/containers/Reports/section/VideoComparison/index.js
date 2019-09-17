import React from 'react'
import Module from 'Components/Module'
import ComparisonHorizontalBarChart from 'Components/ComparisonHorizontalBarChart'
import renderLegend from 'Components/Legend/render'

import { isDataSetEmpty } from 'Utils/datasets'

class VideoComparison extends React.Component {
  callBack = (data, moduleKey) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  render() {
    const {
      data: { data, loading, error },
    } = this.props

    return (
      <Module
        moduleKey={'Reports/VideoComparison'}
        title="Video Duration Distribution Comparison"
        action={this.callBack}
        isEmpty={isDataSetEmpty(data)}
        filters={[
          {
            type: 'dateRange',
            selectKey: 'RVC-swda',
            placeHolder: 'Date',
          },
        ]}
        loading={loading}
        legend={renderLegend(
          !!data && !!data.legend && !!data.legend.length ? data.legend : []
        )}
      >
        <ComparisonHorizontalBarChart data={data || {}} />
      </Module>
    )
  }
}

export default VideoComparison
