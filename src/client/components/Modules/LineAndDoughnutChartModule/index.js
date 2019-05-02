import React from 'react'
import cx from 'classnames'
import { Module } from 'Components/Module'
import style from './style.scss'
import PercentageBarGraph from '../../Charts/PercentageBarGraph'
import LineChart from '../../LineChart/Chart'
import DoughnutChart from '../../Charts/DoughnutChart'

const LineAndDoughnutChartModule = ({ moduleKey, title, action }) => {
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
          <div className="col-8">
            <LineChart
              dataSet={{
                labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                datasets: [
                  { data: [50, 86, 17, 89, 15, 94, 34] },
                  { data: [29, 43, 61, 83, 40, 67, 78] },
                ],
              }}
            />
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <DoughnutChart
              width={270}
              height={270}
              cutoutPercentage={58}
              fillText="Total Percentage"
              dataLabelFunction="insertAfter"
              dataLabelInsert="%"
              labelPositionRight
              data={{
                labels: [
                  'Live Action',
                  'Cinemagraph',
                  'Stop Motion',
                  'Animation',
                  'Animation 2',
                ],
                datasets: [
                  {
                    data: [5, 15, 25, 10, 45],
                    backgroundColor: [
                      '#5292e5',
                      '#545b79',
                      '#acb0be',
                      '#2fd7c4',
                      '#8562f3',
                    ],
                    hoverBackgroundColor: [
                      '#5292e5',
                      '#545b79',
                      '#acb0be',
                      '#2fd7c4',
                      '#8562f3',
                    ],
                  },
                ],
              }}
            />
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
