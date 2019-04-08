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

import DoughnutChart from 'Components/Charts/Panoptic/DoughnutChart'
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
            type: 'engagement',
            selectKey: 'PFS-asd',
            placeHolder: 'Engagement',
          },
          {
            type: 'duration',
            selectKey: 'PFS-wds',
            placeHolder: 'Duration',
          },
          {
            type: 'platform',
            selectKey: 'PFS-wds',
            placeHolder: 'Platform',
          },
          {
            type: 'timeRange',
            selectKey: 'PFS-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        <div className={style.filteringSectionContainer}>
          <div className={style.radialAndStackChartWrapper}>
            <div>
              {doughnutData && doughnutData.average && (
                <DoughnutChart data={doughnutData.average} />
              )}
            </div>
            <div>
              {doughnutRoundData &&
                doughnutRoundData.map((roundData, index) => (
                  <div
                    className={classnames(
                      'd-flex',
                      'align-items-center',
                      style.lables
                    )}
                    key={index}
                  >
                    <span
                      className={style.round}
                      style={{ backgroundColor: `${roundData.color}` }}
                    />
                    <span className={style.secondsText}>{roundData.data}</span>
                  </div>
                ))}
            </div>
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
