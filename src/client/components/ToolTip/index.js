import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import ReactTooltip from 'react-tooltip'

export default (props) => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        const theme = colors.themeType
        
        if (!!props.default && props.default === true) {

          return (
            <ReactTooltip
              {...props}
              type={theme === 'dark' ? 'dark' : 'light'}
            />
          )
        } else {
          return (
            <div
              className={classnames(style.toolTip, true && style.display)}
              style={{
                color: colors.tooltipTextColor,
                background: colors.tooltipBackground,
              }}
            >
              <span
                className={style.toolTipTick}
                style={{
                  border: `10px solid ${colors.tooltipBackground}`,
                  borderColor: `transparent transparent ${
                    colors.tooltipBackground
                  } ${colors.tooltipBackground}`,
                }}
              />
              {!!props.children && props.children}
            </div>
          )
        }
      }}
    </ThemeContext.Consumer>
  )
}
