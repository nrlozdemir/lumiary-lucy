import React, { Component } from 'react'
import cx from 'classnames'
import { Bar } from 'react-chartjs-2'
import { randomKey } from 'Utils/index'

import Select from 'Components/Form/Select'
import style from './style.scss'
import { chartOptions } from './options'

const barChartContainer = cx(
  'd-flex flex-column shadow-1 mt-72 mb-72',
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

  handleChange = (selectedOption, name) => {
    this.setState({ [name]: selectedOption })
  }

  datasetKeyProvider() {
    return randomKey(5)
  }

  render() {
    const { resolution, views, time } = this.state
    const { chartData } = this.props
    return (
      <div className={barChartContainer}>
        <div className={barChartHeaderClass}>
          <div className="col-4 text-bold">
            <p className={headerTitleClass}>Top Videos Over Time By Platform</p>
          </div>
          <div className="col-8">
            <div className={style.selects}>
              <Select
                name="likes"
                customClass={selectClasses}
                placeholder="Resolution"
                value={resolution || ''}
                onChange={(option) => this.handleChange(option, 'resolution')}
                options={[
                  { value: '360', label: '360' },
                  { value: '480', label: '480' },
                  { value: '720p', label: '720p' },
                  { value: '1080p', label: '1080p' },
                ]}
              />
              <Select
                name="date"
                customClass={selectClasses}
                placeholder="Views"
                value={views || ''}
                onChange={(option) => this.handleChange(option, 'views')}
                options={[
                  { value: '25', label: '%25' },
                  { value: '50', label: '%50' },
                  { value: '75', label: '%75' },
                  { value: '100', label: '%100' },
                ]}
              />
              <Select
                name="date"
                customClass={selectClasses}
                placeholder="Time"
                value={time || ''}
                onChange={(option) => this.handleChange(option, 'time')}
                options={[
                  { value: 'Past Month', label: 'Past Month' },
                  { value: 'Past Year', label: 'Past Year' },
                ]}
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
