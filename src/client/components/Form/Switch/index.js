import React from 'react'
import style from './style.scss'

const Switch = ({ switchOn, controlSwitch }) => {
  return (
    <div className={style.switchContainer}>
      <input
        id="switch-shadow"
        className={style.switch}
        type="checkbox"
        checked={switchOn}
        onChange={() => controlSwitch()}
      />
      <label htmlFor="switch-shadow" />
    </div>
  )
}

export default Switch
