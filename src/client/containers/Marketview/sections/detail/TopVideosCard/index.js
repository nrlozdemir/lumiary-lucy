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

const defaultReferences = [
  {
    className: 'bg-cool-blue',
    text: 'Barstool Sports',
  },
  {
    className: 'bg-lighter-purple',
    text: 'SB Nation',
  },
  {
    className: 'bg-coral-pink',
    text: 'ESPN',
  },
  {
    className: 'bg-cool-grey',
    text: 'Scout Media',
  },
  {
    className: 'bg-dusk"',
    text: 'Fansided',
  },
]

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

  generateSelectProps(selects) {
    const props = {}

    for (const item of selects) {
      props[`select${item}`] = this.state[`select${item}`]
      props[`select${item}Show`] = true
    }

    return props
  }

  render() {
    const {
      chartData,
      title = 'Top Videos Over Time By Competitor',
      references = defaultReferences,
      selects = ['Resolution', 'Likes', 'Date'],
    } = this.props

    const selectProps = this.generateSelectProps(selects);

    return (
      <div className="grid-collapse">
        <div className={barChartContainer}>
          <div className={barChartHeaderClass}>
            <div className="col-4 text-bold">
              <p className={headerTitleClass}>{title}</p>
            </div>
            <div className="col-8">
              <div className={style.selects}>
                <SelectFilters
                  handleSelectFilters={this.handleSelectFilters}
                  selectClasses={selectClasses}
                  {...selectProps}
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
              {references.map((ref) => (
                <div className={style.referenceItem}>
                  <span className={ref.className} />
                  {ref.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TopVideosCard
