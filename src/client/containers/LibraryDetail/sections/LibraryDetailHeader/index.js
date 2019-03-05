import React from 'react'
import { Link } from 'react-router-dom'

import style from './style.scss'

const getSocialMediaContent = (publishedPlatform) => {
  switch(publishedPlatform) {
    case 'twitter':
      return { name: 'Twitter',className: 'icon-Twitter-Bubble'}
    case 'instagram':
      return { name: 'Instagram',className: 'icon-Instagram-Bubble'}
    case 'pinterest':
      return { name: 'Pinterest',className: 'icon-Pinterest-Bubble'}
    case 'youtube':
      return { name: 'Youtube',className: 'icon-Youtube-Bubble'}
    default:
      return { name: 'Facebook',className: 'icon-Facebook-Bubble'}
  }
}

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
      Published on {getSocialMediaContent(publishedPlatform).name}
      <span className={getSocialMediaContent(publishedPlatform).className}/>
    </div>
  </div>
)

export default LibraryDetailHeader
