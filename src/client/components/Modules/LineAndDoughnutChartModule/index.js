import React from 'react'
import cx from 'classnames'
import { Module } from 'Components/Module'
import style from './style.scss'
import PercentageBarGraph from '../../Charts/PercentageBarGraph'
import LineChart from '../../LineChart/Chart'
import DoughnutChart from '../../Charts/DoughnutChart'

const LineAndDoughnutChartModule = ({ moduleKey, title, action, filters }) => {
  const percentageCol = cx('col-4', style.percentageCol)
  return (
    <Module
      moduleKey={moduleKey}
      title={title}
      action={action}
      filters={[
        {
          type: 'platform',
          selectKey: 'platform',
          placeHolder: 'Platforms',
          defaultValue: 'facebook',
        },
      ]}
    >
      <div className="grid-collapse">
        <div className="col-12">
          <div className="col-7">
            <LineChart />
          </div>
          <div className="col-5">
            <DoughnutChart />
          </div>
        </div>
        <div className="col-12">
          <div className={percentageCol} data-title="Male Audience">
            <PercentageBarGraph
              id={'percentageContainer-1'}
              percentage={33.4}
              color="#d0506c"
            />
          </div>
          <div className={percentageCol} data-title="Your Library">
            <PercentageBarGraph
              id={'percentageContainer-2'}
              percentage={40.1}
              color="#8567f0"
            />
          </div>
          <div className={percentageCol} data-title="Female Audience">
            <PercentageBarGraph
              id={'percentageContainer-3'}
              percentage={46.8}
              color="#51adc0"
            />
          </div>
        </div>
      </div>
    </Module>
  )
}

export default LineAndDoughnutChartModule
