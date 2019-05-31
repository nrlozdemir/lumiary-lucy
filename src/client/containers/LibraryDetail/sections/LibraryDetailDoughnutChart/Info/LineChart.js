import React from 'react'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import LineChart from 'Components/Charts/LineChart'

class LineChartSection extends React.Component {
  render() {
		const { selectedCardData } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
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
                          const { datasetIndex, index } = tooltipItem[0]
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
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default LineChartSection
