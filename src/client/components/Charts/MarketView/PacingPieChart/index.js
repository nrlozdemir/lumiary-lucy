import React from 'react'
import { Pie } from 'react-chartjs-2'
import style from './style.scss'
import { modifyTooltip } from 'Utils/tooltip'
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
              tooltips: modifyTooltip({
                template: 'MarketviewDoughnutChartTemplate',
                data,
                metric: metric,
                options: {
                  background: colors.tooltipBackground,
                  textColor: colors.tooltipTextColor,
                  caretColor: colors.tooltipBackground,
                },
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
