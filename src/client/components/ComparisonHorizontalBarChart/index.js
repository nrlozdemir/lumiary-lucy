import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { barChartOptions, plugins } from './options'
import style from './style.scss'
import 'chartjs-plugin-datalabels'

const ComparisonHorizontalBarChart = ({ data }) => {
  console.log('data', data)
  const reverseBarChartOptions = JSON.parse(JSON.stringify(barChartOptions))
  reverseBarChartOptions.scales.xAxes[0].ticks = {
    ...reverseBarChartOptions.scales.xAxes[0].ticks,
    reverse: false,
  }
  reverseBarChartOptions.plugins.datalabels = {
    ...reverseBarChartOptions.plugins.datalabels,
    anchor: 'end',
    align: 'right',
    color: '#fff',
    formatter: (value, ctx) => {
      let sum = 0;
      let dataArr = ctx.chart.data.datasets[0].data;
      dataArr.map(data => {
        sum += data;
      });
      let percentage = ( value * 100 / sum ).toFixed(0) + "%";
      return percentage;
    },
  }

  return (
    <div className={style.container}>
      <HorizontalBar
        data={data[0]}
        width={460}
        height={291}
        plugins={plugins}
        options={barChartOptions}
      />

      <div className={style.legends}>
        <div className={style.legend}>Stop Motion</div>
        <div className={style.legend}>Live Action</div>
        <div className={style.legend}>Cinemagraph</div>
        <div className={style.legend}>Animation</div>
      </div>

      <HorizontalBar
        data={data[1]}
        width={460}
        height={291}
        plugins={plugins}
        options={reverseBarChartOptions}
      />
    </div>
  )
}

export default ComparisonHorizontalBarChart
