import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import style from 'Containers/Marketview/style.scss';

class ColorCard extends Component {
	render() {
		return (
			<div className={style.marketViewCard}>
				<div className={style.marketViewCardTitle}>Format</div>
				<div className={style.marketViewCardDescription}>Performance Over Time</div>
				<div className={style.marketViewCardDate}>
					<span>On Mondays</span>
				</div>

				<div className={style.hoverImage}>
					<img src="https://picsum.photos/250/140?image=10" alt="" />
					<img src="https://picsum.photos/250/140?image=11" alt="" />
				</div>

				<div className={style.marketViewCardSubTitle}>Stop Motion</div>

				<div className={style.formatItems}>
					<div className={style.formatItem}>
						<div className={style.formatItemIcon}>
							<span className="qf-stopmotion" />
						</div>
						<div className={style.formatItemText}>
							<span>36</span>
							<span>Stop Motion</span>
							<span>Categories</span>
						</div>
					</div>

					<div className={style.formatItem}>
						<div className={style.formatItemIcon}>
							<span className="qf-animation" />
						</div>
						<div className={style.formatItemText}>
							<span>12</span>
							<span>Animation</span>
							<span>Categories</span>
						</div>
					</div>

					<div className={style.formatItem}>
						<div className={style.formatItemIcon}>
							<span className="qf-cinemagraph" />
						</div>
						<div className={style.formatItemText}>
							<span>28</span>
							<span>Live Action</span>
							<span>Categories</span>
						</div>
					</div>

					<div className={style.formatItem}>
						<div className={style.formatItemIcon}>
							<span className="qf-liveaction" />
						</div>
						<div className={style.formatItemText}>
							<span>10</span>
							<span>Cinemagraph</span>
							<span>categories</span>
						</div>
					</div>
				</div>

				<div className={style.marketViewCardDescription}>
					Based on the number of likes for competitors across all platforms
				</div>
				<Link to="/marketview/time" className={style.marketViewCardLink}>
					View Time Metrics <span className="qf-iconRight-Arrow" />
				</Link>
			</div>
		);
	}
}

export default ColorCard;
