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
const ProgressBar = ({ customBarClass, customPercentageClass, width }) => {
  const barClass = classnames(style.progressBar, customBarClass)
  const percentageClass = classnames(customPercentageClass)
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        return (
          <div
            className={barClass}
            style={{
              background: colors.progressBackground,
              boxShadow: `0 1px 2px 0 ${colors.progressShadow}`,
            }}
          >
            <div
              className={percentageClass}
              style={{ width: `${width}%`, background: colors.progressColor }}
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
