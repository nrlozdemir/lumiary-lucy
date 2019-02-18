import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import style from 'Containers/Marketview/style.scss';

class ColorCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bubbleChartOptions: [
				'#cc2226',
				'#dd501d',
				'#eb7919',
				'#f8b90b',
				'#fff20d',
				'#aac923',
				'#13862b',
				'#229a78',
				'#3178b0',
				'#79609b',
				'#923683',
				'#b83057'
			],
			bubbleChartData: [
				{
					name: 'Facebook',
					value: 124034,
					icon: <span className="qf-iconFacebook" />,
					color: '#fff20d'
				},
				{
					name: 'Instagram',
					value: 75424,
					icon: <span className="qf-iconInstagram" />,
					color: '#cc2226'
				},
				{
					name: 'Twitter',
					value: 63424,
					icon: <span className="qf-iconTwitter" />,
					color: '#13862b'
				},
				{
					name: 'Pinterest',
					value: 34543,
					icon: <span className="qf-iconYoutube" />,
					color: '#923683'
				},
				{
					name: 'Youtube',
					value: 65463,
					icon: <span className="qf-iconPinterest" />,
					color: '#3178b0'
				}
			]
		};
	}

	render() {
		const { bubbleChartOptions, bubbleChartData } = this.state;
		return (
			<div className={style.marketViewCard}>
				<div className={style.marketViewCardTitle}>Color</div>
				<div className={style.marketViewCardDescription}>Top Performing Platform</div>
				<div className={style.marketViewCardDate}>
					<span>Past 3 Months</span>
				</div>

				<div className={style.bubbleChart}>
					{bubbleChartData.map((item, i) => (
						<div key={i} className={style.bubbleChartItem}>
							<style>
								{`.${style.bubbleChartItem}:nth-child(${i + 1}){
												border-color: ${item.color};
											}.${style.bubbleChartItem}:nth-child(${i + 1}):hover{
												background-color: ${item.color};
											}`}
							</style>
							<div className={style.bubbleChartIcon}>{item.icon}</div>
							<div className={style.bubbleChartTooltip}>
								<span>{item.name}</span>
								<span>{item.value} Likes</span>
							</div>
						</div>
					))}
				</div>

				<div className={style.colors}>
					{bubbleChartOptions.map((color, i) => <span key={i} style={{ backgroundColor: color }} />)}
				</div>

				<div className={style.marketViewCardDescription}>
					Based on the number of likes for competitors across all platforms
				</div>
				<Link to="/marketview/competitor" className={style.marketViewCardLink}>
					View Platform Metrics <span className="qf-iconRight-Arrow" />
				</Link>
			</div>
		);
	}
}

export default ColorCard;
