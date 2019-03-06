import React, { Component } from 'react'
import classnames from 'classnames'

import TotalCompetitorViewsChart from 'Components/Charts/MarketView/TotalCompetitorViewsChart'
import style from 'Containers/Marketview/style.scss'

class TotalCompetitorViewsCard extends Component {
	render() {
    const { totalCompetitorViewsData } = this.props
		const chartContainer = classnames('shadow-1 col-12-gutter-20 mb-48', style.chartContainer)

		return (
			<div className={chartContainer}>
				<div className={style.cardTitle}>
					<span>Total Competitor Views By Duration</span>
					<div className={classnames(style.colorListHorizontal, style.colorList)}>
						<div className={style.colorListItem}>Barstool Sports</div>
						<div className={style.colorListItem}>SB Nation</div>
						<div className={style.colorListItem}>ESPN</div>
						<div className={style.colorListItem}>Scout Media</div>
						<div className={style.colorListItem}>Fansided</div>
					</div>
				</div>
				<TotalCompetitorViewsChart barDurationData={totalCompetitorViewsData}/>
			</div>
		)
	}
}

export default TotalCompetitorViewsCard
