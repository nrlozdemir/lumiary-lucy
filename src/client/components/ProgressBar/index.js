/**
 *
 * ProgressBar
 *
 */

import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

/* eslint-disable react/prefer-stateless-function */
const ProgressBar = ({ 
  customBarClass, 
  customPercentageClass, 
  width, 
  tickColor, 
  progressBarBackgroundColor,
  progressBarShadowColor
 }) => {
  const barClass = classnames(style.progressBar, customBarClass)
  const percentageClass = classnames(customPercentageClass)
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        const boxShadow = progressBarShadowColor 
          ? `0 1px 2px 0 ${progressBarShadowColor}` 
          : `0 1px 2px 0 ${colors.progressShadow}`
        
        const backgroundColor = progressBarBackgroundColor || colors.progressBackground
        const percentageStyle = { 
            width: `${width}%`, 
            background: colors.progressColor 
          }

        return (
          <div
            className={barClass}
            style={{
              background: backgroundColor,
              boxShadow:  boxShadow,
            }}
          >
            {tickColor && (
              <div 
                className={style.tick}
                style={{ background: tickColor }}
              />
            )}
            <div
              className={percentageClass}
              style={percentageStyle}
            />
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

ProgressBar.propTypes = {
  customBarClass: PropTypes.string,
  customPercentageClass: PropTypes.string,
}

export default ProgressBar
