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

class LineChartSection extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      modalData: nextData,
    } = nextProps

    const {
      modalData: data,
    } = this.props

    return !isEqual(nextData, data)
  }

  render() {
		const { modalData, sectionData } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div className={style.lineChartWrapper}>
            <div className="mt-48 mb-48">
              {modalData && sectionData && (
                <LineChart
                  width={1090}
                  height={292}
                  dataSet={{
                    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    datasets: [
                      {
                        data: modalData.libraryDayAverages,
                      },
                      {
                        data: modalData.industryDayAverages,
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
                          const { datasetIndex, index } = tooltipItem[0]
                          if (datasetIndex === 1) {
                            return `${
                              data.datasets[datasetIndex].data[index]
                            }% of industry is shot in ${sectionData.label}`
                          } else {
                            return `${
                              data.datasets[datasetIndex].data[index]
                            }% of frames is shot in ${sectionData.label}`
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
