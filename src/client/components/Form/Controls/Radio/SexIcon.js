import React from 'react'
import classnames from 'classnames/bind'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

const cx = classnames.bind(style)

const SexIcon = ({ className }) => {

  const classNames = cx(
    [style[className]],
    [style.sex]
  )

  return (
    <div className={ classNames } />
  )
}

SexIcon.propTypes = {

}

export default SexIcon
