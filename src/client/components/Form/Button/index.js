import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'

/* eslint-disable react/prefer-stateless-function */
const Button = (props) => {
  const {
    themeContext: { colors },
  } = props
  const buttonClass = classnames({
    [style.button]: true,
    [props.customClass]: !!props.customClass,
  })
  const iconLeftClass = classnames({
    [props.iconLeft]: true,
    [style.icon]: true,
  })
  const iconRightClass = classnames({
    [props.iconRight]: true,
    [style.icon]: true,
  })

  const buttonContent = (
    <span className={style.buttonText}>
      {props.iconLeft ? (
        <span
          className={iconLeftClass}
          style={{
            color: colors.labelColor,
          }}
        />
      ) : null}
      {props.buttonText}
      {props.iconRight ? (
        <span
          className={iconRightClass}
          style={{
            color: colors.labelColor,
          }}
        />
      ) : null}
    </span>
  )

  if (props.to) {
    return (
      <Link className={buttonClass} to={props.to}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button
      className={buttonClass}
      disabled={props.disable}
      onClick={props.onClick}
      style={{
        color: colors.labelColor,
        backgroundColor: colors.moduleBackground,
      }}
    >
      {buttonContent}
    </button>
  )
}

Button.propTypes = {
  buttonText: PropTypes.string,
  disable: PropTypes.bool,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  customClass: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
}

export default withTheme(Button)
