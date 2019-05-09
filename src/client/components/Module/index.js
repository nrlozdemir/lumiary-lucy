import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions, makeSelectSelectFilters } from 'Reducers/selectFilters'
import _ from 'lodash'
import cx from 'classnames'
import style from './style.scss'
import HeaderModule from './header'

export class Module extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			infoShow: false,
		}
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.action &&
			prevProps.selectFilters &&
			this.props.selectFilters &&
			!_.isEqual(
				prevProps.selectFilters.values[prevProps.moduleKey],
				this.props.selectFilters.values[this.props.moduleKey]
			)
		) {
			this.props.action(
				this.props.selectFilters.values[this.props.moduleKey],
				this.props.moduleKey
			)
		}
	}

	changeInfoStatus = () => {
		this.setState({
			infoShow: !this.state.infoShow,
		})
	}

	render() {
		const {
			children,
			references,
			bodyClass,
			isEmpty,
			containerClass,
		} = this.props
		const { infoShow } = this.state

		const moduleContainer = cx(
			'shadow-1 grid-container col-12',
			style.moduleContainer,
			containerClass
		)

		const referencesClass = cx('font-secondary-second', style.references)
		const moduleContainerBody = cx(style.moduleContainerBody, bodyClass, {
			[style['moduleContainerBody--empty']]: isEmpty,
		})

		return (
			<div className={moduleContainer}>
				<div className={style.moduleContainerHeader}>
					<HeaderModule
						{...this.props}
						changeInfoStatus={this.changeInfoStatus}
						infoShow={infoShow}
					/>
				</div>
				<div className={moduleContainerBody}>{children}</div>
				{references && (
					<div className={referencesClass}>
						{references.map((ref, index) => (
							<div className={style.referenceItem} key={index}>
								<span className={ref.className} />
								{ref.text}
							</div>
						))}
					</div>
				)}
				{isEmpty && <div className={style.moduleEmpty}>No Data Available</div>}
			</div>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	selectFilters: makeSelectSelectFilters(),
})

Module.defaultProps = {
	action: () => {},
	isEmpty: false,
}

Module.propTypes = {
	action: PropTypes.func.isRequired,
	bodyClass: PropTypes.string,
	containerClass: PropTypes.string,
	isEmpty: PropTypes.bool,
}

export default connect(
	mapStateToProps,
	{}
)(Module)
