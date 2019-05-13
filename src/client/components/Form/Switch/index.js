import React from 'react'
import style from './style.scss'

const Switch = ({ switchOn, controlSwitch, id }) => {
  return (
    <div className={style.switchContainer}>
      <input
        id={id}
        className={style.switch}
        type="checkbox"
        checked={switchOn}
        onChange={() => controlSwitch()}
      />
      <label htmlFor={id} />
    </div>
  )
}

export default Switch
