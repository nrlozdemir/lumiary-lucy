import React from 'react'
import classnames from 'classnames/bind'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

const cx = classnames.bind(style)

const Button = (props) => {

  const {
    groupName, className,
    label, value, input,
    handleChange,
    selected, component,
    labelFlip,
  } = props

  const classNames = classnames(
    {[style.selected]: selected && selected == value}
  )

  return (
    <li  >
      <label>
        {!labelFlip && <span>{ label }</span> }

        <Field
          { ...input }
          name={`${groupName}[${value}]`}
          component="input"
          type="checkbox"
          onChange={ () => handleChange(this) }
        />

        <div className={ style.check }></div>
        {labelFlip && <span>&#160;{ label }</span> }
      </label>
    </li>

  )
}

Button.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  groupName: PropTypes.string,
  icon: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  label: PropTypes.string,
  input: PropTypes.object,
}

export default Button
