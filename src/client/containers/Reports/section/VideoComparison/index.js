import React from 'react'
import Module from 'Components/Module'
import ComparisonHorizontalBarChart from 'Components/ComparisonHorizontalBarChart'
import { isDataSetEmpty } from 'Utils/datasets'
import style from './style.scss'

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
        title="Video Format Distrubution Comparison"
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
        legend={
          <div className={style.headerLabel}>
            <div
              className={
                'd-flex align-items-center justify-content-center ' +
                style.headerLabel
              }
            >
              <div className="d-flex align-items-center mr-32">
                <span className={style.redRound} />
                <p>Bleacher Report</p>
              </div>
              <div className="d-flex align-items-center mr-32">
                <span className={style.duskRound} />
                <p>Barstool Sports</p>
              </div>
            </div>
          </div>
        }
      >
        {data && <ComparisonHorizontalBarChart data={data} />}
      </Module>
    )
  }
}

export default VideoComparison
