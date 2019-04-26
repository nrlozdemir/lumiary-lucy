
 import React from 'react'
 import classnames from 'classnames'
 import styles from './style.scss'

const defaultProps = {
	containerClassName: classnames(styles.flipContainer, 'col-3 ml-0'),
	flipperClassName: styles.flipper,
	frontClassName: styles.front,
	backClassName: styles.back
};

export default class FlipCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { containerClassName, flipperClassName, frontClassName, backClassName} = this.props

		return (
			<React.Fragment>
				<div className={containerClassName}>
					<div className={flipperClassName}>
						<div className={frontClassName}>
							{this.props.children[0]}
						</div>
						<div className={backClassName}>
							{this.props.children[1]}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

FlipCard.defaultProps = defaultProps;


