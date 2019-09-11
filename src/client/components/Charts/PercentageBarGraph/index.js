import React from 'react'
import style from './style.scss'
import classnames from 'classnames'
import StackedPercentageChart from 'Components/Charts/StackedPercentageChart'
const { fromJS } = require('immutable')

const createDataset = (percentage) => {
  const makeLength = 41
  const maxCurrentIndex = Math.round((makeLength / 100) * percentage)
  const range = {
    start: 16,
    end: 100,
  }

  const currentIndexBeforeArray = [...Array(maxCurrentIndex)].map(
    (v, i, arr) => {
      const stepSize =
        ((range.end - range.start) / arr.length) * ((1 / arr.length) * i)

      return range.start + i * stepSize
    }
  )

  const currentIndexAfterArray = [
    ...Array(
      makeLength - maxCurrentIndex - 1 >= 0
        ? makeLength - maxCurrentIndex - 1
        : 0
    ),
  ].map((v, i, arr) => {
    const stepSize = (range.end - range.start) / arr.length

    return (range.end - i * stepSize) * ((1 / arr.length) * (arr.length - i))
  })

  return [...currentIndexBeforeArray, ...currentIndexAfterArray, range.start]
}

const PercentageBarGraph = ({
  percentage,
  disableLabels = false,
  color,
  id,
  width = 238,
  height = 44,
  barWidth = 3,
  barSpaceWidth = 2,
  options = {},
}) => {
  if (!percentage || percentage === 'NaN') return null

  const percentageData = [
    {
      data: createDataset(percentage),
    },
  ]

  return (
    <div className={style.percentageContainer}>
      {!disableLabels && <div className={style.percentage}>{percentage}</div>}
      <div
        className={classnames(style.percentageGraph, {
          [style.noLabel]: disableLabels,
        })}
      >
        <StackedPercentageChart
          key={Math.random()}
          width={width}
          height={height}
          chartType="percentageGraph"
          barWidth={barWidth}
          barSpaceWidth={barSpaceWidth}
          dataSet={{
            labels: percentageData[0].data,
            datasets: percentageData,
          }}
          removeTooltip={true}
          removePointRadius={true}
          xAxesFlatten={false}
          flattenFirstSpace={0}
          flattenLastSpace={0}
          options={fromJS({
            responsive: false,
            color: color,
            layout: {
              padding: {
                bottom: -10,
              },
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    lineWidth: 1,
                    drawBorder: false,
                    drawTicks: false,
                  },
                  ticks: {
                    display: false,
                    beginAtZero: true,
                    padding: 0,
                    stepSize: 1,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    drawTicks: false,
                  },
                  ticks: {
                    display: false,
                    beginAtZero: true,
                    padding: 0,
                    max: 100,
                    stepSize: 10,
                  },
                },
              ],
            },
          }).mergeDeep(options)}
        />
      </div>
      {!disableLabels && <div className={style.cvScoreLabel}>CV Score</div>}
    </div>
  )
}

export default PercentageBarGraph
