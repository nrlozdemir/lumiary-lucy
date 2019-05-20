import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticFilteringSection } from 'Reducers/panoptic'
import Module from 'Components/Module'
import { chartCombineDataset, isDataSetEmpty } from 'Utils'
//import classnames from 'classnames'
import 'chartjs-plugin-datalabels'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import StackedBarChart from 'Components/Charts/StackedBarChart'
import style from './style.scss'
import {
  doughnutData_DatasetOptions,
  stackedChartData_DatasetOptions,
} from './options'
import { chartColors } from 'Utils/globals'

import { isEmpty, isEqual } from 'lodash'

class PanopticFilteringSection extends Component {
  callBack = (data) => {
    const { getFilteringSectionData } = this.props
    getFilteringSectionData(data)
  }

  shouldComponentUpdate(nextProps) {
    const {
      filteringSectionData: { data: nextData },
    } = nextProps

    const {
      filteringSectionData: { data },
    } = this.props

    return !isEqual(nextData, data)
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

    const combineStackedChartData = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: stackedChartData,
    }

    const hasNoData =
      !loading &&
      ((!!doughnutData &&
        !!stackedChartData &&
        isDataSetEmpty(doughnutData) &&
        isDataSetEmpty(combineStackedChartData)) ||
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
            type: 'metric',
            selectKey: 'PFS-asdwda',
            placeHolder: 'Engagement',
          },
          {
            type: 'platform',
            selectKey: 'PFS-dwdf',
            placeHolder: 'Platform',
          },
          {
            type: 'dateRange',
            selectKey: 'PFS-wxcvs',
            placeHolder: 'Date',
          },
        ]}
        isEmpty={hasNoData}
      >
        <div className={style.filteringSectionContainer}>
          <div className={style.radialAndStackChartWrapper}>
            {doughnutData && (
              <DoughnutChart
                width={270}
                height={270}
                data={doughnutData}
                cutoutPercentage={58}
                fillText="Total Percentage"
                dataLabelFunction="insertAfter"
                dataLabelInsert="%"
                labelPositionRight
                labelsData={[
                  { data: '0-15 seconds', color: '#2FD7C4' },
                  { data: '15-30 seconds', color: '#8562F3' },
                  { data: '30-45 seconds', color: '#5292E5' },
                  { data: '45-60 seconds', color: '#acb0be' },
                ]}
                labelsData={
                  !!doughnutData &&
                  !!doughnutData.labels &&
                  doughnutData.labels.map((label, idx) => ({
                    data: label,
                    color: chartColors[idx],
                  }))
                }
              />
            )}
          </div>
          <div className={style.stackedChart}>
            {stackedChartData && (
              <StackedBarChart
                barData={chartCombineDataset(
                  combineStackedChartData,
                  stackedChartData_DatasetOptions
                )}
                barSpacing={2}
              />
            )}
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
