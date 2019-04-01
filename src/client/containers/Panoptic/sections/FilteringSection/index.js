import React, { Component } from 'react'
import classnames from 'classnames'
import 'chartjs-plugin-datalabels'
import SelectFilters from 'Components/SelectFilters'
import style from './style.scss'

import DoughnutChart from 'Components/Charts/Panoptic/DoughnutChart'
import VerticalStackedBarChart from 'Components/Charts/Panoptic/VerticalStackedBarChart'

class PanopticFilteringSection extends Component {
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
    const {
      data: { doughnutData, stackedChartData, doughnutRoundData },
    } = this.props
    const {
      selectDate,
      selectDuration,
      selectLikes,
      selectPlatforms,
    } = this.state
    return (
      <div className="col-12 shadow-1 mt-72 bg-dark-grey-blue">
        <div className={style.radialChartsContainer}>
          <div className={style.temperatureHeader}>
            <div>
              <h2>Engagement By Property Over Time</h2>
            </div>
            <div className={style.inputGroup}>
              <form className={style.form}>
                <SelectFilters
                  handleSelectFilters={this.handleSelectFilters}
                  selectClasses="custom-select"
                  selectDate={selectDate}
                  selectDuration={selectDuration}
                  selectLikes={selectLikes}
                  selectPlatforms={selectPlatforms}
                  selectDateShow={true}
                  selectDurationShow={true}
                  selectLikesShow={true}
                  selectPlatformsShow={true}
                />
              </form>
            </div>
          </div>
          <div className="d-flex align-items-center justify-space-between ph-48">
            <div className={style.radialAndStackChartWrapper}>
              <div>
                <DoughnutChart data={doughnutData.average} />
              </div>
              <div>
                {doughnutRoundData &&
                  doughnutRoundData.map((roundData, index) => (
                    <div
                      className={classnames(
                        'd-flex',
                        'align-items-center',
                        style.lables
                      )}
                      key={index}
                    >
                      <span
                        className={style.round}
                        style={{ backgroundColor: `${roundData.color}` }}
                      />
                      <span className={style.secondsText}>
                        {roundData.data}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className={style.stackedChart}>
              <VerticalStackedBarChart data={stackedChartData} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PanopticFilteringSection
