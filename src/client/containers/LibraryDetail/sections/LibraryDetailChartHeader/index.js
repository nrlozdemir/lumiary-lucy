import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import Video from '../VideoComponent'
import FlipCard from 'Components/FlipCard'
import ProgressBar from 'Components/ProgressBar'
import { ucfirst, metricSuffix } from 'Utils'
import { textEdit } from 'Utils/text'
import { withTheme } from 'ThemeContext/withTheme'
import ToolTip from 'Components/ToolTip'

const Front = ({ data, title, colors, mouseenter, mouseleave, tooltipIsOpen }) => {
  //let percentage = (100 * data.value) / data.max
  let percentage = parseInt(data.percentile) || 0

  return (
    <div className={style.frontContainer}>
      <div className={style.videoStat}>
        {data.value === 0 && (
          <div
            className={style.noContent}
            style={{ backgroundColor: colors.moduleBackgroundOpacity }}
          >
            <p>No Data Available</p>
          </div>
        )}
        <div className={style.progressText}>
          <span className={style.leftTitle}>{metricSuffix(data.value)}
            <i
              className={classnames('icon icon-Information', style.moduleInfo)}
              onMouseEnter={mouseenter}
              onMouseLeave={mouseleave}
            />
            <ToolTip show={tooltipIsOpen}>Hi....</ToolTip>
          </span>
          <span className={style.rightTitle}>
            {ucfirst(title)}{' '}
          </span>
        </div>
        <ProgressBar
          width={percentage > 100 ? 100 : parseFloat(percentage).toFixed(2)}
          customBarClass={style.progressBar}
          customPercentageClass={classnames(style.percentageIncrease, {
            [style.percentageDecrease]: percentage < 50,
          })}
          tickColor={colors.progressLibraryDetailTickColor}
          progressBarBackgroundColor={colors.progressLibraryDetailBackground}
          progressBarShadowColor={colors.progressLibraryDetailShadow}
        />
        <div className={style.markers}>
          <p className={style.averageText}>Avg</p>
        </div>
      </div>
    </div>
  )
}

const Back = (props) => {
  const { data, title } = props
  const text = data.diff > 0 ? 'more' : 'less'
  return (
    <p className={style.backText}>
      {textEdit(
        `This video is receiving <b>{percentage}% ${text}</b> {title} than your library average`,
        {
          percentage:
            data.diff < 0
              ? parseInt(data.diff.toString().substr(1))
              : data.diff, // removed 'minus' first character
          title,
        }
      )}
    </p>
  )
}

class LibraryDetailChartHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipIsOpen: false
    }

    this.callMouseEnter = this.callMouseEnter.bind(this)
    this.callMouseLeave = this.callMouseLeave.bind(this)
  }

  callMouseEnter() {
    this.setState({
      tooltipIsOpen: true
    })
  }

  callMouseLeave() {
    this.setState({
      tooltipIsOpen: false
    })
  }

  render() {
    const {
      getVideoRef,
      videoUrl,
      title,
      socialIcon,
      cvScore,
      selectedVideoAverage,
      themeContext: { colors },
    } = this.props

    return (
      <div className="grid-container col-12 mt-48">
        <div className={classnames('mt-72', style.containerClass)}>
          <div className={classnames('col-6', style.videoWrapper)}>
            <Video
              setRef={getVideoRef}
              src={videoUrl}
              title={title}
              socialIcon={socialIcon}
              cvScore={cvScore}
            />
          </div>
          <div className={classnames('col-6', style.videoStatsWrapper)}>
            {selectedVideoAverage &&
              selectedVideoAverage.map((key, index) => {
                return (
                  <FlipCard
                    noflip={true}
                    width={320}
                    height={100}
                    key={`flipcard-${key.keyName}-${index}`}
                    isEmpty={key.value === 0}
                  >
                    <Front
                      data={key}
                      title={key.keyName}
                      colors={colors}
                      mouseenter={this.callMouseEnter}
                      mouseleave={this.callMouseLeave}
                      tooltipIsOpen={this.state.tooltipIsOpen}
                    />
                    <Back data={key} title={key.keyName} />
                  </FlipCard>
                )
              })}
          </div>
        </div>
      </div>
    )
  }
}

export default withTheme(LibraryDetailChartHeader)
