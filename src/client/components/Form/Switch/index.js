import React from 'react'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'

const Switch = ({ switchOn, controlSwitch, id, themeContext: { colors } }) => {
  return (
    <div className={style.switchContainer}>
      <style>
        {`
        .${style.switch} + label:before {
          background: ${colors.inputControlBorder} !important;
        }
        .${style.switch}:checked + label:before {
          background-color: ${colors.iconBorder} !important;
        }
      `}
      </style>
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

export default withTheme(Switch)
