import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import ReactTooltip from 'react-tooltip'

export default (props) => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        
        const className = !!props.largeTooltip ? "largeTooltip" : "smallTooltip"
        
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
