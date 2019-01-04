import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import style from './styles.scss'

const Textarea = (props) => {
  const {
    className,
    counterClass,
    filledClass,
    id,
    input,
    label,
    maxLength,
    placeholder,
    rows,
    meta: { asyncValidating, dirty, error, touched, warning, value },
  } = props

  const classNames = cx(style[className], {
    asyncValidating: asyncValidating,
    invalid: touched && error,
    valid: touched && !error,
  })

  const counterClasses = cx(style.counter, style[counterClass])

  return (
    <div className={classNames}>
      {label ? (
        <label className={style.label} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <textarea
        id={id}
        {...input}
        className={cx(style.textarea, { [filledClass]: dirty })}
        placeholder={placeholder}
        rows={rows}
      />
      {touched &&
        ((error && <span className="error"> {error} </span>) ||
          (warning && <span className="warning"> {warning} </span>))}
      {maxLength ? (
        <span className={counterClasses}>
          {input.value.length || 0}/{maxLength}
        </span>
      ) : null}
    </div>
  )
}

Textarea.propTypes = {
  className: PropTypes.string,
  filledClass: PropTypes.string,
  id: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
  type: PropTypes.string,
}

export default Textarea
