import React from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import SelectFilters from 'Components/SelectFilters'
import LineChart from 'Components/Charts/LineChart'
import PointerCard from 'Components/PointerCard'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import DownArrowCircle from 'Components/Icons/DownArrowCircle'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import XCircle from 'Components/Icons/XCircle'

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
                          {
                            chart.doughnutChartValues.labels[
                              Object.values(
                                chart.doughnutChartValues.datasets[0].data
                              ).indexOf(
                                Math.max(
                                  ...Object.values(
                                    chart.doughnutChartValues.datasets[0].data
                                  )
                                )
                              )
                            ]
                          }
                        </p>
                      </div>
                      <div className={style.doughnutChartContainer}>
                        <DoughnutChart
                          key={i}
                          width={150}
                          height={150}
                          displayDataLabels={false}
                          cutoutPercentage={50}
                          data={chart.doughnutChartValues}
                        />
                        <p>
                          <span className={style.textBold}>
                            {Math.max(
                              ...Object.values(
                                chart.doughnutChartValues.datasets[0].data
                              )
                            )}{' '}
                          </span>
                          of your library
                          <br /> is shot in
                          <span className={style.textBold}>
                            {' '}
                            {
                              chart.doughnutChartValues.labels[
                                Object.values(
                                  chart.doughnutChartValues.datasets[0].data
                                ).indexOf(
                                  Math.max(
                                    ...Object.values(
                                      chart.doughnutChartValues.datasets[0].data
                                    )
                                  )
                                )
                              ]
                            }
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
                      <DownArrowCircle className={style.icon} size={24} />
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
                          <XCircle />
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
                                  data: [9.87, 30.04, 18.83, 41.26],
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
                            <span className={style.textBold}>52%</span>
                            of your library is shot in
                            <span className={style.textBold}>24fps</span>
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
                            width={180}
                            height={180}
                            displayDataLabels={false}
                            cutoutPercentage={50}
                            data={{
                              labels: ['Red', 'Green', 'Blue', 'Yellow'],
                              datasets: [
                                {
                                  data: [9.87, 30.04, 18.83, 41.26],
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
                            <span className={style.textBold}>36%</span>
                            of your library is shot in
                            <span className={style.textBold}>45fps</span>
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
                              datasets: [
                                {
                                  data: [41, 43, 34, 75, 32, 88, 34],
                                },
                                {
                                  data: [94, 15, 29, 64, 33, 5, 17],
                                },
                              ],
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
