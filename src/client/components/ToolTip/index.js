import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import ReactTooltip from 'react-tooltip'

export default (props) => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        let className
        if (!!props.largeTooltip) {
          className = 'largeTooltip'
        } else if (!!props.mediumTooltip) {
          className = 'mediumTooltip'
        } else if (!!props.smallTooltip) {
          className = 'smallTooltip'
        } else if (!!props.xSmallTooltip) {
          className = 'xSmallTooltip'
        }

        return (
          <ReactTooltip
            {...props}
            type={colors.themeType}
            className={className}
          />
        )
      }}
    </ThemeContext.Consumer>
  )
}
