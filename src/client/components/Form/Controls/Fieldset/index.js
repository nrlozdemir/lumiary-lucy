import React from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

const Fieldset = ({ children, className }) => {

  const classNames = (
    [style.fieldset],
    className
  )

  return(
    <fieldset className={ classNames }>
      { children }
    </fieldset>
  )
}

export default Fieldset
