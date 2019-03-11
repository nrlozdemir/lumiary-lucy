import React from 'react';
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import style from "./style.scss";

export const Header = props => {
	const profileClass = classnames(style.profile)
	const imageClass = classnames('circleImage ' + style.profileImage)

	return (
		<div className={style.header}>
			<div className="ml-40">
				<Link to="/panoptic">
					<span className="icon-Left-Arrow-Circle">
						<span className="path1" />
						<span className="path2" />
						<span className="path3" />
					</span>
					<span className={style.text}>Back to Panoptic</span>
				</Link>
			</div>
			<div>Audience</div>
			<div className={profileClass}>
				<div className="mr-40">
					<img src="https://picsum.photos/30" className={imageClass} />
					<span>Bleacher Report</span>
				</div>
			</div>
		</div>
	)
}
