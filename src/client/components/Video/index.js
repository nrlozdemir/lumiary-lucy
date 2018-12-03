import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actions as libraryActions } from "Reducers/library";
import style from "./styles.scss";

const videoSource = {
	beginDrag(props) {
		return props;
	},

	endDrag(props, monitor) {
		if (!monitor.didDrop()) {
			return;
		}
		if (props.selectedVideos.length) {
			return props.router.push(
				`/library/video/${props.selectedVideos[0].id}?compareWith=${
					props.selectedVideos[1].id
				}`
			);
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
	selectVideo(e, video) {
		if (e.ctrlKey || e.metaKey) {
			this.props.setCompareVideo(video);
		}
	}

	render() {
		const {
			connectDragSource,
			video,
			styleOverride,
			selectedVideos
		} = this.props;
		const selectedItem = selectedVideos.find(e => e.id === video.id)
			? "0px 0px 10px 3px rgba(93, 188,210, 0.5)"
			: "none";
		return connectDragSource(
			<div className={styleOverride ? styleOverride : style.video}>
				<div
					className={style.videoContainer}
					style={{ boxShadow: selectedItem }}
				>
					<div key={video.id + "list"} className={style.videoContainer}>
						<video
							id={video.id + "list"}
							width="100%"
							onMouseDown={e => this.selectVideo(e, video)}
						>
							<source src={video.video} type="video/mp4" />
						</video>
					</div>
					<span className={style.videoIcon + " " + "qf-iconDrag"} />
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		selectedVideos: state.library.toJS().compareVideos
	};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(libraryActions, dispatch)
});

Video.propTypes = {
	connectDragSource: PropTypes.func,
	video: PropTypes.object,
	styleOverride: PropTypes.object,
	selectedVideos: PropTypes.array,
	setCompareVideo: PropTypes.func
};

export const VideoComponent = DragSource("video", videoSource, collect)(Video);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoComponent);
