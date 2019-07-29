import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

/* eslint-disable react/prefer-stateless-function */
const Input = (props) => {
  const {
    value,
    type,
    label,
    placeholder,
    customClass,
    input,
    required,
    style: customStyle,
    hasError,
    meta: { touched, error, warning },
  } = props

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        // console.log(colors)
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
              type={type || 'text'}
              className={cx}
              placeholder={placeholder}
              value={value}
              {...(required ? { required: true } : {})}
              {...(customStyle ? { style: customStyle } : {})}
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
