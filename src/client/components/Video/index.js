import React from "react";
import { DragSource } from "react-dnd";
import cx from "classnames";

import style from "./styles.scss";

const videoSource = {
	beginDrag(props) {
		return props;
	},

	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			return;
		}
		return props.router.push(`/library/video/${props.video.id}`);
	}
};

const collect = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	};
};

class Video extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showInfo: false
		};
	}
	setInfoVisible() {
		this.setState({ showInfo: true });
	}
	setInfoUnvisible() {
		this.setState({ showInfo: false });
	}
	render() {
		const { isDragging, connectDragSource, children, className, video } = this.props;
		return connectDragSource(
			<div className={style.video}>
				<div className={style.videoContainer}>
					<img
						className={cx(style.videoBackground, className)}
						src={video.src}
						onMouseOver={() => this.setInfoVisible()}
						onMouseOut={() => this.setInfoUnvisible()}
					/>
					<span className={style.videoIcon + " " + "qf-iconDrag"} />
				</div>
				{this.state.showInfo ? (
					<div className={style.infoContainer}>
						<div className={style.videoImage}>
							<img className={cx(style.videoBackground, className)} src={video.src} />
							<br />
							<p className={style.videoTitle}>Meet the Puppet</p>
						</div>
						<div className={style.publishDate}>
							Pubslished on: <br />
							03/12/2018
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default DragSource("video", videoSource, collect)(Video);
