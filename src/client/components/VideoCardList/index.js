import React from 'react'
import { Link } from 'react-router-dom'

import VideoCard from 'Components/VideoCard'

const VideoCardList = ({ data }) => {
  return (
    data &&
    data.map((item) => (
      // <Link to={`/library/build-report/${item.id}`} key={item.id}>
      <VideoCard video={item} />
      // </Link>
    ))
  )
}

export default VideoCardList
