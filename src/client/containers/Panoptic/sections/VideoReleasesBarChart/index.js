import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import cx from 'classnames'
import style from './style.scss'
import SelectFilters from 'Components/SelectFilters'

import { options, wrapperBarOptions } from './chartOptions'

const barChartContainer = cx('shadow-1 col-12 mt-72', style.panopticBarChart)
const barChartHeaderClass = cx('col-12 mt-24 mb-24', style.barChartHeader)
const barChartFooterClass = cx('col-12 mb-56', style.barChartFooter)
const barContainerClass = cx('col-12', style.barChartContainer)
const headerTitleClass = cx('font-secondary-first text-bold', style.title)
const referencesClass = cx('font-secondary-second', style.references)

const PanopticBarChart = ({
  data,
  selectLikes,
  selectPlatforms,
  selectDate,
  handleSelectFilters,
}) => {
  return (
    <div className={barChartContainer}>
      <div className={barChartHeaderClass}>
        <div className="col-6 text-bold">
          <p className={headerTitleClass}>Video Releases vs Engagement</p>
        </div>
        <div className="col-6">
          <div className={style.selects}>
            <SelectFilters
              handleSelectFilters={handleSelectFilters}
              selectDate={selectDate}
              selectDateShow={true}
              selectLikes={selectLikes}
              selectLikesShow={true}
              selectPlatforms={selectPlatforms}
              selectPlatformsShow={true}
            />
          </div>
        </div>
      </div>
      {/* bar charts */}
      <div className={barContainerClass}>
        <div className={style.wrapperBarChart}>
          <Bar data={data} options={wrapperBarOptions} />
        </div>
        <div className={style.barChartBackground} />
        <div className={style.groupChartsWrapper}>
          <div className="col-3">
            <div className={style.chartSection}>
              <Bar data={data} options={options} />
            </div>
            <div className={style.chartSectionBadge}>
              <span>Live Action</span>
            </div>
          </div>
          <div className="col-3">
            <div className={style.chartSection}>
              <Bar data={data} options={options} />
            </div>
            <div className={style.chartSectionBadge}>
              <span>Stop Motion</span>
            </div>
          </div>
          <div className="col-3">
            <div className={style.chartSection}>
              <Bar data={data} options={options} />
            </div>
            <div className={style.chartSectionBadge}>
              <span>Cinemagraph</span>
            </div>
          </div>
          <div className="col-3">
            <div className={style.chartSection}>
              <Bar data={data} options={options} />
            </div>
            <div className={style.chartSectionBadge}>
              <span>Stop Motion</span>
            </div>
          </div>
        </div>
      </div>
      {/* bar charts */}
      <div className={barChartFooterClass}>
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
    </div>
  )
}

export default PanopticBarChart
