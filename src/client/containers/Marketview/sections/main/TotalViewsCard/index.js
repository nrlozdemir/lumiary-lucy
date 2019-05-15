import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewTotalView } from 'Reducers/marketview'

import StackedBarChart from 'Components/Charts/StackedBarChart'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import style from './style.scss'
import 'chartjs-plugin-datalabels'
import Module from 'Components/Module'

class TotalViewsChart extends React.Component {
  callBack = (data, moduleKey) => {
    if (moduleKey === 'StackedBarChart') {
      this.props.getTotalViewsRequest(data, moduleKey)
      // console.log('===> DATA: ', data, 'MODULE_KEY: ', moduleKey)
    }
  }

  render() {
    const {
      totalViewsData: { barData, doughnutData },
    } = this.props

    // console.log('TOTAL CARD VIEW', this.props.totalViewsData)

    return (
      <Module
        moduleKey={'StackedBarChart'}
        title="Total Views For All Platforms In The Past Month"
        action={this.callBack}
        filters={[
          {
            type: 'platform',
            selectKey: 'Mw-asd',
            placeHolder: 'Platform',
          },
          {
            type: 'metric',
            selectKey: 'Mw-sad',
            placeHolder: 'Engagement',
          },
          {
            type: 'dateRange',
            selectKey: 'Mw-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        <div className="grid-collapse">
          <div className="col-6 mt-24">
            {barData && <StackedBarChart barData={barData} />}
          </div>
          <div className="col-6">
            {doughnutData && (
              <DoughnutChart
                width={270}
                height={270}
                data={doughnutData}
                cutoutPercentage={58}
                fillText="Total Percentage"
                dataLabelFunction="insertAfter"
                dataLabelInsert="%"
                labelPositionLeft
                labelsData={[
                  {
                    color: '#2FD7C4',
                    data: 'Barstool Sports',
                  },
                  {
                    color: '#8562F3',
                    data: 'SB Nation',
                  },
                  {
                    color: '#5292E5',
                    data: 'ESPN',
                  },
                  {
                    color: '#acb0be',
                    data: 'Scout Media',
                  },
                  {
                    color: '#545B79',
                    data: 'Fansided',
                  },
                ]}
              />
            )}
          </div>
        </div>
      </Module>
    )
  }
}

TotalViewsChart.propTypes = {
  totalViewsData: PropTypes.object,
}

TotalViewsChart.defaultProps = {
  totalViewsData: {
    barData: null,
    doughnutData: null,
  },
}

const mapStateToProps = createStructuredSelector({
  totalViewsData: makeSelectMarketviewTotalView(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TotalViewsChart)
