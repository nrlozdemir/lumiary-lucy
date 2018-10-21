import React from 'react'
import classnames from 'classnames/bind'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

const cx = classnames.bind(style)

const AgeIcon = ({ className }) => {

  const classNames = cx(
    [style[className]],
  )

  return (
    <div className={ classNames }>
      <div className={ style.inner } />
    </div>
  )
}

AgeIcon.propTypes = {

}

export default AgeIcon
