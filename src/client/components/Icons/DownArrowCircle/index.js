import React from 'react';
import { ThemeContext } from "ThemeContext/themeContext";
import classnames from 'classnames';
import styles from "./style.scss";

export default class DownArrowCircleIconComponent extends React.Component {
	static contextType = ThemeContext;

	render() {
		const { iconColor, iconBackground, iconBorder } = this.context.themeContext.colors;
		const { size = null } = this.props;

		const commonStyle = {
			fontSize: size
		};

		return (
			<span className={classnames("icon-Down-Arrow-Circle", this.props.className)}>
				<span className={styles.path1} style={{...commonStyle, color: iconBackground}} />
				<span className={styles.path2} style={{...commonStyle, color: iconBorder}} />
				<span className={styles.path3} style={{...commonStyle, color: iconColor}} />
			</span>
		)
	}
}
