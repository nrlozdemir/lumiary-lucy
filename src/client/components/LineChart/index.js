import React, { Component } from 'react';
import classnames from 'classnames';
import Chart from './Chart';
import style from './style.scss';

class LineChart extends Component {
  render() {
    const lineChartContainer = classnames('shadow-1 col-12 mt-72', style.lineChartContainer);
    const lineChartHeaderClass = classnames('col-12 mt-48 mb-48', style.lineChartHeader);
    return (
      <div className={lineChartContainer}>
        <div className={lineChartHeaderClass}>
          <div className="col-3 text-bold">
              <p className={style.title}>Video Analytics</p>
          </div>
            <div className="col-5">
            <div className={style.references}>
              <div className="col-4">
                <span className="bg-cool-blue" />
                Video Views
              </div>
              <div className="col-4">
                <span className="bg-lighter-purple" />
                Engagement Rate
              </div>
              <div className="col-4">
                <span className="bg-coral-pink" />
                Completion Rate
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <Chart />
        </div>
      </div>
    );
  }
}

export default LineChart;
