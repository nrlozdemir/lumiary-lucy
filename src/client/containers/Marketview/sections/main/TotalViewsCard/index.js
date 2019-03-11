import React, { Component } from 'react'
import classnames from 'classnames'

import TotalViewsBarChart from 'Components/Charts/MarketView/TotalViewsBarChart'
import TotalViewsDoughnutChart from 'Components/Charts/MarketView/TotalViewsDoughnutChart'
import SelectFilters from 'Components/SelectFilters'
import style from 'Containers/Marketview/style.scss'

class TotalViewsChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { selectPlatforms, selectLikes, selectDate } = this.state
    const {
      totalViewsData: { barData, doughnutData },
    } = this.props
    const chartContainer = classnames(
      'shadow-1 col-12-gutter-20 mb-48',
      style.chartContainer
    )

    return (
      <div className={chartContainer}>
        <div className={style.cardTitle}>
          <span>Total Views For All Platforms In The Past Month</span>
          <div className={style.selects}>
            <SelectFilters
              handleSelectFilters={this.handleSelectFilters}
              selectPlatforms={selectPlatforms}
              selectLikes={selectLikes}
              selectDate={selectDate}
              selectPlatformsShow={true}
              selectLikesShow={true}
              selectDateShow={true}
            />
          </div>
        </div>
        <div className="grid-collapse">
          <div className="col-6">
            {barData && <TotalViewsBarChart barData={barData} />}
          </div>
          <div className="col-6">
            {doughnutData && (
              <TotalViewsDoughnutChart doughnutData={doughnutData} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default TotalViewsChart
