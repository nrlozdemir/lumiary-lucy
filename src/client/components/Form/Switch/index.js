import React from 'react'
import style from './style.scss'

const Switch = () => {
  return (
    <div className={style.switchContainer}>
      <input id="switch-shadow" className={style.switch} type="checkbox" />
      <label htmlFor="switch-shadow" />
    </div>
  )
}

export default Switch
