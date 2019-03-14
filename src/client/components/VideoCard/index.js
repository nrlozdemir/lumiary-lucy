/**
 *
 * VideoCard
 *
 */

import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './style.scss'
import { socialIconSelector } from '../../utils'
import { Link } from 'react-router-dom'
export class VideoCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstLoad: true,
      showVideo: false,
      width: 0,
      startProgress: false,
      duration: 0,
      ctx: undefined,
    }
  }

  grabFrame = () => {
    return this.state.ctx.drawImage(
      this.video,
      -60,
      -60,
      this.video.clientWidth + 60,
      this.video.clientHeight + 60
    )
  }

  componentDidMount() {
    this.setState({
      ctx: this.canvas.getContext('2d'),
    })
  }

  componentDidUpdate() {
    if (this.video && this.state.firstLoad) {
      const _this = this
      this.video.addEventListener('loadeddata', function() {
        _this.grabFrame()
      })
      this.setState({
        firstLoad: false,
      })
    }
  }

  pausedFunction = () => {
    this.grabFrame()
    this.video.pause()
    this.video.removeEventListener('timeupdate', null)
    this.setState({
      startProgress: false,
      showVideo: false,
    })
  }

  playedFunction = () => {
    this.video.play()
    const _this = this
    this.setState({
      showVideo: true,
      startProgress: true,
      duration: this.video.duration,
    })
    this.video.addEventListener(
      'timeupdate',
      function(e) {
        _this.setState({
          width: this.currentTime,
        })
      },
      false
    )
  }

  render() {
    const { video, options = options || {}, muted = true } = this.props
    const cardContainerClass = classnames(style.cardContainer, {
      ['bg-dusk']: !options.barColor,
      // ['col-3']: !options.size,
      // [`col-${options.size}`]: options.size,
      [`bg-${options.barColor}`]: options.barColor,
      [options.customClass]: options.customClass,
    })

    const iconClass = classnames(
      socialIconSelector(video.socialIcon),
      style.iconClass
    )

    return (
      <div
        key={video.id}
        className={cardContainerClass}
        onMouseEnter={() => this.playedFunction()}
        onMouseLeave={() => this.pausedFunction()}
      >
        <div
          className={style.cardInner}
          ref={(cardInner) => (this.cardInner = cardInner)}
        >
          <div className={style.cardImage}>
            <canvas
              className={classnames(
                'img-responsive',
                this.state.showVideo && style.hidden
              )}
              ref={(canvas) => (this.canvas = canvas)}
            />
            <video
              className={classnames(
                'img-responsive',
                !this.state.showVideo ? style.hidden : style.show
              )}
              muted={muted}
              ref={(video) => (this.video = video)}
            >
              <source src={video.videoUrl} type="video/mp4" />
            </video>

            {this.state.startProgress && (
              <span
                className={style.progressBar}
                style={{
                  width: `${(this.state.width * 100) / this.state.duration}%`,
                }}
              />
            )}
          </div>
          <div className={classnames('bg-dusk', style.cardBody)}>
            <div className={style.bodyHeader}>
              <div className={style.cardInfo}>
                <span className={style.iconWrapper}>
                  <i className={iconClass} />
                </span>
                <span className={style.title}>{video.title}</span>
              </div>
              <div className={style.cardLink}>
                <Link to={`/library/build-report/${video.id}`}>
                  View Video Report
                  <div className={style.icon}>
                    <span className="icon-Right-Arrow-Circle">
                      <span className="path1" />
                      <span className="path2" />
                      <span className="path3" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCard
