import React from 'react';
import { ThemeContext } from "ThemeContext/themeContext";
import styles from "./style.scss";

export default class XCircleIconComponent extends React.Component {
	static contextType = ThemeContext;

	render() {
		const { iconColor, iconBackground, iconBorder } = this.context.themeContext.colors;

		return (
			<span {...this.props} className="icon-X-Circle">
				<span className={styles.path1} style={{color: iconBackground}} />
				<span className={styles.path2} style={{color: iconBorder}} />
				<span className={styles.path3} style={{color: iconColor}} />
			</span>
		)
	}
}
