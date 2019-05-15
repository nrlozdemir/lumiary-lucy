import React from 'react';
import { ThemeContext } from "ThemeContext/themeContext";
import styles from "./style.scss";

export default class RightArrowCircleIconComponent extends React.Component {
	static contextType = ThemeContext;

	render() {
		const { containerClass = '' } = this.props;
		const { iconColor, iconBackground, iconBorder } = this.context.themeContext.colors;

		return (
			<div className={containerClass}>
				<span className="icon-Right-Arrow-Circle">
					<span className={styles.path1} style={{color: iconBackground}} />
					<span className={styles.path2} style={{color: iconBorder}} />
					<span className={styles.path3} style={{color: iconColor}} />
				</span>
			</div>
		)
	}
}
