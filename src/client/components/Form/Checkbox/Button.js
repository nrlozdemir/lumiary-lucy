import React from 'react'
import classnames from 'classnames/bind'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

const cx = classnames.bind(style)

const Button = (props) => {
  const {
    groupName,
    className,
    label,
    value,
    input,
    handleChange,
    selected,
    component,
    labelFlip,
    type
  } = props

  const classNames = classnames({
    [style.selected]: selected && selected == value,
  })

  return (
    <li>
      <label>
        {!labelFlip && <span>{label}</span>}

        <Field
          {...input}
          name={type === "checkbox" ? `${groupName}[${value}]` : `${groupName}`}
          component="input"
          type={type}
          onChange={() => handleChange(this)}
        />

        <div className={style.check} />
        {labelFlip && <span>&#160;{label}</span>}
      </label>
    </li>
  )
}

Button.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  groupName: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  input: PropTypes.object,
}

export default Button
