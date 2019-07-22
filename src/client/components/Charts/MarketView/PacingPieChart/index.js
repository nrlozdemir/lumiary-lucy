import React from 'react'
import { Pie } from 'react-chartjs-2'
import style from './style.scss'
import { customChartToolTip } from 'Utils'
import { ThemeContext } from 'ThemeContext/themeContext'

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
