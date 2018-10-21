import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import style from './styles.scss'

const Legend = ({ text, subheader, className }) => (
  <legend className={ cx(style.legend, className) }>
    <div className={ style.main }>{ text }</div>
    { subheader ? <div className={ style.secondary }>{ subheader }</div> : null }
  </legend>
)


export default Legend
