import React from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

class Pane extends React.Component {

  render() {
    const { children } = this.props

    return(
      <div className={ style.pane }>
        { children }
      </div>
    )
  }
}

export default Pane
