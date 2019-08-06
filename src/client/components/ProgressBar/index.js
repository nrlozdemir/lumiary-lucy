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
import ToolTip from 'Components/ToolTip'

/* eslint-disable react/prefer-stateless-function */
const ProgressBar = ({ 
  customBarClass, 
  customPercentageClass, 
  width, 
  tickColor, 
  progressBarBackgroundColor,
  percentageBgColor,
  progressBarShadowColor,
  tickTooltipValue,
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
            background: percentageBgColor || colors.progressColor 
          }
        
        const tooltipId = '_' + Math.random().toString(36).substr(2, 9)

        return (
          <div
            className={barClass}
            style={{
              background: backgroundColor,
              boxShadow:  boxShadow,
            }}
          >
            {tickColor && (
              <React.Fragment>
                <div 
                className={style.tick}
                style={{ background: tickColor }}
                data-tip={!!tickTooltipValue && tickTooltipValue}
                data-for={`progress-tooltip${tooltipId}`}
                />
                {!!tickTooltipValue && <ToolTip
                  effect="solid"
                  smallTooltip
                  id={`progress-tooltip${tooltipId}`}
                />}
              </React.Fragment>
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
