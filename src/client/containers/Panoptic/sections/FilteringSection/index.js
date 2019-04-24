import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticFilteringSection } from 'Reducers/panoptic'

import classnames from 'classnames'
import 'chartjs-plugin-datalabels'
import style from './style.scss'

import DoughnutChart from 'Components/Charts/DoughnutChart'
import StackedBarChart from 'Components/Charts/StackedBarChart'

import Module from 'Components/Module'

class PanopticFilteringSection extends Component {
  callBack = (data, moduleKey) => {
    this.props.getFilteringSectionData(data)
  }

  render() {
    const {
      filteringSectionData: {
        data: { doughnutData, stackedChartData, doughnutRoundData },
        loading,
        error,
      },
    } = this.props
    return (
      <Module
        moduleKey={'Panoptic/FilteringSection'}
        title="Engagement By Property Over Time"
        action={this.callBack}
        filters={[
          {
            type: 'duration',
            selectKey: 'PFS-dsad',
            placeHolder: 'Duration',
          },
          {
            type: 'engagement',
            selectKey: 'PFS-asdwda',
            placeHolder: 'Engagement',
          },
          {
            type: 'platform',
            selectKey: 'PFS-dwdf',
            placeHolder: 'Platform',
          },
          {
            type: 'timeRange',
            selectKey: 'PFS-wxcvs',
            placeHolder: 'Date',
          },
        ]}
      >
        <div className={style.filteringSectionContainer}>
          <div className={style.radialAndStackChartWrapper}>
            {doughnutData && (
              <DoughnutChart
                wrapperClassName={style.doughnutWithLabelsContainer}
                chartClassName="customChartClass"
                width={270}
                height={270}
                data={doughnutData}
                fillText="Total Percentage"
                dataLabelFunction="insertAfter"
                dataLabelInsert="%"
                labelsPosition="right"
                labelsClassName="customLabelClass"
                labelsData={doughnutData.labels}
              />
            )}
          </div>
          <div className={style.stackedChart}>
            {stackedChartData && <StackedBarChart barData={stackedChartData} />}
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
