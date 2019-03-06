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
const VideoCard = ({ video, options = options || {}, muted = true }) => {
	// console.log(video)
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

	const videoEl = React.createRef();
	return (
		<div
			key={video.id}
			className={cardContainerClass}
			onMouseEnter={() => videoEl.current && videoEl.current.play()}
			onMouseLeave={() => videoEl.current && videoEl.current.pause()}>
			<div className={style.cardImage}>
				<video className="img-responsive" ref={videoEl} muted={muted}>
					<source src={video.videoUrl}></source>
				</video>
				<div className={style.overlay} />
			</div>
			<div className={style.cardBody}>
				<div className={style.bodyHeader}>
					<span className={style.title}>{video.title}</span>
					<span className={style.iconWrapper}>
						<i className={iconClass} />
					</span>
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
