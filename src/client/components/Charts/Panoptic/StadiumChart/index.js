import React from 'react'

import style from './style.scss'

const lineSize = parseInt(style.lineSize)
const minHeight = parseInt(style.minHeight)
const minWidth = parseInt(style.minWidth)

let stats = [{ value: '20' }, { value: '50' }, { value: '45' }, { value: '40' }]

const StadiumChart = () => (
  <div className={style.stadiumContainer}>
    <div className={style.colorList}>
      <div className={style.colorListItem}>Fast</div>
      <div className={style.colorListItem}>Medium</div>
      <div className={style.colorListItem}>Slow</div>
      <div className={style.colorListItem}>Slowest</div>
    </div>
    <div className={style.stadiumCharts} data-title="Total Percentage">
      {stats.map((stat, index) => {
        return (
          <div key={index} className={style.stadiumChart} data={stat.value}>
            <div className={style.tooltip}>
              {[100 - stat.value, '% Slowest'].join('')}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg">
              <rect
                className={style.bar}
                fill="none"
                rx={lineSize * (index + 2)}
                x={lineSize / 2}
                y={lineSize / 2}
                width={minWidth + lineSize * (index * 2)}
                height={minHeight + lineSize * (index * 2)}
              />
            </svg>
          </div>
        )
      })}
    </div>
  </div>
)

export default StadiumChart
