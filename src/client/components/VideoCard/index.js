/**
 *
 * VideoCard
 *
 */

import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './style.scss'
import { socialIconSelector } from '../../utils'
import { Link } from 'react-router-dom'
let hoverInReady

export class VideoCard extends PureComponent {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.state = {
      width: 0,
      duration: 0,
      itCanPlay: false,
    }
  }

  componentWillUnmount() {
    if (this.video && this.video.current) {
      this.video.current.removeEventListener('timeupdate', null)
    }
  }

  videoMouseEnterPlay = () => {
    const _this = this
    hoverInReady = setTimeout(() => {
      this.setState(
        {
          itCanPlay: true,
        },
        () => {
          this.video.current.play()
          this.video.current.addEventListener(
            'timeupdate',
            function() {
              if (_this.state.itCanPlay) {
                _this.setState({
                  duration: this.duration,
                  width: this.currentTime,
                })
              }
            },
            false
          )
        }
      )
    }, 400)
  }

  videoMouseLeavePlay = () => {
    clearInterval(hoverInReady)
    this.setState({
      width: 0,
      duration: 0,
      itCanPlay: false,
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
    // return console.log(video)
    return (
      <div className={style.cardContainer}>
        <div
          className={style.cardInner}
          onMouseEnter={() => this.videoMouseEnterPlay()}
          onMouseLeave={() => this.videoMouseLeavePlay()}
        >
          {video.videoUrl && this.state.itCanPlay ? (
            <div className={style.videoInner}>
              <video ref={this.video} loop muted poster={video.poster}>
                <source src={video.videoUrl} type="video/mp4" />
              </video>
              <span
                className={style.progressBar}
                style={{
                  width: `${(this.state.width * 100) / this.state.duration}%`,
                }}
              />
            </div>
          ) : (
            <div
              className={style.blurredImage}
              style={{ backgroundImage: `url(${video.poster})` }}
            />
          )}

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
