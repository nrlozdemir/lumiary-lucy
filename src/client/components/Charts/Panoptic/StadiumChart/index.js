import React from 'react'
import style from './style.scss'
import Stadium from 'Components/StadiumChart'

const emptyData = [
  {
    value: 0,
    color: '#2FD7C4',
    title: 'Slowest',
  },
  {
    value: 0,
    color: '#8562F3',
    title: 'Slow',
  },
  {
    value: 0,
    color: '#5292E5',
    title: 'Medium',
  },
  {
    value: 0,
    color: '#ACB0BE',
    title: 'Fast',
  },
]

const StadiumChart = ({ data = emptyData, tooltipType }) => {
  return (
    <div className={style.stadiumContainer}>
      <div className={style.colorList}>
        {data.map((item, index) => {
          return (
            <div
              className={style.colorListItem}
              key={`stadium-legend-${index}`}
            >
              <span
                className={style.round}
                style={{ backgroundColor: item.color }}
              />
              <span className={style.infoText}>{item.title}</span>
            </div>
          )
        })}
      </div>

      <Stadium
        data={data}
        stadiumText={'Total Percentage'}
        angleColor={'#21243B'}
        barStroke={'#545B79'}
        barFill={'#21243B'}
        animationSpeed={1}
        borderWidth={26}
        border={1}
        angelBorder={2}
        infoSpaceW={210}
        infoSpaceH={80}
        tooltipType={tooltipType}
      />
    </div>
  )
}

export default StadiumChart
