import React from 'react'
import cx from 'classnames'
import { randomKey } from 'Utils/index'
import StackedBarChart from 'Components/Charts/StackedBarChart'
import Module from 'Components/Module'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

const barChartContainer = cx(
  'shadow-1 col-12-gutter-20 mb-48',
  style.marketViewTopVideos
)
const barChartHeaderClass = cx('col-12 mt-48 mb-48', style.barChartHeader)
const headerTitleClass = cx('font-secondary-first text-bold', style.title)
const selectClasses = cx('custom-select', style.selectStyles)
const referencesClass = cx('font-secondary-second', style.references)

const datasetKeyProvider = () => {
  return randomKey(5)
}

const TopVideosCard = ({ chartData }) => {
  let stackedChartData = chartData
  const labels = ['Facebook', 'Instagram', 'Twitter', 'YouTube']
  const backgroundColors = ['#2FD7C4', '#8562F3', '#5292E5', '#acb0be']

  stackedChartData.labels = ['360p', '480p', '720p', '1080p', '4k']
  stackedChartData.datasets.map((el, i) => {
    stackedChartData.datasets[i].label = labels[i]
    stackedChartData.datasets[i].backgroundColor = backgroundColors[i]
  })

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <Module
          moduleKey={'Reports/TopVideosCard'}
          title={'Top Videos Over Time By Competitor'}
          filters={[
            {
              type: 'resolution',
              selectKey: 'resolutionOption',
              placeHolder: 'Resolution',
            },
          ]}
          references={[
            {
              className: 'bg-cool-blue',
              text: 'Facebook',
            },
            {
              className: 'bg-lighter-purple',
              text: 'Instagram',
            },
            {
              className: 'bg-coral-pink',
              text: 'Twitter',
            },
            {
              className: 'bg-cool-grey',
              text: 'YouTube',
            },
          ]}
        >
          <StackedBarChart
            height={200}
            barData={stackedChartData}
            datasetKeyProvider={datasetKeyProvider()}
          />
        </Module>
      )}
    </ThemeContext.Consumer>
  )
}

export default TopVideosCard
