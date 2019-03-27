import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectPanoptic } from 'Reducers/panoptic'

import style from 'Containers/Audience/style.scss';
import LineChart from 'Components/LineChart/Chart'
import SelectFilters from 'Components/SelectFilters';
import { lineChartOptions, lineChartData_DatasetOptions } from "./options";
import { chartCombineDataset } from "Utils";


function combineChartData(chartData) {
  return chartCombineDataset(
    chartData,
    lineChartData_DatasetOptions,
    {
      beforeDraw: function (chart, easing) {
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
    }
  )
}

class ChangeOverTime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectViews: '',
      selectPlatforms: '',
      selectDate: ''
    }
  }

  render() {
    const { selectViews, selectPlatforms, selectDate } = this.state;
    const { panoptic: { audienceData } } = this.props;

    if (!audienceData) return false

    return (
      <div className="grid-container mr-20 ml-20 mt-72 bg-dark-grey-blue shadow-1">
        <div className={style.cardTitle + ' col-12'}>
          <span>Change Over Time By Property</span>
          <div className={"d-flex align-items-center justify-space-between " + style.headerLabel}>
            <div className="d-flex align-items-center mr-32">
              <span className={style.redRound} />
              <p>Male</p>
            </div>
            <div className="d-flex align-items-center mr-32">
              <span className={style.duskRound} />
              <p>Female</p>
            </div>
          </div>
          <div className={style.selects}>
            <SelectFilters selectViewsShow={true} selectViews={selectViews} />
            <SelectFilters selectPlatformsShow={true} selectPlatforms={selectPlatforms} />
            <SelectFilters selectDateShow={true} selectDate={selectDate} />
          </div>
        </div>
        <div className="col-12">
          <LineChart
            backgroundColor="#242b49"
            dataSet={() => combineChartData(audienceData.lineChartData)}
            width={1070}
            height={291}
            options={lineChartOptions}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  panoptic: makeSelectPanoptic(),
})

const withConnect = connect(
  mapStateToProps,
  null
)

export default compose(withConnect)(ChangeOverTime)
