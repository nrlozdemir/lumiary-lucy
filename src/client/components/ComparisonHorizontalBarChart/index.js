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
        data={data.datasets[0]}
        reverse
        grids={['100%', '75%', '50%', '25%', '0%']}
      />
      <div className={style.legends}>
        {data.labels.map((label) => (
          <div
            className={style.legend}
            style={{
              background: themes.labelBackground,
              color: themes.labelColor,
              shadowColor: themes.labelShadow,
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <HorizontalBarChart
        data={data.datasets[1]}
        grids={['0%', '25%', '50%', '75%', '100%']}
      />
    </div>
  )
}

export default withTheme(ComparisonHorizontalBarChart)
