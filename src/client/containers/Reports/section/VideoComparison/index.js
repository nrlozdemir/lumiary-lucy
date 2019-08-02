import React from 'react'
import Module from 'Components/Module'
import ComparisonHorizontalBarChart from 'Components/ComparisonHorizontalBarChart'
import Legend from 'Components/Legend'

import { isDataSetEmpty } from 'Utils/datasets'
import style from './style.scss'

const renderLegend = (legend) => {
  if (!!legend && !legend.length) {
    return null
  }

  return (
    <div className={style.headerLabel}>
      <div className={'d-flex align-items-center justify-content-center'}>
        {!!legend &&
          !!legend.length &&
          legend.map((item, idx) => (
            <Legend
              key={`VideoComparisonLegend_${idx}`}
              color={item.color}
              label={item.label}
            />
          ))}
      </div>
    </div>
  )
}

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
