import React from 'react'
import VideoCard from 'Components/VideoCard'

const VideoCardList = ({ data, brandId }) => {
  if (!data) {
    return null
  }
  return (
    data &&
    data.map((item, index) => (
      <VideoCard
        video={item}
        key={`videolist-${index}`}
        id={`videolist-${index}`}
        brandId={brandId}
      />
    ))
  )
}

export default VideoCardList
