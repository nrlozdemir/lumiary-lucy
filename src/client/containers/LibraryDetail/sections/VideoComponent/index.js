import React, { Component } from 'react'
import classnames from "classnames"
import styles from './style.scss'

class Video extends Component {
  componentDidMount() {
    var videoPlayButton,
      videoWrapper = document.getElementsByClassName('video-wrapper')[0],
      video = document.getElementsByTagName('video')[0],
      videoMethods = {
        renderVideoPlayButton: function() {
          if (videoWrapper.contains(video)) {
            this.formatVideoPlayButton()
            video.classList.add('has-media-controls-hidden')
            videoPlayButton = document.getElementsByClassName(
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
          video.play()
          videoPlayButton.classList.add('is-hidden')
          video.classList.remove('has-media-controls-hidden')
          video.setAttribute('controls', 'controls')
        },
      }

    videoMethods.renderVideoPlayButton()
  }

  render() {
		const { src, poster = '', style, className } = this.props;
		const classes = classnames('video-wrapper', className, styles.container);

    return (
      <div className={classes} style={{...style}}>
        <video
					className={styles.video}
          src={src}
          poster={poster}
        />
      </div>
    )
  }
}

export default Video
