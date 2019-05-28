import React from 'react'
import cx from 'classnames'
import { Module } from 'Components/Module'
import style from './style.scss'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import { Line } from 'react-chartjs-2'
import Scrubber from 'Components/Sliders/Scrubber'
import { ThemeContext } from 'ThemeContext/themeContext'

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
      customCallbackFunc,
    } = this.props
    const plugins = [
      {
        beforeDraw: function(chart, easing) {
          if (
            chart.config.options.chartArea &&
            chart.config.options.chartArea.backgroundColor
          ) {
            var ctx = chart.chart.ctx
            var chartArea = chart.chartArea

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
        beforeDatasetsDraw: function(chart) {
          if (chart.tooltip._active && chart.tooltip._active.length) {
            var activePoint = chart.tooltip._active[0],
              ctx = chart.ctx,
              x = activePoint.tooltipPosition().x,
              topY = chart.scales['y-axis-0'].top,
              bottomY = chart.scales['y-axis-0'].bottom
            // chart.config.options.customCallbackFunc()
            // draw line
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(x, topY)
            ctx.lineTo(x, bottomY)
            ctx.lineWidth = 5
            ctx.strokeStyle = '#fff'
            ctx.stroke()
            ctx.restore()
          }
        },
      },
    ]

    const percentageData = [
      {
        value: 33.5,
        key: 'Live Action',
        color: 'purple',
      },
      {
        value: 60.1,
        key: 'Animation',
        color: 'green',
      },
      {
        value: 72.5,
        key: 'Animation 2',
        color: 'blue',
      },
      {
        value: 50.2,
        key: 'Stop Motion',
        color: 'lightGrey',
      },
      {
        value: 85.3,
        key: 'Cinemagraph',
        color: 'grey',
      },
    ]
    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <Module
            moduleKey={moduleKey}
            title={title}
            action={action}
            filters={filters}
          >
            <div className="grid-collapse">
              <div className="col-12-no-gutters">
                <div className="col-8-no-gutters">
                  <Line
                    key={Math.random()}
                    data={lineChartData}
                    width={760}
                    height={291}
                    plugins={plugins}
                    options={{
                      ...lineChartOptions,
                      customCallbackFunc: customCallbackFunc,
                      chartArea: {
                        backgroundColor: colors.chartBackground,
                      },
                      scales: {
                        xAxes: [
                          {
                            ...lineChartOptions.scales.xAxes[0],
                            ticks: {
                              ...lineChartOptions.scales.xAxes[0].ticks,
                              fontColor: colors.labelColor,
                            },
                            gridLines: {
                              ...lineChartOptions.scales.xAxes[0].gridLines,
                              color: colors.chartStadiumBarBorder,
                            },
                          },
                        ],
                        yAxes: [
                          {
                            ...lineChartOptions.scales.yAxes[0],
                            ticks: {
                              ...lineChartOptions.scales.yAxes[0].ticks,
                              fontColor: colors.labelColor,
                            },
                            gridLines: {
                              ...lineChartOptions.scales.yAxes[0].gridLines,
                              color: colors.chartStadiumBarBorder,
                              zeroLineColor: colors.chartStadiumBarBorder,
                            },
                          },
                        ],
                      },
                    }}
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
              <div className="col-12-no-gutters">
								<Scrubber horizontal arrows>
                  <div className={style.percentageGraphContainer}>
                    {percentageData.map((chart, i) => (
                      <div className={percentageCol}>
                        <div className={style.chartSectionBadge}>
                          <span
                            style={{
                              background: colors.labelBackground,
                              color: colors.labelColor,
                              boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                            }}
                          >
                            {chart.key}
                          </span>
                        </div>
                        <PercentageBarGraph
                          key={Math.random()}
                          percentage={chart.value}
                          color={chart.color}
                        />
                      </div>
                    ))}
                  </div>
                </Scrubber>
              </div>
            </div>
          </Module>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default LineAndDoughnutChartModule
