import React, { Component } from 'react'
import classnames from 'classnames'
import { Doughnut, Bar } from 'react-chartjs-2'

import SelectFilters from 'Components/SelectFilters'
import style from 'Containers/Marketview/style.scss'

import { barData, barDataOptions } from './options'

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
    const { selectLikes, selectPlatforms, selectDate } = this.state
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
              selectLikes={selectLikes}
              selectPlatforms={selectPlatforms}
              selectDate={selectDate}
              selectLikesShow={true}
              selectPlatformsShow={true}
              selectDateShow={true}
            />
          </div>
        </div>
        <div className="grid-collapse">
          <div className="col-6">
            <Bar
              data={{
                labels: barData.labels,
                datasets: barData.datasets.map((data, index) => {
                  const indexValues = data.data.map((v, i) => {
                    return barData.datasets.map((d) => d.data[i])
                  })

                  return {
                    ...data,
                    data: data.data.map((value, i) => {
                      const totalValue = indexValues[i].reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue
                      )

                      return parseFloat((value / (totalValue / 100)).toFixed(2))
                    }),
                  }
                }),
              }}
              width={500}
              options={barDataOptions}
              height={300}
            />
          </div>
          <div className="col-6">
            <div className="d-flex justify-space-between align-items-center">
              <div className={style.colorList}>
                <div className={style.colorListItem}>Barstool Sports</div>
                <div className={style.colorListItem}>SB Nation</div>
                <div className={style.colorListItem}>ESPN</div>
                <div className={style.colorListItem}>Scout Media</div>
                <div className={style.colorListItem}>Fansided</div>
              </div>
              <div className={style.doughnutChart}>
                <Doughnut
                  options={{
                    responsive: false,
                    legend: {
                      display: false,
                    },
                    plugins: {
                      datalabels: false,
                    },
                    layout: {
                      padding: 0,
                    },
                  }}
                  width={300}
                  height={300}
                  data={{
                    labels: [
                      'Barstool Sports',
                      'SB Nation',
                      'ESPN',
                      'Scout Media',
                      'Fansided',
                    ],
                    datasets: [
                      {
                        data: [50, 20, 15, 10, 5],
                        borderColor: '#303a5d',
                        backgroundColor: [
                          '#51adc0',
                          '#8567f0',
                          '#D0506C',
                          '#acb0be',
                          '#5a6386',
                        ],
                        hoverBackgroundColor: [
                          '#51adc0',
                          '#8567f0',
                          '#D0506C',
                          '#acb0be',
                          '#5a6386',
                        ],
                      },
                    ],
                  }}
                />
                <div className="poa-middle text-center">Total Percentage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TotalViewsChart
