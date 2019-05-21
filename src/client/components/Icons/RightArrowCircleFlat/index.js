import React from 'react';
import classnames from 'classnames';
import { ThemeContext } from "ThemeContext/themeContext";
import styles from "./style.scss";

export default class RightArrowCircleFlatIconComponent extends React.Component {
	static contextType = ThemeContext;

	render() {
		const { iconColor, iconBackground } = this.context.themeContext.colors;
		const { size = null } = this.props;

		const commonStyle = {
			fontSize: size
		};

		return (
			<span {...this.props} className={classnames("icon-Right-Arrow-Circle", this.props.className)}>
				<span className={styles.path1} style={{...commonStyle, color: iconColor}} />
				<span className={styles.path3} style={{...commonStyle, color: iconBackground}} />
			</span>
		)
	}
}
