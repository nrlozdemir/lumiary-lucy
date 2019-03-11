import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import style from './style.scss'

const profileClass = classnames(style.profile)
const imageClass = classnames('circleImage ' + style.profileImage)

const LibraryDetailHeader = () => (
  <div className={style.header}>
    <div className="">
      <Link to="/library">
        <span className="icon-Left-Arrow-Circle">
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
        </span>
        <span className={style.text}>Back To Overview</span>
      </Link>
    </div>
    <div>Library</div>
    <div className={style.profile}>
      <img src="https://picsum.photos/30" className={imageClass} />
      <span>Bleacher Report</span>
    </div>
  </div>
)

export default LibraryDetailHeader
