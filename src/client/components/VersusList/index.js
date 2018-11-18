"use strict";

import React from "react";
import PropTypes from "prop-types";

// Styles
import style from "./style.scss";
// Components
import Video from "../Video";

class VersusList extends React.Component {
	render() {
		const { router, videos } = this.props;
		return (

			<div>
				<div className='row'>
					<div className='col-md-5'>Best Performing</div>
					<div className='col-md-2'>% difference</div>
					<div className='col-md-5'>Worst Performing</div>
				</div>
				{videos.map(video => (
				<div className='row'>
					<div className={style.versusList}>
						<Video key={video.vl.id} video={video.vl} router={router} />
					</div>
					<div style={{ color: '#800', height: '135px' }} className={`col-4 bordered listBlockMid`}>
						<RadialPercentage 
							width="135px" 
							height="135px" 
							color1="#2f2e3d"
							color2="#21bcd5"
							percentage={video.diff} 
							fontsize="30"
						/>
					</div>
					<div className={style.versusList}>
						<Video key={video.vr.id} video={video.vr} router={router} />
					</div>
				</div>
				<div className='row'>
					<div className='col-md-5'></div>
					<div className='col-md-2'>{video.title}</div>
					<div className='col-md-5'></div>
				</div>
				))}
			</div>
		);
	}
}

VersusList.propTypes = {
	router: PropTypes.object,
	videos: PropTypes.array
};

VersusList.defaultProps = {};

export default VersusList;
