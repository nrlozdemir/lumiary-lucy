import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticFilteringSection } from 'Reducers/panoptic'
import Module from 'Components/Module'
import { isDataSetEmpty } from 'Utils/datasets'
//import classnames from 'classnames'
import 'chartjs-plugin-datalabels'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import StackedBarChart from 'Components/Charts/StackedBarChart'
import style from './style.scss'

import { chartColors } from 'Utils/globals'
import { isEmpty } from 'lodash'

class PanopticFilteringSection extends Component {
  callBack = (data) => {
    const { getFilteringSectionData } = this.props
    getFilteringSectionData(data)
  }

  render() {
    const {
      filteringSectionData: {
        data,
        data: { doughnutData, stackedChartData },
        loading,
        error,
      },
    } = this.props

    const isDoughnutEmpty = isDataSetEmpty(doughnutData)
    const isStackedChartEmpty = isDataSetEmpty(stackedChartData)

    const hasNoData =
      !loading &&
      ((!!doughnutData &&
        isDoughnutEmpty &&
        !!stackedChartData &&
        isStackedChartEmpty) ||
        isEmpty(data))

    return (
      <Module
        moduleKey={'Panoptic/FilteringSection'}
        title="Engagement By Property Over Time"
        action={this.callBack}
        filters={[
          {
            type: 'property',
            selectKey: 'PFS-dsad',
            placeHolder: 'property',
          },
          {
            type: 'platformEngagement',
            selectKey: 'PFS-plateng',
            placeHolder: 'Engagement by Platform',
          },
          {
            type: 'dateRange',
            selectKey: 'PFS-wxcvs',
            placeHolder: 'Date',
          },
        ]}
        isEmpty={hasNoData}
        loading={loading}
      >
        <div className={style.filteringSectionContainer}>
          <div className={style.radialAndStackChartWrapper}>
            <DoughnutChart
              width={270}
              height={270}
              data={!loading ? doughnutData : null}
              cutoutPercentage={58}
              fillText="Total Percentage"
              dataLabelFunction="insertAfter"
              dataLabelInsert="%"
              labelPositionRight
              labelsData={
                !!doughnutData &&
                !!doughnutData.labels &&
                doughnutData.labels.map((label, idx) => ({
                  data: label,
                  color: chartColors[idx],
                }))
              }
            />
          </div>
          <div className={style.stackedChart}>
            <StackedBarChart
              barData={!loading ? stackedChartData : null}
              barSpacing={4}
            />
          </div>
        </div>
      </Module>
    )
  }
}

PanopticFilteringSection.defaultProps = {
  filteringSectionData: {
    data: {
      doughnutData: {},
      stackedChartData: {},
      doughnutRoundData: {},
    },
  },
}

const mapStateToProps = createStructuredSelector({
  filteringSectionData: makeSelectPanopticFilteringSection(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(PanopticFilteringSection)
