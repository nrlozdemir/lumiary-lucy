import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import style from './styles.scss'

const FrameHeader = (props) => {

  const { children, className, header, subheader, type, extraClasses } = props

  const classNames = cx(style.frameHeader, style[className], extraClasses, {
    [style.buyer]: type === 'buyer',
    [style.creator]: type === 'creator',
  });

  return(
    <header className={classNames}>
      { header ? <h2>{ header }</h2> : null }
      { subheader ? <h3>{ subheader }</h3> : null }
      { children }
    </header>
  )
}

FrameHeader.defaultProps = {
  type: 'buyer',
};

export default FrameHeader
