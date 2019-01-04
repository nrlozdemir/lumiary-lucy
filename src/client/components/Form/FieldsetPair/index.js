import React from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

const FieldsetPair = ({ children }) => {
  return (
    <fieldset className={style.fieldsetPair}>
      <div className={style.fieldRow}>{children}</div>
    </fieldset>
  )
}

export default FieldsetPair
