import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectReportsVideoComparison } from 'Reducers/reports'

import cx from 'classnames'
import style from './style.scss'

import ComparisonHorizontalBarChart from 'Components/ComparisonHorizontalBarChart'
import Module from 'Components/Module'

class VideoComparison extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getVideoComparisonData(data)
  }
  render() {
    const {
      videoComparisonData: { data, loading, error },
    } = this.props
    return (
      <Module
        moduleKey={'Reports/VideoComparison'}
        title="Video Format Distrubution Comparison"
        action={this.callBack}
        filters={[
          {
            type: 'timeRange',
            selectKey: 'RVC-swda',
            placeHolder: 'Date',
          },
        ]}
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
        {data && data.length > 0 && (
          <ComparisonHorizontalBarChart data={data} />
        )}
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  videoComparisonData: makeSelectReportsVideoComparison(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(VideoComparison)