import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import LineChart from 'Components/Charts/LineChart'
import {
  makeSelectInfoShowSection,
  makeSelectInfoModalData,
} from 'Reducers/libraryDetail'
import { isEqual } from 'lodash'
import { customChartToolTip } from 'Utils'

class LineChartSection extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { modalData: nextData } = nextProps
    const { modalData: data } = this.props
    return !isEqual(nextData, data)
  }

  render() {
    const { modalData, sectionData } = this.props

    const lineOptions = {
      fill: false,
      lineTension: 0.1,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      borderWidth: 4,
      pointBorderWidth: 1,
      pointHoverBorderWidth: 1,
      pointRadius: 5.4,
      pointHitRadius: 5.4,
      pointHoverRadius: 5.4,
    }

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div className={style.lineChartWrapper}>
            <div className="mt-48 mb-48">
              <LineChart
                width={1090}
                height={292}
                dataSet={(!!modalData && modalData.lineChartData) || {}}
                xAxesFlatten
                yAxesPercentage
                xAxesStepSize={1}
                yAxesStepSize={25}
                shadow={{
                  color: colors.lineChartShadowColorDark,
                  blur: 2,
                  offsetX: 1,
                  offsetY: 1.2,
                }}
                options={{
                  tooltips: customChartToolTip(colors, {
                    enabled: true,
                    callbacks: {
                      ...(!!modalData && !!sectionData
                        ? {
                            title: function(tooltipItem, data) {
                              const { datasetIndex, index } = tooltipItem[0]
                              if (datasetIndex === 1) {
                                return `${
                                  data.datasets[datasetIndex].data[index]
                                }% of industry is shot in ${sectionData.label}`
                              } else {
                                return `${
                                  data.datasets[datasetIndex].data[index]
                                }% of your library is shot in ${
                                  sectionData.label
                                }`
                              }
                            },
                            label: function(tooltipItem, data) {
                              return null
                            },
                          }
                        : {}),
                    },
                  }),
                }}
                customLineOptions={[
                  {
                    ...lineOptions,
                    pointBackgroundColor: '#2FD7C4',
                    pointHoverBackgroundColor: '#2FD7C4',
                    borderColor: '#2FD7C4',
                    pointBorderColor: colors.lineChartPointBorderColor,
                    pointHoverBorderColor:
                      colors.lineChartPointHoverBorderColor,
                  },
                  {
                    ...lineOptions,
                    pointBackgroundColor: '#8562F3',
                    pointHoverBackgroundColor: '#8562F3',
                    borderColor: '#8562F3',
                    pointBorderColor: colors.lineChartPointBorderColor,
                    pointHoverBorderColor:
                      colors.lineChartPointHoverBorderColor,
                  },
                ]}
              />
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  sectionData: makeSelectInfoShowSection(),
  modalData: makeSelectInfoModalData(),
})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(LineChartSection)
