import React from "react";
import style from "./styles.scss";
import { randomString } from "Utils/";

const VideoPlayer = ({ data, fontSize }) => {
	const videoId = randomString(5);
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
