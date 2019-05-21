import React from 'react'
import style from './style.scss'
import classnames from 'classnames'
import StackedPercentageChart from 'Components/Charts/StackedPercentageChart'

const pdata = {"datasets": [{"data": [10, 12, 14, 16, 18, 20, 22, 24, 26,
	28, 30, 32, 34, 36, 40, 48, 58, 70, 80,
	88, 94, 98,
	100,
	96, 90, 80,
	70, 60, 54, 48, 42, 36, 34, 32, 30, 28,
	26, 24, 22, 20, 18]}]}

const PercentageBarGraph = ({
  percentage,
  disableLabels = false,
  color,
  id,
  width = 238,
  height = 44,
  backgroundColor
}) => {
  const active = Math.round((60 / 100) * percentage)
  return (
    <div className={id}>
      <div className={style.percentageContainer}>
        {!disableLabels && <div className={style.percentage}>{percentage}</div>}
        <div className={classnames(style.percentageGraph)}>
          <StackedPercentageChart
            key={Math.random()}
            width={width}
            height={height}
            chartType= 'percentageGraph'
            dataSet={
              {
                labels: pdata.datasets[0].data,
                datasets: pdata.datasets
              }
            }
            removeTooltip={true}
            removePointRadius={true}
            xAxesFlatten={false}
            flattenFirstSpace={0}
            flattenLastSpace={0}
            options={{
              responsive: false,
							color: color,
							tickColor: 'black',
              layout: {
                padding: {
                  bottom: -10
                }
              },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                      lineWidth: 1,
                      drawBorder: false,
                      drawTicks: false,
                      drawOnChartArea: false
                    },
                    ticks: {
                      display: false,
                      beginAtZero: true,
                      padding: 0,
                      stepSize: 1
                    }
                  }
                ],
                yAxes: [
                  {
                    gridLines: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                      drawOnChartArea: false
                    },
                    ticks: {
                      display: false,
                      beginAtZero: true,
                      padding: 0,
                      max: 100,
                      stepSize: 10,
                    }
                  }
                ]
              }
            }}
          />
        </div>
				{!disableLabels && <div className={style.cvScoreLabel}>CV Score</div>}
      </div>
    </div>
  )
}

export default PercentageBarGraph
