import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './style.scss'
import { socialIconSelector } from 'Utils'

class Video extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
  }

  componentDidMount() {
    let video = this.video.current,
      videoWrapper = this.video.current.parentNode,
      videoPlayButton

    let videoMethods = {
      renderVideoPlayButton: function() {
        if (videoWrapper.contains(video)) {
          this.formatVideoPlayButton()
          videoPlayButton = videoWrapper.getElementsByClassName(
            'video-overlay-play-button'
          )[0]
          videoPlayButton.addEventListener('click', this.hideVideoPlayButton)
        }
      },

      formatVideoPlayButton: function() {
        videoWrapper.insertAdjacentHTML(
          'beforeend',
          '\
            <svg class="video-overlay-play-button" viewBox="0 0 200 200" alt="Play video">\
              <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
              <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
            </svg>\
          '
        )
      },

      hideVideoPlayButton: function() {
        if (
          Object.values(videoPlayButton.classList).indexOf('is-hidden') > -1
        ) {
          videoPlayButton.setAttribute(
            'class',
            'video-overlay-play-button is-visible'
          )
          return video.pause()
        }
        video.play()
        videoPlayButton.setAttribute(
          'class',
          'video-overlay-play-button is-hidden'
        )
      },
    }

    videoMethods.renderVideoPlayButton()
    video.onended = (e) => {
      video.currentTime = 0
      videoPlayButton.setAttribute(
        'class',
        'video-overlay-play-button is-visible'
      )
    }
  }

  render() {
    const { src, poster = '', title, socialIcon, style, className } = this.props
    const classes = classnames('video-wrapper', className, styles.container)

    const iconClass = classnames(
      socialIconSelector(socialIcon) + ' ' + styles.icon
    )

    return (
      <div className={classes} style={{ ...style }}>
        <video
          ref={this.video}
          className={styles.video}
          src={src}
          muted
          controls={false}
          poster={poster}
        />
        <div className={styles.bar}>
          <span className={iconClass} /> {title}
        </div>
      </div>
    )
  }
}

export default Video
