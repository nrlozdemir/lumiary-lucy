import React from 'react'
import { Pie } from 'react-chartjs-2'
import style from './style.scss'
import { customChartToolTip, ucfirst } from 'Utils'
import { ThemeContext } from 'ThemeContext/themeContext'
import 'Utils/chart-shadow'

function metricSuffix(number) {
  if (number >= 1e3) {
    const unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3
    const unitname = ['k', 'm', 'B', 'T'][Math.floor(unit / 3) - 1]
    return (number / ('1e' + unit)).toFixed(0) + unitname
  }

  return number
}

const PacingPieChart = ({ data = {}, metric }) => {
  const { datasets = [] } = data

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div className={style.pieChartContainer}>
          <Pie
            height={216}
            width={216}
            options={{
              tooltips: customChartToolTip(colors, {
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
                    return `${metricSuffix(parseInt(count) || 0)} ${ucfirst(
                      metric
                    )}`
                  },
                },
                xPadding: 12,
                titleFontFamily: 'ClanOT',
                bodyFontFamily: 'ClanOT',
                //titleAlign: 'center',
                //footerAlign: 'center',
                //bodyAlign: 'center',
                //yAlign: 'top',
                //xAlign: 'center',
              }),
              responsive: false,
              legend: {
                display: false,
              },
              plugins: {
                datalabels: false,
              },
              layout: {
                padding: 8,
              },
              elements: {
                arc: {
                  borderWidth: 2,
                },
              },
            }}
            data={{
              ...data,
              datasets: [
                {
                  ...datasets[0],
                  borderColor: colors.modalBackground,
                  hoverBorderColor: colors.modalBackground,
                  shadowOffsetX: 0.4,
                  shadowOffsetY: 0.4,
                  shadowBlur: 4,
                  shadowColor: colors.doughnutChartShadowColor,
                  hoverShadowColor: colors.doughnutChartShadowColor,
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
