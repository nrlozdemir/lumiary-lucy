
import React from 'react'
import classnames from 'classnames'
import styles from './style.scss'

/*
Example Usage:
<FlipCard width={300} height={250}>
	<h1>This is the front</h1>
	<h2>This is the back</h2>
</FlipCard>

Also take the following props:
containerClassName, flipperClassName, frontClassName, backClassName
*/

const defaultProps = {
	containerClassName: classnames(styles.flipContainer, 'col-3 ml-0'),
	flipperClassName: styles.flipper,
	frontClassName: styles.front,
	backClassName: styles.back,
	width: 260,
	height: 134
}

export default class FlipCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			containerClassName,
			flipperClassName,
			frontClassName,
			backClassName,
			children,
			width,
			height
		} = this.props

		return (
			<React.Fragment>
				<div className={containerClassName} style={{width: width + 'px', height: height + 'px'}}>
					<div className={flipperClassName}>
						<div className={frontClassName}>
							{children && children[0]}
						</div>
						<div className={backClassName}>
							{children && children[1]}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

FlipCard.defaultProps = defaultProps;


