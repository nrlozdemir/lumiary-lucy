import React from 'react'
import style from './style.scss'
import 'chartjs-plugin-datalabels'

import { withTheme } from 'ThemeContext/withTheme'
import HorizontalBarChart from 'Components/Charts/HorizontalBarChart'

const ComparisonHorizontalBarChart = (props) => {
  const { data } = props
  const themes = props.themeContext.colors
  return (
    <div className={style.container}>
      <HorizontalBarChart
        data={data[0].datasets[0]}
        reverse
        grids={['100%', '75%', '50%', '25%', '0%']}
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

      <HorizontalBarChart
        data={data[1].datasets[0]}
        grids={['0%', '25%', '50%', '75%', '100%']}
      />
    </div>
  )
}

export default withTheme(ComparisonHorizontalBarChart)
