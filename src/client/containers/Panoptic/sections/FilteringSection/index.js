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

    const isDoughnutEmpty = isDataSetEmpty(doughnutData)

    const hasNoData =
      !loading &&
      ((!!doughnutData &&
        !!stackedChartData &&
        isDoughnutEmpty &&
        isDataSetEmpty(stackedChartData)) ||
        isEmpty(data))

    return (
      <Module
        moduleKey={'Panoptic/FilteringSection'}
        title="Engagement By Property Over Time"
        action={this.callBack}
        filters={[
          {
            type: 'duration',
            selectKey: 'PFS-duration',
            placeHolder: 'Duration',
          },
          {
            type: 'platform',
            selectKey: 'PFS-asdwda',
            placeHolder: 'Views on All Platforms',
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
            <DoughnutChart
              width={270}
              height={270}
              data={doughnutData}
              cutoutPercentage={58}
              fillText={isDoughnutEmpty ? 'No Data' : 'Total Percentage'}
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
            <StackedBarChart barData={stackedChartData} barSpacing={2} />
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
