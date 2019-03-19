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
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = {
      hoverReady: false,
      firstLoad: true,
      showVideo: false,
      width: 0,
      startProgress: false,
      duration: 0,
      ctx: undefined,
    }
  }

  grabFrame = () => {
    var wrh = this.video.videoWidth / this.video.videoHeight
    var newWidth = this.canvas.width
    var newHeight = newWidth / wrh
    newWidth = newHeight * wrh
    this.state.ctx.drawImage(this.video, 0, 0, newWidth, newHeight)
    this.setState({
      hoverReady: true,
    })
  }

  componentDidMount() {
    this._isMounted = true
    if (this._isMounted) {
      this.setState({
        ctx: this.canvas.getContext('2d'),
      })
    }
  }

  componentDidUpdate() {
    if (this._isMounted) {
      if (this.video && this.state.firstLoad) {
        const _this = this
        this.video.addEventListener('loadeddata', function() {
          _this.grabFrame()
          this.addEventListener(
            'timeupdate',
            function(e) {
              _this.setState({
                width: this.currentTime,
              })
            },
            false
          )
        })
        this.setState({
          firstLoad: false,
        })
      }
    }
  }

  componentWillUnmount() {
    this.video.removeEventListener('timeupdate', null)
    this.video.removeEventListener('loadeddata', null)
    this._isMounted = false
  }

  pausedFunction = () => {
    // this.grabFrame()
    this.video.pause()
    this.video.removeEventListener('timeupdate', null)
    this.setState({
      startProgress: false,
      showVideo: false,
    })
  }

  playedFunction = () => {
    if (!this.state.hoverReady) return
    this.video.play()
    const _this = this
    this.setState({
      showVideo: true,
      startProgress: true,
      duration: this.video.duration,
    })
  }

  render() {
    const { video, options = options || {}, muted = true } = this.props
    const cardContainerClass = classnames(
      style.cardContainer,
      {
        ['bg-dusk']: !options.barColor,
        // ['col-3']: !options.size,
        // [`col-${options.size}`]: options.size,
        [`bg-${options.barColor}`]: options.barColor,
        [options.customClass]: options.customClass,
      },
      this.state.hoverReady && style.hoverReady
    )

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
          <div
            className={classnames(
              style.cardImage,
              !this.state.hoverReady ? style.opacityNone : style.opacityShow
            )}
          >
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
              <Link
                to={`/library/build-report/${video.id}`}
                className={style.cardLink}
              >
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
    )
  }
}

export default VideoCard
