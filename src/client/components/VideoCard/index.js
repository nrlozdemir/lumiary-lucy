/**
 *
 * VideoCard
 *
 */

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import style from "./style.scss";
import { socialIconSelector } from "../../utils";
/* eslint-disable react/prefer-stateless-function */
const VideoCard = ({ video, options = options || {} }) => {
	const cardContainerClass = classnames(style.cardContainer, {
		["bg-dusk"]: !options.barColor,
		["col-3"]: !options.size,
		[`col-${options.size}`]: options.size,
		[`bg-${options.barColor}`]: options.barColor,
		[options.customClass]: options.customClass
	});

	const iconClass = classnames(
		socialIconSelector(video.socialIcon),
		style.iconClass
	);

	return (
		<div key={video.id} className={cardContainerClass}>
			<div className={style.cardImage}>
				<img className="img-responsive" src={video.thumbnailUrl} />
				<div className={style.overlay} />
			</div>
			<div className={style.cardBody}>
				<div className={style.bodyHeader}>
					<span className={style.iconWrapper}>
						<i className={iconClass} />
					</span>
					<span className={style.title}>{video.title}</span>
				</div>
			</div>
		</div>
	);
};

VideoCard.propTypes = {
	video: PropTypes.object,
	options: PropTypes.object
};

export default VideoCard;
