import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectReportsPerformanceComparison,
} from 'Reducers/reports'
//import cx from 'classnames'
//import ComparisonHorizontalBarChart from 'Components/ComparisonHorizontalBarChart'
import BarAndDoughnutChartModule from 'Components/Modules/BarAndDoughnutChartModule'

import { stackedChartOptions } from './options'
import style from './style.scss'

class PerformanceComparison extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getPerformanceComparisonData(data)
  }
  render() {
    const {
      performanceComparisonData: { data, loading, error },
    } = this.props
    return (
      <BarAndDoughnutChartModule
        data={data}
        moduleKey={'Reports/PerformanceComparison'}
        title="Property Performance Comparison"
        action={this.callBack}
        filters={[
          {
            type: 'pacing',
            selectKey: 'RPC-awaw',
            placeHolder: 'Pacing',
          },
          {
            type: 'engagement',
            selectKey: 'RPC-aqax',
            placeHolder: 'Engagement',
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
        reverse={false}
        barCustoms={{
          width: 720,
          height: 340,
          cutoutPercentage: 58,
          fillText: 'Total Percentage',
          dataLabelFunction: 'insertAfter',
          dataLabelInsert: '%',
          options: stackedChartOptions,
        }}
        doughnutCustoms={{
          width: 280,
          height: 280,
          cutoutPercentage: 58,
          fillText: 'Total Percentage',
          dataLabelFunction: 'insertAfter',
          dataLabelInsert: '%',
          options: stackedChartOptions,
        }}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  performanceComparisonData: makeSelectReportsPerformanceComparison(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(PerformanceComparison)
