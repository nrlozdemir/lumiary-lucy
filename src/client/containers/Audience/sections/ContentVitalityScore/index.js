import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceContentVitalityScore } from 'Reducers/panoptic'

import style from 'Containers/Audience/style.scss'
import chartStyle from './style.scss'
import LineChart from 'Components/LineChart/Chart'

import { lineChartOptions, lineChartData_DatasetOptions } from './options'
import { chartCombineDataset } from 'Utils'

import Module from 'Components/Module'

function combineChartData(chartData) {
  return chartCombineDataset(chartData, lineChartData_DatasetOptions, {
    beforeDraw: function(chart, easing) {
      if (
        chart.config.options.chartArea &&
        chart.config.options.chartArea.backgroundColor
      ) {
        const ctx = chart.chart.ctx
        const chartArea = chart.chartArea

        ctx.save()
        ctx.fillStyle = chart.config.options.chartArea.backgroundColor
        ctx.fillRect(
          chartArea.left,
          chartArea.top,
          chartArea.right - chartArea.left,
          chartArea.bottom - chartArea.top
        )
        ctx.restore()
      }
		}
  })
}

class ContentVitalityScore extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceContentVitalityScoreData(data)
  }

  render() {
    // const { selectViews, selectPlatforms, selectDate } = this.state;
    const {
      audienceContentVitalityScoreData: { data, loading, error },
    } = this.props

    return (
      <Module
        moduleKey={'Audience/ContentVitalityScore'}
        title="Content Vitality Score Based On Audience"
        action={this.callBack}
        filters={[
          {
            type: 'platform',
            selectKey: 'ACOT-ads',
            placeHolder: 'Platforms',
          },
          {
            type: 'timeRange',
            selectKey: 'ACOT-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        {data && data.datasets && (
          <div data-vertical-title="Number Of Videos" className={chartStyle.vitalityContainer}>
						<LineChart
							backgroundColor="#242b49"
							dataSet={() => combineChartData(data)}
							width={1070}
							height={291}
							options={lineChartOptions}
						/>
					</div>
        )}
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audienceContentVitalityScoreData: makeSelectAudienceContentVitalityScore(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ContentVitalityScore)
