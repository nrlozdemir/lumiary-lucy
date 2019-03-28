/**
 *
 * VideoCard
 *
 */

import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './style.scss'
import { socialIconSelector, randomKey } from '../../utils'
/* eslint-disable react/prefer-stateless-function */

let hoverInTimer
export class SingleVideoCard extends PureComponent {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.state = {
      itCanPlay: false,
    }
  }

  handleMouseOverPlay = () => {
    const _this = this
    hoverInTimer = setTimeout(() => {
      this.video.current.play()
      this.video.current.addEventListener(
        'timeupdate',
        function() {
          if (!_this.state.itCanPlay) {
            _this.setState({
              itCanPlay: true,
            })
            this.removeEventListener('timeupdate', null)
          }
        },
        false
      )
    }, 400)
  }

  handleMouseOutPlay = () => {
    clearTimeout(hoverInTimer)
    setTimeout(() => {
      this.video.current.pause()
      this.video.current.currentTime = 0
      this.setState({
        itCanPlay: false,
      })
    }, 100)
  }

  render() {
    const { video, options = options || {}, muted = true } = this.props
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

    return (
      <div
        key={video.index}
        className={cardContainerClass}
        onMouseEnter={this.handleMouseOverPlay}
        onMouseLeave={this.handleMouseOutPlay}
      >
        <div className={style.cardImage}>
          <div
            className={style.blurredImage}
            style={{ backgroundImage: `url(${video.poster})` }}
          />
          {video.videoUrl && (
            <div className={style.videoInner}>
              <video ref={this.video} loop muted poster={video.poster}>
                <source src={video.videoUrl} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
        <div className={style.cardBody}>
          <div className={style.bodyHeader}>
            <span className={style.title}>{video.title}</span>
            <span className={style.iconWrapper}>
              <i className={iconClass} />
            </span>
          </div>
        </div>
      </div>
    )
  }
}

SingleVideoCard.propTypes = {
  video: PropTypes.object,
  options: PropTypes.object,
}

export default SingleVideoCard
