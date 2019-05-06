import React from 'react'
import style from './style.scss'
import classnames from 'classnames'
import SvgChart from './SvgChart'

const PercentageBarGraph = ({ percentage, disableLabels = false, color, id, lineCount = 60, width = 250, height = 40, xSmall, backgroundColor }) => {
	const active = Math.round((60 / 100) * percentage);
	return (
		<div className={id}>
			<div className={style.percentageContainer} style={{ backgroundColor }}>
				{!disableLabels && <div className={style.percentage}>{percentage}</div>}
				<div className={classnames(style.percentageGraph, {[style.noLabel]: disableLabels})}>
					<style>
						{`.${id} .${style.percentageGraphWrapper}:before{
                  left: ${percentage}%;
                  }.${id} .${style.percentageGraphWrapper}:after{
                    left: ${percentage}%;
                  }`}
					</style>
					<div style={{ height: height }} className={classnames(style.percentageGraphWrapper, {[style.noLabel]: disableLabels})} data-active={percentage}>
						<SvgChart value={percentage} width={width} height={height} backgroundColor={backgroundColor}/>

						{[...Array(lineCount)].map((e, index) => (
							<div
								key={index}
								data-index={(index + 1) > (active - 15) && ((index + 1) - (active - 15))}
								className={classnames(style.percentageGraphBar, {[style.percentageGraphXSmall] : xSmall})}
								style={{ backgroundColor: color }}
							></div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PercentageBarGraph
