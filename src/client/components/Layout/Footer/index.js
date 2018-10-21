import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

// Utils
import { staticUrl } from 'Utils/globals'

// Styles
import style from './styles.scss'

const Footer = (props) => {



  return (
    <div className={ style.footer }>
      <div className={ style.legal }>&copy;{ (new Date()).getFullYear() } Quickframe. All rights reserved.</div>
    </div>
  )
}

export default Footer
