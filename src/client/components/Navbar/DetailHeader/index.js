import React from 'react';
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import style from "./style.scss";

class DetailHeader extends React.Component {
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	render() {
		const profileClass = classnames(style.profile)
		const imageClass = classnames('circleImage ' + style.profileImage)
		const { basePath, title, url } = this.props.data;

		if (!basePath) return false;

		return (
			<div className={style.header}>
				<div className="ml-40">
					<Link to={url}>
						<span className="icon-Left-Arrow-Circle">
							<span className="path1" />
							<span className="path2" />
							<span className="path3" />
						</span>
						<span className={style.text}>Back to {this.capitalizeFirstLetter(basePath)}</span>
					</Link>
				</div>
				<div>{title || this.capitalizeFirstLetter(basePath)}</div>
				<div className={profileClass}>
					<div className="mr-40">
						<img src="https://picsum.photos/30" className={imageClass} />
						<span>Bleacher Report</span>
					</div>
				</div>
			</div>
		)
	}
}

export default DetailHeader;
