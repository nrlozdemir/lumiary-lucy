import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './footer.scss'

class Footer extends PureComponent {

  render() {
    const { children, className } = this.props

    return(
      <footer className={ style[className] }>
        { children }
      </footer>
    )
  }
}

export default Footer
