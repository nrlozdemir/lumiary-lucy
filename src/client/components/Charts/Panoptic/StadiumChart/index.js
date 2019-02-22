import React from 'react'

import style from "./style.scss"

const StadiumChart = () => (
	<div className="d-flex justify-space-between align-items-center">
		<div className={style.colorList}>
			<div className={style.colorListItem}>Fast</div>
			<div className={style.colorListItem}>Medium</div>
			<div className={style.colorListItem}>Slow</div>
			<div className={style.colorListItem}>Slowest</div>
		</div>
		<div className={style.stadiumCharts} title="Percentage of Library">
			<div className={style.stadiumChart} data="20" title="80% Data">
				<svg xmlns="http://www.w3.org/2000/svg">
					<rect className={style.bar} fill="none" rx="1" />
				</svg>
			</div>
			<div className={style.stadiumChart} data="50" title="50% Data">
				<svg xmlns="http://www.w3.org/2000/svg">
					<rect className={style.bar} fill="none" rx="1" />
				</svg>
			</div>
			<div className={style.stadiumChart} data="45" title="55% Data">
				<svg xmlns="http://www.w3.org/2000/svg">
					<rect className={style.bar} fill="none" rx="1" />
				</svg>
			</div>
			<div className={style.stadiumChart} data="40" title="60% Data">
				<svg xmlns="http://www.w3.org/2000/svg">
					<rect className={style.bar} fill="none" rx="1" />
				</svg>
			</div>
		</div>
	</div>
)

export default StadiumChart
