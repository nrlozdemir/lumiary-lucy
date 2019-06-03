import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import Video from '../VideoComponent'
import FlipCard from 'Components/FlipCard'
import ProgressBar from 'Components/ProgressBar'
import { capitalizeFirstLetter, addComma } from 'Utils/index'
import { textEdit } from 'Utils/text'
import { ThemeContext } from 'ThemeContext/themeContext'

const Front = (props) => {
  const { data, colors, title } = props
  return (
    <div className={style.videoStat}>
      <div className={style.progressText}>
        <span className={style.leftTitle}>{capitalizeFirstLetter(title)}</span>
        <span className={style.rightTitle}>{addComma(data.value)}</span>
      </div>
      <ProgressBar
        width={(100 * data.value) / data.average}
        customBarClass={style.progressBar}
        customPercentageClass={classnames(style.percentageIncrease, {
          [style.percentageDecrease]:
            parseInt((data.average / data.value) * 100) < 50,
        })}
      />
      <p className={style.averageText}>Avg</p>
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
                Object.keys(selectedVideoAverage).map((key) => {
                  return (
                    <FlipCard width={320} height={100} key={`flipcard-${key}`}>
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
