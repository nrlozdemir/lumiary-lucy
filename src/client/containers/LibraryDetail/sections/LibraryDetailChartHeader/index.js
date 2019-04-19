import React from 'react'
import classnames from 'classnames'
import { Bar } from 'react-chartjs-2'

import style from './style.scss'
import { barDataOptions } from './options'
import Video from '../VideoComponent'
import ProgressBar from 'Components/ProgressBar'

const LibraryDetailChartHeader = ({ barData, videoUrl, title, socialIcon }) => (
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
			<div className={classnames(
				"bg-dark-grey-blue",
				"shadow-1",
				style.videoStat)}
			>
				<div className={style.progressText}>
					<span className={style.leftTitle}>Views</span>
					<span className={style.rightTitle}>871.4k</span>
				</div>
				<ProgressBar
					width="84"
					customBarClass={style.progressBar}
					customPercentageClass={classnames(style.percentageBlue, {
						[style.percentagePink]: false
					})}
				/>
				<p className={style.averageText}>Avg</p>
			</div>
			<div className={classnames(
				"bg-dark-grey-blue",
				"shadow-1",
				style.videoStat)}
			>
				<div className={style.progressText}>
					<span className={style.leftTitle}>Likes</span>
					<span className={style.rightTitle}>352.8k</span>
				</div>
				<ProgressBar
					width="25"
					customBarClass={style.progressBar}
					customPercentageClass={classnames(style.percentageBlue, {
						[style.percentagePink]: true
					})}
				/>
				<p className={style.averageText}>Avg</p>
			</div>
			<div className={classnames(
				"bg-dark-grey-blue",
				"shadow-1",
				style.videoStat)}
			>
				<div className={style.progressText}>
					<span className={style.leftTitle}>Comments</span>
					<span className={style.rightTitle}>186.4k</span>
				</div>
				<ProgressBar
					width="54"
					customBarClass={style.progressBar}
					customPercentageClass={classnames(style.percentageBlue, {
						[style.percentagePink]: false
					})}
				/>
				<p className={style.averageText}>Avg</p>
			</div>
			<div className={classnames(
				"bg-dark-grey-blue",
				"shadow-1",
				style.videoStat)}
			>
				<div className={style.progressText}>
					<span className={style.leftTitle}>Shares</span>
					<span className={style.rightTitle}>103.4k</span>
				</div>
				<ProgressBar
					width="36"
					customBarClass={style.progressBar}
					customPercentageClass={classnames(style.percentageBlue, {
						[style.percentagePink]: true
					})}
				/>
				<p className={style.averageText}>Avg</p>
			</div>
    </div>
  </div>
)

export default LibraryDetailChartHeader
