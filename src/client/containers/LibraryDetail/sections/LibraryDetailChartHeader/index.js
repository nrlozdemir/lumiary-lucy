import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import Video from '../VideoComponent'
import FlipCard from 'Components/FlipCard'
import ProgressBar from 'Components/ProgressBar'
import { ucfirst, metricSuffix } from 'Utils'
import { textEdit } from 'Utils/text'
import { ThemeContext } from 'ThemeContext/themeContext'

const Front = (props) => {
  const { data, colors, title } = props
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
          <span className={style.leftTitle}>
            {ucfirst(title)}
          </span>
          <span className={style.rightTitle}>{metricSuffix(data.value)}</span>
        </div>
        <ProgressBar
          width={
            percentage > 100
              ? 100
              : parseFloat(percentage).toFixed(2)
          }
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

const LibraryDetailChartHeader = ({
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
                src={videoUrl}
                title={title}
                socialIcon={socialIcon}
                cvScore={cvScore}
              />
            </div>
            <div className={classnames('col-6', style.videoStatsWrapper)}>
              {selectedVideoAverage &&
                Object.keys(selectedVideoAverage).map((key, index) => {
                  return (
                    <FlipCard
                      width={320}
                      height={100}
                      key={`flipcard-${key}-${index}`}
                      isEmpty={selectedVideoAverage[key].value === 0}
                    >
                      <Front
                        data={selectedVideoAverage[key]}
                        title={key}
                        colors={colors}
                      />
                      <Back data={selectedVideoAverage[key]} title={key} />
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
