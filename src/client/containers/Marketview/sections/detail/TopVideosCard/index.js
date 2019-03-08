import React, { Component } from 'react'
import cx from 'classnames'
import { randomKey } from 'Utils/index'

import TopVideosChart from 'Components/Charts/MarketView/TopVideos'
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
const barChartClass = cx('col-12', style.barChartContainer)

class TopVideosCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  datasetKeyProvider() {
    return randomKey(5)
  }

  render() {
    const { selectResolution, selectLikes, selectDate } = this.state
    const { chartData } = this.props
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
                  handleSelectFilters={this.handleSelectFilters}
                  selectClasses={selectClasses}
                  selectResolution={selectResolution}
                  selectLikes={selectLikes}
                  selectDate={selectDate}
                  selectResolutionShow={true}
                  selectLikesShow={true}
                  selectDateShow={true}
                />
              </div>
              <div className="clearFix" />
            </div>
          </div>
          <div className={barChartClass}>
            <TopVideosChart
              chartData={chartData}
              datasetKeyProvider={this.datasetKeyProvider}
            />
          </div>
          <div className="col-12">
            <div className={referencesClass}>
              <div className={style.referenceItem}>
                <span className="bg-cool-blue" />
                Barstool Sports
              </div>
              <div className={style.referenceItem}>
                <span className="bg-lighter-purple" />
                SB Nation
              </div>
              <div className={style.referenceItem}>
                <span className="bg-coral-pink" />
                ESPN
              </div>
              <div className={style.referenceItem}>
                <span className="bg-cool-grey" />
                Scout Media
              </div>
              <div className={style.referenceItem}>
                <span className="bg-dusk" />
                Fansided
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TopVideosCard
