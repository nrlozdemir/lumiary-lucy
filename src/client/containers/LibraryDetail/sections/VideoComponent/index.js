import React, { Component } from 'react'
import styles from './style.scss'
import AssetLayer from 'Components/AssetLayer'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import { floatCvScore } from 'Utils'

class Video extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
  }

  componentDidMount() {
    const { setRef } = this.props

    setRef(this.video)

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
    const { src, poster = '', title, socialIcon, cvScore } = this.props

    return (
      <React.Fragment>
        <AssetLayer
          leftSocialIcon={socialIcon}
          title={title}
          rightValue={floatCvScore(cvScore) || 0.0}
          truncateTitle
        >
          <video
            ref={this.video}
            className={styles.video}
            src={src}
            muted
            controls={false}
          />
          <div className={styles.percentageWrapper} style={{ right: '80px' }}>
            <PercentageBarGraph
              key={Math.random()}
              percentage={cvScore}
              color="green"
              disableLabels
              width={80}
              height={20}
              id="videoComponentBarGraph"
            />
          </div>
        </AssetLayer>
      </React.Fragment>
    )
  }
}

Video.defaultProps = {
  setRef: () => {},
}
export default Video
