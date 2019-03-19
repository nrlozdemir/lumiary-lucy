import React from 'react'
import { Link } from 'react-router-dom'

import VideoCard from 'Components/VideoCard'

const VideoCardList = ({ data }) => {
  return data && data.map((item) => <VideoCard video={item} />)
}

export default VideoCardList
