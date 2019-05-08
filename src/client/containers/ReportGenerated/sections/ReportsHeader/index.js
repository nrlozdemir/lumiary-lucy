import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import style from './style.scss'

const imageClass = classnames('circleImage ' + style.profileImage)

const ReportsHeader = () => (
  <div className={style.header}>
    <div className="">
      <Link to="/reports">
        <span className="icon-Left-Arrow-Circle">
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
        </span>
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
