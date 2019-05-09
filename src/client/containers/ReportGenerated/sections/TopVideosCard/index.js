import React from 'react'
import cx from 'classnames'
import { randomKey } from 'Utils/index'
import StackedBarChart from 'Components/Charts/StackedBarChart'
import SelectFilters from 'Components/SelectFilters'
import style from './style.scss'

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

const TopVideosCard = ({
  chartData,
  selectResolution,
  handleSelectFilters,
}) => {

	let stackedChartData = chartData
	const labels = ["Facebook", "Instagram", "Twitter", "YouTube", "Pinterest"]
	const backgroundColors = ["#5292E5", "#8562F3", "#acb0be", "#2FD7C4", "#545B79"]

	stackedChartData.labels = ["360p", "480p", "720p", "1080p", "4k"]
	stackedChartData.datasets.map((el, i) => {
		stackedChartData.datasets[i].label = labels[i]
		stackedChartData.datasets[i].backgroundColor = backgroundColors[i]
	})

  return (
    <div className="grid-collapse">
      <div className={barChartContainer}>
        <div className={barChartHeaderClass}>
          <div className="col-4 text-bold">
            <p className={headerTitleClass}>
              Top Videos Over Time By Competitor
            </p>
          </div>
          <div className="col-8">
            <div className={style.selects}>
              <SelectFilters
                handleSelectFilters={handleSelectFilters}
                selectClasses={selectClasses}
                selectResolution={selectResolution}
                selectResolutionShow={true}
              />
            </div>
            <div className="clearFix" />
          </div>
        </div>
        <div className='col-12'>
          <StackedBarChart
            height={200}
            barData={stackedChartData}
            datasetKeyProvider={datasetKeyProvider()}
          />
        </div>
        <div className="col-12">
          <div className={referencesClass}>
            <div className={style.referenceItem}>
              <span className="bg-cool-blue" />
              Facebook
            </div>
            <div className={style.referenceItem}>
              <span className="bg-lighter-purple" />
              Instagram
            </div>
            <div className={style.referenceItem}>
              <span className="bg-coral-pink" />
              Twitter
            </div>
            <div className={style.referenceItem}>
              <span className="bg-cool-grey" />
              YouTube
            </div>
            <div className={style.referenceItem}>
              <span className="bg-dusk" />
              Pinterest
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopVideosCard
