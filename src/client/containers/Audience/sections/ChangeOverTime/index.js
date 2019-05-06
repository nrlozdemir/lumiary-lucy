import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceChangeOverTime } from 'Reducers/panoptic'
import Module from 'Components/Module'
import LineChart from 'Components/LineChart/Chart'
import { lineChartOptions, lineChartData_DatasetOptions } from './options'
import { chartCombineDataset } from 'Utils'
import style from 'Containers/Audience/style.scss'

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
    },
  })
}

class ChangeOverTime extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceChangeOverTimeData(data)
  }

  render() {
    // const { selectViews, selectPlatforms, selectDate } = this.state;
    const {
      audienceChangeOverTimeData: { data, loading, error },
    } = this.props

    return (
      <Module
        moduleKey={'Audience/ChangeOverTime'}
        title="Change Over Time By Property"
        action={this.callBack}
        filters={[
          {
            type: 'engagement',
            selectKey: 'ACOT-asd',
            placeHolder: 'Engagement',
          },
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
        legend={
          <div
            className={
              'd-flex align-items-center justify-content-center ' +
              style.headerLabel
            }
          >
            <div className="d-flex align-items-center mr-32">
              <span className={style.redRound} />
              <p>Male</p>
            </div>
            <div className="d-flex align-items-center mr-32">
              <span className={style.duskRound} />
              <p>Female</p>
            </div>
          </div>
        }
      >
        {data && data.datasets && (
          <div className={style.audienceContainer}>
            <LineChart
              backgroundColor="#21243B"
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
  audienceChangeOverTimeData: makeSelectAudienceChangeOverTime(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

{
  /*<div className="grid-container mr-20 ml-20 mt-72 bg-dark-grey-blue shadow-1">
  <div className={style.cardTitle + ' col-12'}>
    <span>Change Over Time By Property</span>

    <div className={style.selects}>
      <SelectFilters selectViewsShow={true} selectViews={selectViews} />
      <SelectFilters selectPlatformsShow={true} selectPlatforms={selectPlatforms} />
      <SelectFilters selectDateShow={true} selectDate={selectDate} />
    </div>
  </div>
  <div className="col-12">

  </div>
</div>
*/
}

export default compose(withConnect)(ChangeOverTime)
