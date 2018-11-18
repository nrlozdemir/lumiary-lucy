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
		return connectDropTarget(
			<div
				className={style.main}
				style={
					hovered ? { boxShadow: "inset 0px 0px 40px 10px rgba(93, 188,210, 0.5)" } : null
				}
			>
				<div className={style.centeredArea}>
					<span className={style.dropZoneIcon + " " + "qf-iconDrag--Drop"} />
					<p className={style.dropZoneHeading}>Drag &amp; Drop</p>
				</div>
			</div>
		);
	}
}

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default DropTarget("video", {}, collect)(HomePage);
