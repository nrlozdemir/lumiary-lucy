import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

/* eslint-disable react/prefer-stateless-function */
const Input = ({ error, value, label, placeholder, customClass, input }) => {
  // inputBackground
  // inputBorder
  // inputActiveBorder
  // inputColor
  // inputPlaceholderColor
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        console.log(colors)
        const cx = classnames(
          style.input,
          {
            [style.error]: error,
            [colors.themeType === 'dark' ? style.dark : style.light]: true,
            [style.typing]: !!input.value,
          },
          customClass
        )
        return (
          <div className="w-100">
            {label ? (
              <label className={style.label} htmlFor={label}>
                {label}
              </label>
            ) : null}
            <input
              id={label}
              className={cx}
              placeholder={placeholder}
              value={value}
              {...input}
            />
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
}

export default Input
