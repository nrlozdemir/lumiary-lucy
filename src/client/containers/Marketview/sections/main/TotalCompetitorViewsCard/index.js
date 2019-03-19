import React, { Component } from 'react'
import classnames from 'classnames'

import SelectFilters from 'Components/SelectFilters'
import TotalCompetitorViewsChart from 'Components/Charts/MarketView/TotalCompetitorViewsChart'
import style from 'Containers/Marketview/style.scss'
import componentStyle from 'Containers/Marketview/sections/main/TotalCompetitorViewsCard/style.scss'

const selectClasses = classnames('custom-select', style.selectStyles)

class TotalCompetitorViewsCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  generateSelectProps(selects) {
    const props = {}

    for (const item of selects) {
      props[`select${item}`] = this.state[item]
      props[`select${item}Show`] = true
    }

    return props
  }

  render() {
    const {
      containerClass = '',
      totalCompetitorViewsData,
      tickOptions,
      title = 'Total Competitor Views By Duration',
      titleLabels,
      footerLabels,
      width,
      height,
      selects,
    } = this.props
    const chartContainer = classnames(
      'shadow-1 col-12-gutter-20 mb-48',
      style.chartContainer,
      containerClass
    )

    const selectProps = this.generateSelectProps(selects || [])

    return (
      <div className={chartContainer}>
        <div className={style.cardTitle}>
          <span>{title}</span>
          {titleLabels && (
            <div
              className={classnames(style.colorListHorizontal, style.colorList)}
            >
              {titleLabels.map((title, index) => (
                <div key={index} className={style.colorListItem}>
                  {title}
                </div>
              ))}
            </div>
          )}
          {selects && (
            <div className={componentStyle.selectContainer}>
              <SelectFilters
                handleSelectFilters={this.handleSelectFilters}
                selectClasses={selectClasses}
                {...selectProps}
              />
            </div>
          )}
        </div>
        <TotalCompetitorViewsChart
          barDurationData={totalCompetitorViewsData}
          tickOptions={tickOptions}
          width={width}
          height={height}
        />
        <div className="col-12 d-flex justify-content-center mt-48 align-items-center">
          {footerLabels && (
            <div
              className={classnames(style.colorListHorizontal, style.colorList)}
            >
              {footerLabels.map((title, index) => (
                <div key={index} className={style.colorListItem}>
                  {title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default TotalCompetitorViewsCard
