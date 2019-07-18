import React from 'react'
import cx from 'classnames'
import Module from 'Components/Module'
import style from './style.scss'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import { Line } from 'react-chartjs-2'
import { withTheme } from 'ThemeContext/withTheme'

const LineAndDoughnutChartModule = ({
  moduleKey,
  title,
  action,
  lineChartData,
  lineChartOptions,
  filters,
  isEmpty,
  loading = false,
  doughnutData,
  percentageData,
  customCallbackFunc,
  themeContext: { colors },
}) => {
  const percentageCol = cx('col-4-no-gutters', style.percentageCol)

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
          ctx.strokeStyle = '#000'
          ctx.stroke()
          ctx.restore()
        }
      },
    },
  ]

  return (
    <Module
      moduleKey={moduleKey}
      title={title}
      action={action}
      filters={filters}
      isEmpty={false}
      loading={loading}
    >
      <div className="grid-collapse">
        <div className="col-12">
          <div
            className={`${cx(style.contentVitalityChart)}`}
            data-legend="Content Vitality Score"
          >
            <Line
              key={Math.random()}
              data={lineChartData}
              width={1077}
              height={291}
              plugins={plugins}
              options={{
                ...lineChartOptions,
                customCallbackFunc: customCallbackFunc,
                chartArea: {
                  backgroundColor: colors.lineChartBackgroundColor,
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
                        color: colors.lineChartGridColor,
                        zeroLineColor: colors.lineChartGridColor,
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
                        color: colors.lineChartGridColor,
                        zeroLineColor: colors.lineChartGridColor,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className={percentageCol}>
            <div
              className={style.legend}
              style={{
                background: colors.labelBackground,
                color: colors.labelColor,
                boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
              }}
            >
              Live Action
            </div>
            <div
              className={style.divider}
              style={{
                background: colors.moduleBorder,
              }}
            />

            <DoughnutChart
              width={140}
              height={140}
              displayDataLabels={false}
              cutoutPercentage={80}
              datasetsBorderWidth={0}
              removeTooltip
              addAverage
              data={{
                datasets: [
                  {
                    borderColor: '#f3f6f9',
                    data: [10, 90],
                    backgroundColor: ['#5292e5', '#acb0be'],
                    hoverBackgroundColor: ['#5292e5', '#acb0be'],
                  },
                ],
                labels: ['a', 'b'],
              }}
            />
            <p className={style.centerText}>
              90.1 <span>CV Score</span>
            </p>
            <p className={style.doughnutChartText}>
              The average male scores <b>10</b> points <b>below</b> your library
              average on <b>Facebook</b>
            </p>
          </div>
        </div>
        <div className={percentageCol}>
          <div
            className={style.legend}
            style={{
              background: colors.labelBackground,
              color: colors.labelColor,
              boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
            }}
          >
            Live Action
          </div>
          <div
            className={style.divider}
            style={{
              background: colors.moduleBorder,
            }}
          />

          <DoughnutChart
            width={140}
            height={140}
            displayDataLabels={false}
            cutoutPercentage={80}
            datasetsBorderWidth={0}
            removeTooltip
            addAverage
            data={{
              datasets: [
                {
                  borderColor: '#f3f6f9',
                  data: [90.9, 9.1],
                  backgroundColor: ['#5292e5', '#acb0be'],
                  hoverBackgroundColor: ['#5292e5', '#acb0be'],
                },
              ],
              labels: ['a', 'b'],
            }}
          />
          <p className={style.centerText}>
            90.1 <span>CV Score</span>
          </p>
          <p className={style.doughnutChartText}>
            The average male scores <b>10</b> points <b>below</b> your library
            average on <b>Facebook</b>
          </p>
        </div>
        <div className={percentageCol}>
          <div
            className={style.legend}
            style={{
              background: colors.labelBackground,
              color: colors.labelColor,
              boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
            }}
          >
            Live Action
          </div>
          <div
            className={style.divider}
            style={{
              background: colors.moduleBorder,
            }}
          />

          <DoughnutChart
            width={140}
            height={140}
            displayDataLabels={false}
            cutoutPercentage={80}
            datasetsBorderWidth={0}
            removeTooltip
            addAverage
            data={{
              datasets: [
                {
                  borderColor: '#f3f6f9',
                  data: [10, 90],
                  backgroundColor: ['#5292e5', '#acb0be'],
                  hoverBackgroundColor: ['#5292e5', '#acb0be'],
                },
              ],
              labels: ['a', 'b'],
            }}
          />
          <p className={style.centerText}>
            90.1 <span>CV Score</span>
          </p>
          <p className={style.doughnutChartText}>
            The average male scores <b>10</b> points <b>below</b> your library
            average on <b>Facebook</b>
          </p>
        </div>
      </div>
    </Module>
  )
}

export default withTheme(LineAndDoughnutChartModule)
