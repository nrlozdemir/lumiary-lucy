import React from 'react'
import classnames from 'classnames'
import style from './style.scss'

const findNewCoordinates = (x,y) => {
  //pushes the dot into the circle
  let newX = x
  let newY = y
  while(Math.pow(newX, 2) + Math.pow(newY, 2) >= 10000) {
  x < 0 ? ++newX : --newX
  y < 0 ? ++newY : --newY
  }
  return {newX, newY}
}

export const ColorTemperature = ({ temp, verticalText }) => {
  const leftText = classnames(style.textLeft, {
    [style.verticalTextLeft]: verticalText,
  })

  const rightText = classnames(style.textRight, {
    [style.verticalTextRight]: verticalText,
  })

  return (
    <div className={style.temperatureContent}>
      <p className={style.textTop}>{temp.topText ? temp.topText : 'Happy'}</p>
      <p className={rightText}>Warm</p>
      <p className={style.textBottom}>
        {temp.topText ? temp.bottomText : 'Sad'}
      </p>
      <p className={leftText}>Cool</p>
      <div className={style.verticalLine} />
      <div className={style.horizontalLine} />
      {temp.data.map((data, i) => {
          let x = data.x
          let y = data.y
          //calculate if the coordinate is outside of the circle
          //if not, push it back into the circle
          //100000 is; multiplication of radius (100px in this case) with itself
          const isInside=Math.pow(x, 2) + Math.pow(y, 2) <= 10000
          if(!isInside) {
            const newCoordinates = findNewCoordinates(x, y)
            x = newCoordinates.newX
            y = newCoordinates.newY
          }
        return (
        <span
          key={i}
          className={style.round}
          style={{
            transform: `translateX(${x * 2}%) translateY(${y * 2}%)`,
            backgroundColor: `${(i === 0) ? "#ff556f" : "#2FD7C4"}`,
          }}
        />
      )})}
    </div>
  )
}
