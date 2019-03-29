import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import cx from 'classnames'
import style from './style.scss'
import SelectFilters from 'Components/SelectFilters'

import { options, wrapperBarOptions } from './chartOptions'

const barChartContainer = cx('shadow-1 col-12', style.panopticBarChart)
const barChartHeaderClass = cx('col-12 mt-24 mb-24', style.barChartHeader)
const barChartFooterClass = cx('col-12 mb-56', style.barChartFooter)
const barContainerClass = cx('col-12', style.barChartContainer)
const headerTitleClass = cx('font-secondary-second', style.title)
const referencesClass = cx('font-secondary-second', style.references)

import Module from 'Components/Module'

const PanopticBarChart = ({ data, callBack }) => {
  // console.log('callBack', callBack)
  const Chart = () => {
    return (
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
    )
  }

  return (
    <Module
      moduleKey="veli"
      title="Video Releases vs Engagement"
      action={callBack}
      filters={[
        { type: 'timeRange', selectKey: 'sda', placeHolder: 'place holder' },
        {
          type: 'aspectRatio',
          selectKey: 'dsadw',
          placeHolder: 'place holder',
        },
      ]}
    >
      VIDEO
    </Module>
  )
}

export default PanopticBarChart
