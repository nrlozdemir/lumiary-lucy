import React, { Component } from 'react'
import cx from 'classnames'
import { Bar } from 'react-chartjs-2'
import { randomKey } from 'Utils/index'

import SelectFilters from 'Components/SelectFilters'
import style from './style.scss'
import { chartOptions } from './options'

const barChartContainer = cx(
  'shadow-1 col-12 mt-72 mb-72',
  style.marketViewTopVideos
)
const barChartHeaderClass = cx('col-12 mt-48 mb-48', style.barChartHeader)
const headerTitleClass = cx('font-secondary-first text-bold', style.title)
const selectClasses = cx('custom-select', style.selectStyles)
const referencesClass = cx('font-secondary-second', style.references)
const barChartClass = cx('col-12', style.barChartContainer)

class TopVideosChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  datasetKeyProvider() {
    return randomKey(5)
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { selectDate, selectPercent, selectResolution } = this.state
    const { chartData } = this.props
    return (
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
                selectDate={selectDate}
                selectPercent={selectPercent}
                selectPercentShow={true}
                selectResolutionShow={true}
                selectDateShow={true}
              />
            </div>
            <div className="clearFix" />
          </div>
        </div>
        <div className={barChartClass}>
          <Bar
            height={80}
            backgroundColor="#242b49"
            data={chartData}
            datasetKeyProvider={this.datasetKeyProvider}
            options={{
              ...chartOptions,
              chartArea: {
                backgroundColor: '#fff',
              },
              plugins: {
                datalabels: false,
              },
            }}
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
    )
  }
}

export default TopVideosChart
