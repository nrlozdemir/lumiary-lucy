/**
 *
 * Library
 *
 */

import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import classNames from "classnames"
import { compose } from "redux"
import style from "./style.scss"

import { actions, makeSelectLibrary } from "Reducers/library"
import VideoCardList from "Components/VideoCardList"
import LibraryHeader from './sections/LibraryHeader'
import Sidebar from "./sidebar.js"
import RouterLoading from "Components/RouterLoading"

/* eslint-disable react/prefer-stateless-function */
export class Library extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sidebarVisible: false
		}
	}

	componentDidMount() {
		this.props.getVideos()
	}

	setSidebarVisible(e) {
		this.setState({ sidebarVisible: e })
	}

	handleSubmit(e) {
		this.props.changeFilter(e)
	}

	render() {
		const sideBarClass = classNames(style.overlay, {
			[style.overlayShow]: this.state.sidebarVisible
		})
		if (!this.props.library.videos || this.props.library.loading) {
			return <RouterLoading/>
		}
		return (
			<React.Fragment>
				<div className="grid-container col-12">
					<LibraryHeader
						setSidebarVisible={this.setSidebarVisible.bind(this)}
					/>
					<div className="grid-collapse mt-50">
						<VideoCardList
							data={this.props.library.sortedVideos}
						/>
					</div>
				</div>
				<div
					className={sideBarClass}
					onClick={() => this.setSidebarVisible(false)}
				/>
				<Sidebar
					sidebarVisible={this.state.sidebarVisible}
					setSidebarVisible={e => this.setSidebarVisible(e)}
					onSubmit={e => this.handleSubmit(e)}
				/>
			</React.Fragment>
		)
	}
}

Library.propTypes = {
	library: PropTypes.object,
	getVideos: PropTypes.func,
	changeFilter: PropTypes.func,
	dispatch: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
	library: makeSelectLibrary()
})

function mapDispatchToProps(dispatch) {
	return {
		getVideos: () => dispatch(actions.loadVideos()),
		changeFilter: e => dispatch(actions.changeFilter(e))
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(Library)
