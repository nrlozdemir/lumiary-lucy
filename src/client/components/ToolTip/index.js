import React from 'react';
import classnames from 'classnames';

import style from "./style.scss";

export default ({ show = false, children }) => {
	return (
		<div
			className={classnames(style.toolTip, show && style.show)}>
			{children}
		</div>
	)
}
