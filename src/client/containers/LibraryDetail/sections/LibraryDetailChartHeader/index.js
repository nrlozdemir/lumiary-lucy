import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import Video from '../VideoComponent'
import FlipCard from 'Components/FlipCard'
import ProgressBar from 'Components/ProgressBar'
import { ucfirst, metricSuffix } from 'Utils'
import { textEdit } from 'Utils/text'
import { ThemeContext } from 'ThemeContext/themeContext'
import ToolTip from 'Components/ToolTip'

const Front = (props) => {
  const { data, colors, title } = props
  //let percentage = (100 * data.value) / data.max
  let percentage = parseInt(data.percentile) || 0
  const text = data.diff > 0 ? 'more' : 'less'
  const tooltipText = `This video is receiving ${percentage}% ${text} ${title} than your library average`

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
          <span className={style.leftTitle}>
            {metricSuffix(data.value)}{' '}
            <i
              className={classnames('icon icon-Information', style.moduleInfo)}
              data-tip={tooltipText}
            />
            <ToolTip effect="solid" default={true} />
          </span>
          <span className={style.rightTitle}>{ucfirst(title + 's')}</span>
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

const LibraryDetailChartHeader = ({
  getVideoRef,
  barChartData,
  videoUrl,
  title,
  socialIcon,
  cvScore,
  id,
  selectedVideoAverage,
}) => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
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
                      <Front data={key} title={key.keyName} colors={colors} />
                      <div />
                    </FlipCard>
                  )
                })}
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default LibraryDetailChartHeader
