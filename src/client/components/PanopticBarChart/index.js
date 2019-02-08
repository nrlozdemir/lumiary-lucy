import React, { Component } from 'react';
import { Bar } from "react-chartjs-2";
import cx from 'classnames';
import style from './style.scss';

import { barChartData, options, wrapperBarOptions } from './dummyData';

class PanopticBarChart extends Component {
  render() {
    const barChartContainer = cx('shadow-1 col-12 mt-72 mb-72', style.panopticBarChart);
    const barChartHeaderClass = cx('col-12 mt-24 mb-24', style.barChartHeader);
    const barContainerClass = cx('col-12', style.barChartContainer);
    const chartSectionClass = cx('col-3', style.chartSection);
    const headerTitleClass = cx('font-secondary-first text-bold', style.title);
    const headerDescClass = cx('font-secondary-second', style.desc);
    const referencesClass = cx('font-secondary-second', style.references);
    return (
      <div className={barChartContainer}>
        <div className={barChartHeaderClass}>
          <div className="col-4 text-bold">
            <p className={headerTitleClass}>Video Releases vs Performance</p>
            <p className={headerDescClass}>Aggregated by Day of the Week</p>
          </div>
          <div className="col-3">
            <div className={referencesClass}>
              <div className={style.referenceItem}>
                <span className="bg-cool-blue" />
                Likes
              </div>
              <div className={style.referenceItem}>
                <span className="bg-coral-pink" />
                Videos Released
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className={style.headerRight}>
              <span className={style.strong}>Likes</span>
              <span className={style.light}>for</span>
              <span className={style.strong}>Facebook</span>
              <span className={style.light}>in</span>
              <span className={style.strong}>Past Mont</span>
              <div className="clearFix"></div>
            </div>
          </div>
        </div>
        {/* bar charts */}
        <div className={barContainerClass}>
          <div className={style.wrapperBarChart}>
            <Bar data={barChartData} options={wrapperBarOptions}/>
          </div>
          <div className={style.barChartBackground}></div>
          <div className={style.groupChartsWrapper}>
            <div className="col-3">
              <div className={style.chartSection}>
                <Bar data={barChartData} options={options}/>
              </div>
              <div className={style.chartSectionBadge}>
                <span>Live Action</span>
              </div>
            </div>
            <div className="col-3">
              <div className={style.chartSection}>
                <Bar data={barChartData} options={options}/>
              </div>
              <div className={style.chartSectionBadge}>
                <span>Stop Motion</span>
              </div>
            </div>
            <div className="col-3">
              <div className={style.chartSection}>
                <Bar data={barChartData} options={options}/>
              </div>
              <div className={style.chartSectionBadge}>
                <span>Cinemagraph</span>
              </div>
            </div>
            <div className="col-3">
              <div className={style.chartSection}>
                <Bar data={barChartData} options={options}/>
              </div>
              <div className={style.chartSectionBadge}>
                <span>Stop Motion</span>
              </div>
            </div>
          </div>
        </div>
        {/* bar charts */}
      </div>
    );
  }
}

export default PanopticBarChart;
