"use strict";

import React from "react";
import { DropTarget } from "react-dnd";

// Styles
import style from "./styles.scss";

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		src: monitor.getItem()
	};
};

class HomePage extends React.Component {
	render() {
		const { connectDropTarget, hovered, src } = this.props;
		const backgroundColor = hovered ? "lightgreen" : "white";
		return connectDropTarget(
			<div className={style.main} style={{ background: backgroundColor }}>
				<img src={hovered ? src.src : null} />
			</div>
		);
	}
}

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default DropTarget("video", {}, collect)(HomePage);
