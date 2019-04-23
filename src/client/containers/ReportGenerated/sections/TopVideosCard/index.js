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
            barData={chartData}
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
