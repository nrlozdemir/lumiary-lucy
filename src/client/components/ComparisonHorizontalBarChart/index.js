import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { barChartOptions, plugins } from './options'
import style from './style.scss'
import 'chartjs-plugin-datalabels'

import { withTheme } from 'ThemeContext/withTheme'

const ComparisonHorizontalBarChart = (props) => {
  const { data } = props
  const themes = props.themeContext.colors
  const copyBarChartOptions = JSON.parse(JSON.stringify(barChartOptions))

  copyBarChartOptions.chartArea = {
    backgroundColor: themes.chartBackground,
  }
  copyBarChartOptions.plugins.datalabels = {
    ...copyBarChartOptions.plugins.datalabels,
    formatter: (value, ctx) => {
      let sum = 0
      let dataArr = ctx.chart.data.datasets[0].data
      dataArr.map((data) => {
        sum += data
      })
      let percentage = ((value * 100) / sum).toFixed(0) + '%'
      return percentage
    },
    color: themes.textColor,
  }
  copyBarChartOptions.scales = {
    xAxes: [
      {
        ...copyBarChartOptions.scales.xAxes[0],
        ticks: {
          ...copyBarChartOptions.scales.xAxes[0].ticks,
          fontColor: themes.textColor,
        },
        gridLines: {
          ...copyBarChartOptions.scales.xAxes[0].gridLines,
          color: themes.chartStadiumBarBorder,
          zeroLineColor: themes.chartStadiumBarBorder,
        },
      },
    ],
    yAxes: [
      {
        ...copyBarChartOptions.scales.yAxes[0],
        ticks: {
          ...copyBarChartOptions.scales.yAxes[0].ticks,
          fontColor: themes.textColor,
        },
        gridLines: {
          ...copyBarChartOptions.scales.yAxes[0].gridLines,
          color: themes.chartStadiumBarBorder,
        },
      },
    ],
  }

  const reverseBarChartOptions = JSON.parse(JSON.stringify(copyBarChartOptions))
  reverseBarChartOptions.scales.xAxes[0].ticks = {
    ...reverseBarChartOptions.scales.xAxes[0].ticks,
    reverse: false,
  }
  reverseBarChartOptions.plugins.datalabels = {
    ...reverseBarChartOptions.plugins.datalabels,
    anchor: 'end',
    align: 'right',
    formatter: (value, ctx) => {
      let sum = 0
      let dataArr = ctx.chart.data.datasets[0].data
      dataArr.map((data) => {
        sum += data
      })
      let percentage = ((value * 100) / sum).toFixed(0) + '%'
      return percentage
    },
  }

  return (
    <div className={style.container}>
      <HorizontalBar
        key={Math.random()}
        data={data[0]}
        width={460}
        height={291}
        plugins={plugins}
        options={copyBarChartOptions}
      />

      <div className={style.legends}>
        <div
          className={style.legend}
          style={{
            background: themes.labelBackground,
            color: themes.labelColor,
            shadowColor: themes.labelShadow,
          }}
        >
          Stop Motion
        </div>
        <div
          className={style.legend}
          style={{
            background: themes.labelBackground,
            color: themes.labelColor,
            shadowColor: themes.labelShadow,
          }}
        >
          Live Action
        </div>
        <div
          className={style.legend}
          style={{
            background: themes.labelBackground,
            color: themes.labelColor,
            shadowColor: themes.labelShadow,
          }}
        >
          Cinemagraph
        </div>
        <div
          className={style.legend}
          style={{
            background: themes.labelBackground,
            color: themes.labelColor,
            shadowColor: themes.labelShadow,
          }}
        >
          Animation
        </div>
      </div>

      <HorizontalBar
        key={Math.random()}
        data={data[1]}
        width={460}
        height={291}
        plugins={plugins}
        options={reverseBarChartOptions}
      />
    </div>
  )
}

export default withTheme(ComparisonHorizontalBarChart)
