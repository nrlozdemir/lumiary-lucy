import React from 'react'
import { Pie } from 'react-chartjs-2'
import style from './style.scss'

const PacingPieChart = ({ data }) => {
  console.log(data)
  return (
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
        }}
        data={data}
      />
    </div>
  )
}

export default PacingPieChart
