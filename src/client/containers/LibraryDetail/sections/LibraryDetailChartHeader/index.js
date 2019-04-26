import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import Video from '../VideoComponent'
import FlipCard from 'Components/FlipCard'
import ProgressBar from 'Components/ProgressBar'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function replaceBoldElement(text) {
	const regex = new RegExp(/<b>(.*?)<\/b>/g)

	if( ! regex.test(text)){
		return text
	}

	const matched = text.match(regex)

	const values = matched.map(val => val.replace(/<\/?b>/g, ''))
	if ( ! values.length){
		return text
	}

	return (<React.Fragment>
		{text.split(regex).reduce((prev, current, i) => {
			if( ! i) {
				return [current]
			}
			return prev.concat(
				values.includes(current)
				? <strong key={i + current}>{current}</strong>
				: current
			);
		}, [])}
	</React.Fragment>)
}

function textEdit(text, item) {
	text = text.replace('{score}', item.score)
	text = text.replace('{title}', item.title)
	text = text.replace('{percentage}', item.percentage)
	text = replaceBoldElement(text)

	return text
}

const Front = (props) => {
	const { data } = props
  return (<div className={classnames(
    "bg-dark-grey-blue",
    "shadow-1",
    style.videoStat)}
  >
    <div className={style.progressText}>
      <span className={style.leftTitle}>{capitalizeFirstLetter(data.title)}</span>
      <span className={style.rightTitle}>{data.score}k</span>
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
	const {
		data,
		data: { text }
	} = props

	return (
		<p className={style.backText}>
			{textEdit(text, data)}
		</p>
	)
}

const LibraryDetailChartHeader = ({ barChartData, videoUrl, title, socialIcon }) => (
	<div className="grid-container col-12 mt-48">
		<div className={classnames("mt-72", style.containerClass)}>
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

export default LibraryDetailChartHeader
