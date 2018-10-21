import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Field } from 'redux-form'

import style from './styles.scss'

const TextField = (props) => {
  const {
    className,
    component,
    format,
    id,
    label,
    name,
    parse,
    placeholder,
    type,
    validate,
    extraClasses,
    ...rest
  } = props;

  const classNames = cx(
    style.textfield,
    style[className],
    extraClasses
  )

  return (
    <div className={ classNames }>
        { label ? <label className={ style.label }>{ label }</label>: null }
        <Field
          component={ component }
          format={ format }
          id={ id }
          name={ name }
          parse={ parse }
          placeholder={ placeholder || name }
          type={ type || 'text' }
          validate={ validate }
          { ...rest }
        />
      </div>
  )
}

export default TextField
