import React from 'react'
import style from './style.scss'

const BubleChart = ({ bubbleChartData }) => {
  return (
    <div className={style.bubbleChart}>
      {bubbleChartData.map((item, i) => (
        <div key={i} className={style.bubbleChartItem}>
          <style>
            {`.${style.bubbleChartItem}:nth-child(${i + 1}){
                  border-color: ${item.color}
                }.${style.bubbleChartItem}:nth-child(${i + 1}):hover{
                  background-color: ${item.color}
                }`}
          </style>
          <div className={style.bubbleChartIcon}><span className={item.iconClass} /></div>
          <div className={style.bubbleChartTooltip}>
            <span>{item.name}</span>
            <span>{item.value} Likes</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BubleChart