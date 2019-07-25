import React from 'react'
import { Pie } from 'react-chartjs-2'
import style from './style.scss'
import { customChartToolTip } from 'Utils'
import { ThemeContext } from 'ThemeContext/themeContext'

function metricSuffix(number) {
  if (number >= 1e3) {
    const unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3
    const unitname = ['k', 'm', 'B', 'T'][Math.floor(unit / 3) - 1]
    return (number / ('1e' + unit)).toFixed(0) + unitname
  }

  return number
}

const PacingPieChart = ({ data = {} }) => {
  const { datasets = [] } = data

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div className={style.pieChartContainer}>
          <Pie
            height={240}
            width={240}
            options={{
              tooltips: {
                callbacks: {
                  title: function(tooltipItem, data) {
                    const name =
                      data &&
                      data.labels &&
                      data.labels[tooltipItem[0]['index']]
                    return `${!!name && name}`
                  },
                  label: function(tooltipItem, data) {
                    const count =
                      (data &&
                        data.datasets &&
                        data.datasets[0] &&
                        data.datasets[0].data[tooltipItem['index']]) ||
                      ''
                    return `${metricSuffix(parseInt(count) || 0)} Shares`
                  },
                },
                backgroundColor: colors.tooltipBackground,
                cornerRadius: 6,
                titleFontColor: colors.chartTooltipColor,
                titleFontStyle: 'normal',
                mode: 'point',
                bodyFontFamily: 'ClanOT',
                titleFontFamily: 'ClanOT',
                bodyFontColor: colors.chartTooltipColor,
                xPadding: 8,
                yPadding: 12,
                bodyFontStyle: 'normal',
                displayColors: false,
                //titleAlign: 'center',
                //footerAlign: 'center',
                //bodyAlign: 'center',
                xPadding: 12,
                yPadding: 12,
              },
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
              elements: {
                arc: {
                  borderWidth: 2.2,
                },
              },
            }}
            data={{
              ...data,
              datasets: [
                {
                  ...datasets[0],
                  borderColor: colors.modalBackground,
                },
              ],
            }}
          />
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default PacingPieChart
