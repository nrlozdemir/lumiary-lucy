import React from 'react'
import cx from 'classnames'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

class Container extends React.Component {

  render() {
    const { children, className } = this.props

    const classNames = cx(style.formContainer, className);

    return(
      <div className={ classNames }>
        { children }
      </div>
    )
  }
}

export default Container
