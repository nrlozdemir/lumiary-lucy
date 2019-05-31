import React from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import DownArrowCircle from 'Components/Icons/DownArrowCircle'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import Info from './Info';

class LibraryDetailDoughnutChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCard: false,
    }
  }

  changeVisibilityDoughnut = (selectedCard = false) => {
    this.setState((prevState) => ({ selectedCard }))
  }

  render() {
    const {
      isDoughnutVisible,
      selectedCard,
    } = this.state
    const { doughnutData, lineChartData } = this.props
    let selectedCardData = null
    if (!!selectedCard || selectedCard === 0) {
      selectedCardData = doughnutData.find((item, i) => i === selectedCard)
		}
		console.log(doughnutData);
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
                            )}
                            %{' '}
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
                <Info changeVisibilityDoughnut={this.changeVisibilityDoughnut} selectedCardData={selectedCardData} />
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
