import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticFilteringSection } from 'Reducers/panoptic'
import Module from 'Components/Module'
//import classnames from 'classnames'
import 'chartjs-plugin-datalabels'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import StackedBarChart from 'Components/Charts/StackedBarChart'
import style from './style.scss'

class PanopticFilteringSection extends Component {
  callBack = (data, moduleKey) => {
    this.props.getFilteringSectionData(data)
  }

  render() {
    const {
      filteringSectionData: {
        data: { doughnutData, stackedChartData },
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
            type: 'videoProperty',
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
