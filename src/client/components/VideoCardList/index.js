import React from 'react'
import VideoCard from 'Components/VideoCard'

const VideoCardList = ({ data: { videos } }) => {
  if (!videos) {
    return null
  }
  return (
    videos &&
    videos.map((item, index) => (
      <VideoCard
        video={item}
        key={`videolist-${index}`}
        id={`videolist-${index}`}
      />
    ))
  )
}

export default VideoCardList
