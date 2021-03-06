import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './style.scss'
import { socialIconSelector } from '../../utils'
import { isEmpty } from 'lodash'

/* eslint-disable react/prefer-stateless-function */
const SingleVideoCard = ({ video, options = options || {}, muted = true }) => {
  const handleMouseOverPlay = () => {
    if (!!videoRef) {
      videoRef.current.play()
    }
  }

  const handleMouseOutPlay = () => {
    if (!!videoRef) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const cardContainerClass = classnames(style.cardContainer, {
    ['bg-dusk']: !options.barColor,
    ['col-3']: !options.size,
    [`col-${options.size}`]: options.size,
    [`bg-${options.barColor}`]: options.barColor,
    [options.customClass]: options.customClass,
  })

  const iconClass = classnames(
    socialIconSelector(video.socialIcon),
    style.iconClass
  )
  const videoRef =
    video && video.videoUrl && !isEmpty(video.videoUrl) && React.createRef()
  return (
    <div
      key={video.index}
      className={cardContainerClass}
      onMouseEnter={handleMouseOverPlay}
      onMouseLeave={handleMouseOutPlay}
    >
      <div className={style.cardImage}>
        <div
          className={style.blurredImage}
          style={{ backgroundImage: `url(${video.poster})` }}
        />
        {video && video.videoUrl && !isEmpty(video.videoUrl) && (
          <div className={style.videoInner}>
            <video
              key={video.videoUrl}
              ref={videoRef}
              loop
              muted
              poster={video.poster}
              controls={false}
            >
              <source src={video.videoUrl} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
      {options.footer && (
        <div className={style.cardBody}>
          <div className={style.bodyHeader}>
            <span className={style.title}>{video.title}</span>
            <span className={style.iconWrapper}>
              <i className={iconClass} />
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

SingleVideoCard.propTypes = {
  video: PropTypes.object,
  options: PropTypes.object,
}

export default SingleVideoCard
