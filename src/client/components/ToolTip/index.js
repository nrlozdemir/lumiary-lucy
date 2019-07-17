import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

export default ({ show = false, onClick = () => {}, children }) => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div
          className={classnames(style.toolTip, show && style.show)}
          style={{
            color: colors.tooltipTextColor,
            background: colors.tooltipBackground,
          }}
          onClick={onClick}
        >
          <span
            className={style.toolTipTick}
            style={{
              border: `6px solid ${colors.tooltipBackground}`,
              borderColor: `transparent transparent ${
                colors.tooltipBackground
              } ${colors.tooltipBackground}`,
            }}
          />
          {children}
        </div>
      )}
    </ThemeContext.Consumer>
  )
}
