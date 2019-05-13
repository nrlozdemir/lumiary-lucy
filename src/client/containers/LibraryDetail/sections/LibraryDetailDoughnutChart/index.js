import React from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import SelectFilters from 'Components/SelectFilters'
import LineChart from 'Components/Charts/LineChart'
import PointerCard from 'Components/PointerCard'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

class LibraryDetailDoughnutChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCard: false,
    }
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
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className="grid-container col-12 mt-48"
            style={{
              backgroundColor: colors.moduleBackground,
              boxShadow: `0px 2px 6px 0px ${colors.moduleShadow}`,
              color: colors.textColor,
            }}
          >
            <div className={style.radialChartsContainer}>
              {!selectedCard &&
                selectedCard !== 0 &&
                doughnutData &&
                doughnutData.map((chart, i) => (
                  <div
                    key={i}
                    className={style.radialChart}
                    style={{ borderColor: colors.moduleBorder }}
                  >
                    <div
                      className={style.doughnutChartContainerHover}
                      style={{
                        backgroundColor: colors.moduleBackground,
                        boxShadow: `0px 2px 6px 0px ${colors.moduleShadow}`,
                        color: colors.textColor,
                      }}
                    />
                    <div className={style.cardInner}>
                      <h1 className={style.cardTitle}>{chart.title}</h1>
                      <div
                        className={style.subtitle}
                        style={{
                          background: colors.labelBackground,
                          color: colors.labelColor,
                          boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                        }}
                      >
                        <p className="font-secondary-second font-size-12 text-center">
                          {chart.secondTitle}
                        </p>
                      </div>
                      <div className={style.doughnutChartContainer}>
                        <DoughnutChart
                          width={150}
                          height={150}
                          displayDataLabels={false}
                          cutoutPercentage={50}
                          data={{
                            labels: ['Red', 'Green', 'Blue', 'Yellow'],
                            datasets: [
                              {
                                data: [...chart.average],
                                borderColor: '#373F5B',
                                backgroundColor: [
                                  '#ffffff',
                                  '#ffffff',
                                  '#ffffff',
                                  '#2FD7C4',
                                ],
                                hoverBackgroundColor: [
                                  '#ffffff',
                                  '#ffffff',
                                  '#ffffff',
                                  '#2FD7C4',
                                ],
                              },
                            ],
                          }}
                        />
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
                      style={{
                        backgroundColor: colors.modalButtonBackground,
                        color: colors.textColor,
                      }}
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
                  <div
                    className={style.doughnutPanelTab}
                    style={{
                      background: colors.moduleBackground,
                    }}
                  >
                    <div
                      className={style.doughnutPanelHeader}
                      style={{
                        background: colors.duskBackground,
                        boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
                      }}
                    >
                      <div onClick={() => this.changeVisibilityDoughnut()}>
                        <div className={style.iconWrapper}>
                          <span className="icon-X-Circle">
                            <span className="path1" />
                            <span className="path2" />
                            <span className="path3" />
                          </span>
                          <p className={style.iconTitle}>Frame Rate - 24 Fps</p>
                        </div>
                      </div>
                      <div className={style.headerInfo}>
                        <div />
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
                    <div
                      className={style.dataWrapper}
                      style={{
                        background: colors.moduleBackground,
                      }}
                    >
                      <div
                        className={style.panelChart}
                        style={{ borderColor: colors.moduleBorder }}
                      >
                        <h1 className={style.panelHeader}>Library Data</h1>
                        <div className={style.doughnutChartContainer}>
                          <DoughnutChart
                            width={180}
                            height={180}
                            displayDataLabels={false}
                            cutoutPercentage={50}
                            data={{
                              labels: ['Red', 'Green', 'Blue', 'Yellow'],
                              datasets: [
                                {
                                  data: [...selectedCardData.libraryData],
                                  borderColor: '#373F5B',
                                  backgroundColor: [
                                    '#ffffff',
                                    '#ffffff',
                                    '#ffffff',
                                    '#2FD7C4',
                                  ],
                                  hoverBackgroundColor: [
                                    '#ffffff',
                                    '#ffffff',
                                    '#ffffff',
                                    '#2FD7C4',
                                  ],
                                },
                              ],
                            }}
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
                      <div
                        className={style.panelChart}
                        style={{ borderColor: colors.moduleBorder }}
                      >
                        <PointerCard
                          data={{
                            topTitle: 'Based on Shares',
                            pointerData: 140,
                            bottomText: 'of your library is shot in',
                            avg: 103,
                            percent: 16,
                            fps: 24,
                          }}
                          colors={colors}
                        />
                      </div>
                      <div
                        className={style.panelChart}
                        style={{ borderColor: colors.moduleBorder }}
                      >
                        <h1 className={style.panelHeader}>Industry Data</h1>
                        <div className={style.doughnutChartContainer}>
                          <DoughnutChart
                            doughnutData={selectedCardData.industryData}
                            color="#8562F3"
                            width={180}
                            height={180}
                            displayDataLabels={false}
                            cutoutPercentage={50}
                            data={{
                              labels: ['Red', 'Green', 'Blue', 'Yellow'],
                              datasets: [
                                {
                                  data: [...selectedCardData.libraryData],
                                  borderColor: '#373F5B',
                                  backgroundColor: [
                                    '#ffffff',
                                    '#ffffff',
                                    '#ffffff',
                                    '#2FD7C4',
                                  ],
                                  hoverBackgroundColor: [
                                    '#ffffff',
                                    '#ffffff',
                                    '#ffffff',
                                    '#2FD7C4',
                                  ],
                                },
                              ],
                            }}
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
                    <div className={style.lineChartWrapper}>
                      <div className="mt-48 mb-48">
                        {selectedCardData && (
                          <LineChart
                            width={1090}
                            height={292}
                            dataSet={{
                              labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                              datasets: selectedCardData.lineChartData,
                            }}
                            xAxesFlatten
                            yAxesPercentage
                            xAxesStepSize={1}
                            yAxesStepSize={25}
                            options={{
                              tooltips: {
                                xPadding: 10,
                                yPadding: 16,
                                cornerRadius: 3,
                                callbacks: {
                                  title: function(tooltipItem, data) {
                                    const {
                                      datasetIndex,
                                      index,
                                    } = tooltipItem[0]
                                    if (datasetIndex === 1) {
                                      return `${
                                        data.datasets[datasetIndex].data[index]
                                      }% of industry is shot in 24fps`
                                    } else {
                                      return `${
                                        data.datasets[datasetIndex].data[index]
                                      }% of frames is shot in 24fps`
                                    }
                                  },
                                  label: function(tooltipItem, data) {
                                    return null
                                  },
                                },
                              },
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                undefined
              )}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default compose(
  reduxForm({
    form: 'libraryDetailDoughnutChart',
  })
)(LibraryDetailDoughnutChart)
