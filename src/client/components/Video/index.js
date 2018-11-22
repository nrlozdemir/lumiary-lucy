import React from "react";
import { DragSource } from "react-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as libraryActions } from "Reducers/library";
import style from "./styles.scss";

const videoSource = {
	beginDrag(props) {
		return props;
	},

	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			return;
		}
		props.setVideoObject(props.video);
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
	render() {
		const {
			isDragging,
			connectDragSource,
			children,
			className,
			video
		} = this.props;
		return connectDragSource(
			<div className={style.video}>
				<div className={style.videoContainer}>
					<div key={video.id + "list"} className={style.videoContainer}>
						<video id={video.id + "list"} width="100%">
							<source src={video.video} type="video/mp4" />
						</video>
					</div>
					<span className={style.videoIcon + " " + "qf-iconDrag"} />
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(libraryActions, dispatch)
});

const VideoComponent = DragSource("video", videoSource, collect)(Video);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoComponent);
