import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'

import { chartCombineDataset } from 'Utils'
import style from './style.scss'
import {
  selectOptions,
  lineChartOptions,
  lineChartData_DatasetOptions,
} from './options'

import SelectFilters from 'Components/SelectFilters'
import LineChart from 'Components/LineChart/Chart'
import PointerCard from 'Components/PointerCard'
import DoughnutChart from 'Components/Charts/LibraryDetail/Doughnut'

class LibraryDetailDoughnutChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCard: false,
    }
  }

  combineChartData(chartData) {
    return chartCombineDataset(chartData, lineChartData_DatasetOptions, {
      beforeDraw: function(chart, easing) {
        if (
          chart.config.options.chartArea &&
          chart.config.options.chartArea.backgroundColor
        ) {
          const ctx = chart.chart.ctx
          const chartArea = chart.chartArea

          ctx.save()
          ctx.fillStyle = chart.config.options.chartArea.backgroundColor
          ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
          )
          ctx.restore()
        }
      },
    })
  }

  changeVisibilityDoughnut(selectedCard = false) {
    this.setState((prevState) => ({ selectedCard }))
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const {
      isDoughnutVisible,
      selectDate,
      selectLikes,
      selectedCard,
    } = this.state
    const { doughnutData, lineChartData } = this.props
    let selectedCardData = null
    if (!!selectedCard || selectedCard === 0) {
      selectedCardData = doughnutData.find((item, i) => i === selectedCard)
    }
    return (
      <div className="col-12 shadow-1 mt-48 bg-dark-grey-blue">
        <div className={style.radialChartsContainer}>
          {!selectedCard &&
            selectedCard !== 0 &&
            doughnutData &&
            doughnutData.map((chart, i) => (
              <div key={i} className={style.radialChart}>
                <div className={style.cardInner}>
                  <h1 className={style.cardTitle}>{chart.title}</h1>
                  <div className={style.subtitle}>
                    <p className="font-secondary-second font-size-12 text-center">
                      {chart.secondTitle}
                    </p>
                  </div>
                  <div className={style.doughnutChartContainer}>
                    <DoughnutChart doughnutData={chart.average} />
                    <p>
                      <span className={style.textBold}>
                        {chart.average[chart.average.length - 1]}%{' '}
                      </span>
                      of your library
                      <br /> is shot in
                      <span className={style.textBold}>
                        {' '}
                        {chart.secondTitle}
                      </span>
                    </p>
                  </div>
                </div>
                <a
                  className={style.doughnutChartFooter}
                  onClick={() => this.changeVisibilityDoughnut(i)}
                >
                  View Metrics
                  <div className={style.doughnutChartFooterIcon}>
                    <span className="icon-Arrow-Down">
                      <span className="path1" />
                      <span className="path2" />
                      <span className="path3" />
                    </span>
                  </div>
                </a>
              </div>
            ))}
          {!!selectedCard || selectedCard === 0 ? (
            <div className={style.radialChartsContainer}>
              <div className={style.doughnutPanelTab}>
                <div className={style.doughnutPanelHeader}>
                  <div onClick={() => this.changeVisibilityDoughnut()}>
                    <div className={style.iconWrapper}>
                      <span className="icon-X-Circle">
                        <span className="path1" />
                        <span className="path2" />
                        <span className="path3" />
                      </span>
                      <p className={style.iconTitle}>Frame Rate</p>
                    </div>
                  </div>
                  <div className={style.headerInfo}>
                    <div>
                      <p className={style.panelTitle}>24 Fps</p>
                    </div>
                    <div className={style.formWrapper}>
                      <SelectFilters
                        handleSelectFilters={this.handleSelectFilters}
                        selectClasses="custom-select"
                        selectDate={selectDate}
                        selectDateShow={true}
                        selectLikes={selectLikes}
                        selectLikesShow={true}
                      />
                    </div>
                  </div>
                </div>
                <div className={style.dataWrapper}>
                  <div className={style.panelChart}>
                    <h1 className="font-primary text-bold text-center">
                      Library Data
                    </h1>
                    <div className={style.doughnutChartContainer}>
                      <DoughnutChart
                        doughnutData={selectedCardData.libraryData}
                      />
                      <p className="pt-32">
                        <span className={style.duskRound} />
                        <span className={style.textBold}>
                          {selectedCardData.libraryFpsData.percentage}%
                        </span>{' '}
                        of your library is shot in
                        <span className={style.textBold}>
                          {' '}
                          {selectedCardData.libraryFpsData.fps}fps
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className={style.panelChart}>
                    <PointerCard
                      data={{
                        topTitle: 'Based on Likes',
                        pointerData: 140,
                        bottomText: 'of your library is shot in',
                        likes: 50,
                      }}
                    />
                  </div>
                  <div className={style.panelChart}>
                    <h1 className="font-primary text-bold text-center">
                      Industry Data
                    </h1>
                    <div className={style.doughnutChartContainer}>
                      <DoughnutChart
                        doughnutData={selectedCardData.industryData}
                        color="#8567f0"
                      />
                      <p className="w-75 text-center pt-32">
                        <span className={style.purpleRound} />
                        <span className={style.textBold}>
                          {selectedCardData.industryFpsData.percentage}%
                        </span>{' '}
                        of your library is shot in
                        <span className={style.textBold}>
                          {' '}
                          {selectedCardData.industryFpsData.fps}fps
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-100 mt-48 mb-48">
                  {selectedCardData && (
                    <LineChart
                      backgroundColor="#242b49"
                      dataSet={() =>
                        this.combineChartData(selectedCardData.lineChartData)
                      }
                      width={1070}
                      height={291}
                      options={lineChartOptions}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            undefined
          )}
        </div>
      </div>
    )
  }
}

export default compose(
  reduxForm({
    form: 'libraryDetailDoughnutChart',
  })
)(LibraryDetailDoughnutChart)
