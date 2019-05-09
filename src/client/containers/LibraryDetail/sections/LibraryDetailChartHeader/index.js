import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import Video from '../VideoComponent'
import FlipCard from 'Components/FlipCard'
import ProgressBar from 'Components/ProgressBar'
import { capitalizeFirstLetter } from 'Utils/index'
import { textEdit } from 'Utils/text'

const Front = (props) => {
  const { data } = props
  return (<div className={classnames(
    "bg-dark-grey-blue",
    "shadow-1",
    style.videoStat)}
  >
    <div className={style.progressText}>
      <span className={style.leftTitle}>{capitalizeFirstLetter(data.title)}</span>
      <span className={style.rightTitle}>{data.value}k</span>
    </div>
    <ProgressBar
      width={data.percentage}
      customBarClass={style.progressBar}
      customPercentageClass={classnames(style.percentageIncrease, {
        [style.percentageDecrease]: (parseInt(data.percentage) < 50)
      })}
    />
    <p className={style.averageText}>Avg</p>
  </div>)
}

const Back = (props) => {
  return (
    <p className={style.backText}>
      {textEdit("This video is receiving <b>{percentage}% less</b> {title} than your library average", props.data)}
    </p>
  )
}

const LibraryDetailChartHeader = ({ barChartData, videoUrl, title, socialIcon, cvScore, id }) => {
  return (
    <div className="grid-container col-12 mt-48">
      <div className={classnames("mt-72", style.containerClass)}>
        <div className={classnames(
          "col-6",
          style.videoWrapper)
        }>
          <Video src={videoUrl} title={title} socialIcon={socialIcon} cvScore={cvScore} id={id} />
        </div>
        <div className={classnames(
          "col-6",
          style.videoStatsWrapper)}
        >
          {barChartData.map(
            (element, i) => {
              return (
                <FlipCard key={i} width={320} height={100}>
                  <Front data={element} />
                  <Back data={element} />
                </FlipCard>
              )
            }
          )}
        </div>
      </div>
    </div>
  )
}

export default LibraryDetailChartHeader
