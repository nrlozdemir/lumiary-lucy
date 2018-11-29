import React from "react";
import style from "./styles.scss";

const VideoPlayer = ({ data, videoId, fontSize }) => {
	return (
		<div className={style.videoContainer}>
			<video className={style.video} id={videoId}>
				<source src={data} type="video/mp4" />
			</video>
			<span
				onClick={() => {
					const video = document.getElementById(videoId);
					if (video.paused) video.play();
					else video.pause();
				}}
				className={style.videoIcon + " qf-iconPlay"}
				style={{
					fontSize: fontSize
				}}
			>
				<span className="path1" />
				<span className="path2" />
				<span className="path3" />
				<span className="path4" />
				<span className="path5" />
				<span className="path6" />
			</span>
		</div>
	);
};

export default VideoPlayer;
