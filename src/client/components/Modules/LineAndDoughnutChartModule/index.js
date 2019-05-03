import React from 'react'
import cx from 'classnames'
import { Module } from 'Components/Module'
import style from './style.scss'
import PercentageBarGraph from '../../Charts/PercentageBarGraph'
import LineChart from '../../LineChart/Chart'
import DoughnutChart from '../../Charts/DoughnutChart'

class LineAndDoughnutChartModule extends React.Component {
  render() {
    const percentageCol = cx(style.percentageCol)
    const {
      moduleKey,
      title,
      action,
      lineChartData,
      lineChartOptions,
      filters,
    } = this.props
    console.log(this.props)
    return (
      <Module
        moduleKey={moduleKey}
        title={title}
        action={action}
        filters={filters}
      >
        <div className="grid-collapse">
          <div className="col-12-no-gutters">
            <div className="col-8-no-gutters">
              <LineChart
                dataSet={lineChartData}
                width={740}
                height={291}
                options={lineChartOptions}
                backgroundColor="#21243b"
              />
            </div>
            <div className="col-4-no-gutters d-flex align-items-center justify-content-center">
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
                    'Animation 2',
                    'Stop Motion',
                    'Animation',
                    'Cinemagraph',
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
            <div className={style.scrollableContainer}>
              <div className={percentageCol} data-title="Live Action">
                <PercentageBarGraph
                  id={'percentageContainer-1'}
                  percentage={33.4}
                  color="#5292e5"
                />
              </div>
              <div className={percentageCol} data-title="Animation">
                <PercentageBarGraph
                  id={'percentageContainer-4'}
                  percentage={46.8}
                  color="#2fd7c4"
                />
              </div>
              <div className={percentageCol} data-title="Cinemagraph">
                <PercentageBarGraph
                  id={'percentageContainer-5'}
                  percentage={46.8}
                  color="#8562f3"
                />
              </div>
              <div className={percentageCol} data-title="Animation 2">
                <PercentageBarGraph
                  id={'percentageContainer-2'}
                  percentage={40.1}
                  color="#545b79"
                />
              </div>
              <div className={percentageCol} data-title="Stop Motion">
                <PercentageBarGraph
                  id={'percentageContainer-3'}
                  percentage={46.8}
                  color="#acb0be"
                />
              </div>
              <div className={percentageCol} data-title="Cinemagraph">
                <PercentageBarGraph
                  id={'percentageContainer-5'}
                  percentage={46.8}
                  color="#8562f3"
                />
              </div>
              <div className={percentageCol} data-title="Animation 2">
                <PercentageBarGraph
                  id={'percentageContainer-2'}
                  percentage={40.1}
                  color="#545b79"
                />
              </div>
              <div className={percentageCol} data-title="Stop Motion">
                <PercentageBarGraph
                  id={'percentageContainer-3'}
                  percentage={46.8}
                  color="#acb0be"
                />
              </div>
              <div className={percentageCol} data-title="Stop Motion">
                <PercentageBarGraph
                  id={'percentageContainer-3'}
                  percentage={46.8}
                  color="#acb0be"
                />
              </div>
            </div>
          </div>
        </div>
      </Module>
    )
  }
}

export default LineAndDoughnutChartModule
