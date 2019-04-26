import React from 'react'
import { Link } from 'react-router-dom'

import VideoCard from 'Components/VideoCard'

const VideoCardList = ({ data }) => {
  return (
    data &&
    data.map((item, index) => (
      <VideoCard video={item} key={`videolist-${index}`} id={`videolist-${index}`}/>
    ))
  )
}

export default VideoCardList
