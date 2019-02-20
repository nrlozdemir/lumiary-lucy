import React from 'react'
import { Link } from 'react-router-dom'

import style from './style.scss'

const LibraryDetailHeader = ({ videoName, publishedPlatform }) => (
  <div className={style.header}>
    <div className="ml-40">
      <Link to="/library">
        <span className="icon-Left-Arrow-Circle">
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
        </span>
        <span className={style.text}>Back to Library</span>
      </Link>
    </div>
    <div>{videoName}</div>
    <div className={style.iconWrapper}>
      Published on {publishedPlatform}
      <span className="icon-Facebook-Bubble" />
    </div>
  </div>
)

export default LibraryDetailHeader
