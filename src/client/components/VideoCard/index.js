import React, { PureComponent } from 'react'
import classnames from 'classnames'
import style from './style.scss'
import { socialIconSelector, floatCvScore, getCvScoreColor } from 'Utils'
import { Link } from 'react-router-dom'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import { ThemeContext } from 'ThemeContext/themeContext'

import { mediaUrl } from 'Utils/globals'

import ArrowCircle from 'Components/Icons/ArrowCircle'

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
    if (!!this.video) {
      this.video.current.pause()
      this.video.current.currentTime = 0
    }
    this.setState({
      width: 0,
      duration: 0,
      itCanPlay: false,
    })
  }

  render() {
    const {
      video,
      options = options || {},
      muted = true,
      brandId,
      index,
    } = this.props

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
      socialIconSelector(video.platform),
      style.iconClass
    )

    const videoUrl = `${mediaUrl}/lumiere/${brandId}/${video.uuid}.mp4`
    const cvScore = video['percentile']
    const cvScoreColor = getCvScoreColor(cvScore)

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={classnames(style.cardContainer, {
              [colors.themeType === 'dark' ? style.dark : style.light]: true,
            })}
          >
            <div
              className={style.cardInner}
              onMouseEnter={() => this.videoMouseEnterPlay()}
              onMouseLeave={() => this.videoMouseLeavePlay()}
            >
              {cvScore && (
                <div
                  className={style.cardCornerInfo}
                  style={{
                    backgroundColor: colors.videoRightPercentageBackground,
                    color: colors.labelColor,
                    borderColor: colors.moduleBorder,
                  }}
                >
                  <span>{floatCvScore(cvScore)}</span>
                  <PercentageBarGraph
                    key={Math.random()}
                    percentage={cvScore}
                    color={cvScoreColor}
                    disableLabels
                    width={60}
                    height={15}
                    id={`video-card-${index}`}
                  />
                </div>
              )}
              {!!video.fileName && (
                <div
                  className={style.videoInner}
                  style={{
                    border: `1px solid ${colors.videoBorder}`,
                  }}
                >
                  <Link
                    to={`/library/build-report/${video.uuid}/${video.platform}`}
                  >
                    <video
                      key={video.uuid}
                      ref={this.video}
                      loop
                      muted
                      controls={false}
                    >
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  </Link>
                  <span
                    className={style.progressBar}
                    style={{
                      width: `${(this.state.width * 100) /
                        this.state.duration}%`,
                      background: colors.videoProgressBar,
                    }}
                  />
                </div>
              )}

              <div
                className={classnames('bg-dusk', style.cardBody)}
                style={{
                  backgroundColor: colors.videoCardBackground,
                  color: colors.labelColor,
                }}
              >
                <div className={style.bodyHeader}>
                  <div className={style.cardInfo}>
                    <span className={style.iconWrapper}>
                      <i
                        className={iconClass}
                        style={{ color: colors.videoCardIcon }}
                      />
                    </span>
                    <span className={style.title}>{video.title}</span>
                  </div>
                  <Link
                    to={`/library/build-report/${video.uuid}/${video.platform}`}
                    className={style.cardLink}
                    style={{
                      color: colors.labelColor,
                    }}
                  >
                    View Video Details
                    <div className={style.icon}>
                      <ArrowCircle direction="right" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoCard
