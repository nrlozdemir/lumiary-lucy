import React from 'react'
import cx from 'classnames'
import Module from 'Components/Module'
import style from './style.scss'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import { Line } from 'react-chartjs-2'
import Scrubber from 'Components/Sliders/Scrubber'
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
  const percentageCol = cx(style.percentageCol)

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
      isEmpty={isEmpty}
      loading={loading}
    >
      <div className="grid-collapse">
        <div className="col-12-no-gutters">
          <div
            className={`col-8-no-gutters ${cx(style.contentVitalityChart)}`}
            data-legend="Content Vitality Score"
          >
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
          <div className="col-4-no-gutters d-flex align-items-center justify-content-center">
            <DoughnutChart
              width={270}
              height={270}
              cutoutPercentage={58}
              fillText="Total Percentage"
              dataLabelFunction="insertAfter"
              dataLabelInsert="%"
              labelPositionRight
              data={doughnutData}
            />
          </div>
        </div>
        <div className="col-12-no-gutters">
          <Scrubber horizontal arrows isEmpty={isEmpty}>
            <div className={style.percentageGraphContainer}>
              {percentageData &&
                percentageData.map((chart, idx) => (
                  <div className={percentageCol} key={`PTPF_percentage-${idx}`}>
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
  )
}

export default withTheme(LineAndDoughnutChartModule)
