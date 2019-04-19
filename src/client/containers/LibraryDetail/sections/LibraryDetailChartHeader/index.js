import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import Video from '../VideoComponent'
import ProgressBar from 'Components/ProgressBar'

const libraryDetailCard = (data, index) => {
	return (<div key={index} className={classnames(
		"bg-dark-grey-blue",
		"shadow-1",
		style.videoStat)}
	>
		<div className={style.progressText}>
			<span className={style.leftTitle}>{data.title}</span>
			<span className={style.rightTitle}>{data.score}k</span>
		</div>
		<ProgressBar
			width={data.percentage}
			customBarClass={style.progressBar}
			customPercentageClass={classnames(style.percentageBlue, {
				[style.percentagePink]: (parseInt(data.percentage) > 50) ? false : true
			})}
		/>
		<p className={style.averageText}>Avg</p>
	</div>)
}

const LibraryDetailChartHeader = ({ barChartData, videoUrl, title, socialIcon }) => (
  <div className="grid-container mr-20 ml-20 mt-72" style={{ display: 'flex' }}>
    <div className={classnames(
			"col-6",
			style.videoWrapper)
		}>
      <Video src={videoUrl} title={title} socialIcon={socialIcon} />
    </div>
		<div className={classnames(
			"col-6",
			style.videoStatsWrapper)}
		>
			{barChartData.map(
				(data, index) => libraryDetailCard(data, index))
			}
    </div>
  </div>
)

export default LibraryDetailChartHeader
