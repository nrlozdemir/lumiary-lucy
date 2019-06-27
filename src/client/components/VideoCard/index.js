import React, { PureComponent } from 'react'
import classnames from 'classnames'
import style from './style.scss'
import { socialIconSelector, floatCvScore } from 'Utils'
import { Link } from 'react-router-dom'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import { ThemeContext } from 'ThemeContext/themeContext'

import { mediaUrl } from 'Utils/globals'

import RightArrowCircle from 'Components/Icons/RightArrowCircle'

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
      id,
      brandId,
    } = this.props

    const { itCanPlay } = this.state
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

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.cardContainer}
            style={{
              boxShadow: `0 2px 6px 0 colors.videoCardShadow`,
            }}
          >
            <div
              className={style.cardInner}
              onMouseEnter={() => this.videoMouseEnterPlay()}
              onMouseLeave={() => this.videoMouseLeavePlay()}
            >
              {video['cvScores.value'] && (
                <div
                  className={style.cardCornerInfo}
                  style={{
                    backgroundColor: colors.videoRightPercentageBackground,
                    color: colors.labelColor,
                  }}
                >
                  <span>{floatCvScore(video['cvScores.value'])}</span>
                  <PercentageBarGraph
                    key={Math.random()}
                    percentage={video['cvScores.value']}
                    color="green"
                    disableLabels
                    width={60}
                    height={15}
                    barWidth={2}
                    barSpaceWidth={1}
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
                  <Link to={`/library/build-report/${video.uuid}`}>
                    <video key={video.uuid} ref={this.video} loop muted controls={false}>
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  </Link>
                  <span
                    className={style.progressBar}
                    style={{
                      width: `${(this.state.width * 100) /
                        this.state.duration}%`,
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
                    to={`/library/build-report/${video.uuid}`}
                    className={style.cardLink}
                    style={{
                      color: colors.labelColor,
                    }}
                  >
                    View Video Report
                    <div className={style.icon}>
                      <RightArrowCircle />
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
