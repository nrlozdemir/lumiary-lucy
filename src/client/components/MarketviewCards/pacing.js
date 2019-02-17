import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import style from 'Containers/Marketview/style.scss';
import { Pie } from 'react-chartjs-2';
import classnames from 'classnames';

class ColorCard extends Component {
	render() {
		return (
			<div className={style.marketViewCard}>
				<div className={style.marketViewCardTitle}>Pacing</div>
				<div className={style.marketViewCardDescription}>Top Competitor Similarities</div>
				<div className={style.marketViewCardDate}>
					<span>Past Month</span>
				</div>

				<Pie
					height={220}
					options={{
						responsive: true,
						legend: {
							display: false
						},
						layout: {
							padding: 0
						}
					}}
					data={{
						labels: [ 'Barstool Sports', 'SB Nation', 'ESPN', 'Scout Media', 'Fansided' ],
						datasets: [
							{
								data: [ 50, 20, 15, 10, 5 ],
								borderColor: '#303a5d',
								backgroundColor: [ '#51adc0', '#8567f0', '#ff556f', '#acb0be', '#5a6386' ],
								hoverBackgroundColor: [ '#51adc0', '#8567f0', '#ff556f', '#acb0be', '#5a6386' ]
							}
						]
					}}
				/>

				<div className={style.marketViewCardSubTitle}>Medium Paced</div>

				<div className={classnames(style.colorListSmall, style.colorListHorizontal, style.colorList)}>
					<div className={style.colorListItem}>Barstool Sports</div>
					<div className={style.colorListItem}>SB Nation</div>
					<div className={style.colorListItem}>ESPN</div>
					<div className={style.colorListItem}>Scout Media</div>
					<div className={style.colorListItem}>Fansided</div>
				</div>

				<div className={style.marketViewCardDescription}>
					Based on the number of likes for competitors across all platforms
				</div>
				<Link to="/marketview/platform" className={style.marketViewCardLink}>
					View Competitor Metrics <span className="qf-iconRight-Arrow" />
				</Link>
			</div>
		);
	}
}

export default ColorCard;
