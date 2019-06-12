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
  const percentage = (100 * data.value) / data.max
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
            {capitalizeFirstLetter(title)}
          </span>
          <span className={style.rightTitle}>{addComma(data.value)}</span>
        </div>
        <ProgressBar
          width={percentage > 100 ? 100 : (
            parseFloat(percentage).toFixed(2) < 1 ? 1 : parseFloat(percentage).toFixed(2) 
          )}
          customBarClass={style.progressBar}
          customPercentageClass={classnames(style.percentageIncrease, {
            [style.percentageDecrease]:
              parseInt((data.average / data.value) * 100) < 50,
          })}
          tickPosition={parseFloat(data.average * 100 / data.max).toFixed(2)}
          tickBackgroundColor={colors.textColor}
        />
        <div className={style.markers}>
          <p className={style.averageText} style={{ left: `${
            parseFloat(data.average * 100 / data.max).toFixed(2) - 4 < 4 ? 0 : parseFloat(data.average * 100 / data.max).toFixed(2) - 4
          }%`}}>Avg</p>
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
