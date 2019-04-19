import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { barChartOptions, leftPlugins, rightPlugins } from './options'
import style from './style.scss'

const ComparisonHorizontalBarChart = (props) => {
  let dataLeft = {
    labels: ['', '', '', ''],
    datasets: [
      {
        backgroundColor: '#d0506c',
        data: [10, 55, 5, 30],
      },
    ],
  }

  let dataRight = {
    labels: ['', '', '', ''],
    datasets: [
      {
        backgroundColor: '#51adc0',
        data: [12, 19, 5, 64],
      },
    ],
  }

  const otherOption = JSON.parse(JSON.stringify(barChartOptions))
  otherOption.scales.xAxes[0].ticks = {
    ...otherOption.scales.xAxes[0].ticks,
    callback: function(value) {
      if (value === 0) return 0
      return value + '%'
    },
    reverse: false,
  }

  return (
    <div className={style.container}>
      <HorizontalBar
        data={dataLeft}
        width={460}
        height={291}
        plugins={leftPlugins}
        options={barChartOptions}
      />

      <div className={style.legends}>
        <div className={style.legend}>Stop Motion</div>
        <div className={style.legend}>Live Action</div>
        <div className={style.legend}>Cinemagraph</div>
        <div className={style.legend}>Animation</div>
      </div>

      <HorizontalBar
        data={dataRight}
        width={460}
        height={291}
        plugins={rightPlugins}
        options={otherOption}
      />
    </div>
  )
}

export default ComparisonHorizontalBarChart
