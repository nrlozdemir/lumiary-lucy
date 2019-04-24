import React from 'react'
import style from './style.scss'

import SvgChart from './SvgChart';

const PercentageBarGraph = ({ percentage, color, id }) => {
	const active = Math.round((60 / 100) * percentage);
	return (
		<div className={id}>
			<div className={style.percentageContainer}>
				<div className={style.percentage}>{percentage}</div>
				<div className={style.percentageGraph}>
					<style>
						{`.${id} .${style.percentageGraphWrapper}:before{
                  left: ${percentage}%;
                  }.${id} .${style.percentageGraphWrapper}:after{
                    left: ${percentage}%;
                  }`}
					</style>
					<div className={style.percentageGraphWrapper} data-active={percentage}>
						<SvgChart value={percentage} />

						{[...Array(60)].map((e, index) => (
							<div
								key={index}
								data-index={(index + 1) > (active - 15) && ((index + 1) - (active - 15))}
								className={style.percentageGraphBar}
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
