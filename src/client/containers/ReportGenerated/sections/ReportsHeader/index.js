import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import style from './style.scss'
import ArrowCircle from 'Components/Icons/ArrowCircle'

const imageClass = classnames('circleImage ' + style.profileImage)

const ReportsHeader = () => (
  <div className={style.header}>
    <div className="">
      <Link to="/reports">
        <ArrowCircle direction="left" />
        <span className={style.text}>Generate New Report</span>
      </Link>
    </div>
    <div>Brand Insights Report</div>
    <div className={style.profile}>
      <img src="https://picsum.photos/30" className={imageClass} />
      <span>Bleacher Report</span>
    </div>
  </div>
)

export default ReportsHeader
