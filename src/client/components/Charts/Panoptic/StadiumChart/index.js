import React from 'react'
import style from './style.scss'
import Stadium from 'Components/StadiumChart'

const StadiumChart = ({ data }) => {
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
        angleColor={'#242B49'}
        barStroke={'#5A6386'}
        barFill={'#242b49'}
        animationSpeed={1}
        borderWidth={26}
        border={1}
        angelBorder={2}
        infoSpaceW={210}
        infoSpaceH={80}
      />
    </div>
  )
}

export default StadiumChart
