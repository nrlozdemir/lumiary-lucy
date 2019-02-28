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

	const videoEl = React.createRef();

	return (
		<div
			key={video.id}
			className={cardContainerClass}
			onMouseEnter={() => videoEl.current && videoEl.current.play()}
			onMouseLeave={() => videoEl.current && videoEl.current.pause()}>
			<div className={style.cardImage}>
			<video className="img-responsive" ref={videoEl} muted>
				<source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"></source>
			</video>
				{/* <img className="img-responsive" src={video.thumbnailUrl} /> */}
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
