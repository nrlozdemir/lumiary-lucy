import React from 'react'
import classnames from 'classnames'

import style from './style.scss'

export default ({ label, color }) => {
  return (
    <div className={style.legend}>
      <span className={classnames(style.legendDot, style[`dot-${color}`])} />
      <p>{label}</p>
    </div>
  )
}
