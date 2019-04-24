import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticFilteringSection } from 'Reducers/panoptic'

import classnames from 'classnames'
import 'chartjs-plugin-datalabels'
import SelectFilters from 'Components/SelectFilters'
import style from './style.scss'

import DoughnutChart from 'Components/Charts/DoughnutChart'
import VerticalStackedBarChart from 'Components/Charts/Panoptic/VerticalStackedBarChart'

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
						{doughnutData && doughnutData.average && (
							<DoughnutChart
								wrapperClassName={style.doughnutWithLabelsContainer}
								chartClassName="customChartClass"
								width={270}
								height={270}
								data={doughnutData.average}
								datasetsBackgroundColor={["#acb0be", "#8567f0", "#D0506C", "#51adc0"]}
								datasetsHoverBackgroundColor={["#acb0be", "#8567f0", "#D0506C", "#51adc0"]}
								fillText="Total Percentage"
								dataLabelFunction="insertAfter"
								dataLabelInsert="%"
								labelsPosition="right"
								labelsClassName="customLabelClass"
								labelsData={doughnutRoundData}
							/>
						)}
          </div>
          <div className={style.stackedChart}>
            {stackedChartData && (
              <VerticalStackedBarChart data={stackedChartData} />
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
