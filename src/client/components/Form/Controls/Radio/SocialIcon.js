import React from 'react'
import classnames from 'classnames/bind'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

const cx = classnames.bind(style)

const SocialIcon = ({ className }) => {

  const classNames = cx(
    className,
    style.social
  )

  return (
    <div className={ classNames } />
  )
}

SocialIcon.propTypes = {

}

export default SocialIcon
