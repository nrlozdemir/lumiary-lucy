import React from 'react'
import cx from 'classnames'
import style from './styles.scss'

const StepCounter = (props) => (
  <div className={cx(style.stepCounter, props.className)}>
    {props.handleClick ? (
      <div className={style.back} onClick={props.handleClick} />
    ) : null}
    <div className={style.stats}>
      {props.current}/{props.count}
    </div>
  </div>
)

export default StepCounter
