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
import { Route, Link } from "react-router-dom"

import { actions, makeSelectLibrary } from "Reducers/library"
import Button from "Components/Form/Button/index.js"
import Input from "Components/Form/Input/index.js"

import style from "./style.scss"
import VideoCard from "Components/VideoCard/index.js"
import Sidebar from "./sidebar.js"

/* eslint-disable react/prefer-stateless-function */
export class Library extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			textVal: "",
			sidebarVisible: false
		}
	}

	componentDidMount() {
		this.props.getVideos()
	}

	setSidebarVisible(e) {
		this.setState({ sidebarVisible: e })
	}

	onChange(e) {
		this.setState({ textVal: e.target.value })
	}

	render() {
		const sideBarClass = classNames(style.overlay, {
			[style.overlayShow]: this.state.sidebarVisible
		})
		if (this.props.library.loading) {
			return <p>Loading</p>
		}
		return (
			<React.Fragment>
				<div className="grid-container col-12">
					<div className={style.headerContainer}>
						<div>
							<Input
								placeholder="Search a video…"
								onChange={e => this.onChange(e)}
								value={this.state.textVal}
								customClass={style.librarySearchInput}
							/>
						</div>
						<div>
							<h1 className="alpha color-white text-center font-primary text-bold">
								Library
							</h1>
						</div>
						<div>
							<Button
								onClick={() => this.setSidebarVisible(true)}
								customClass="float-right font-secondary-first text-bold"
								buttonText="Filter Videos"
								iconRight="qf-iconAdd"
							/>
						</div>
					</div>
					<div className="grid-collapse mt-50">
						{this.props.library.videos.map(video => (
							<Link to={`/library/build-report/${video.id}`} key={video.id}>
								<VideoCard video={video} />
							</Link>
						))}
					</div>
				</div>
				<div
					className={sideBarClass}
					onClick={() => this.setSidebarVisible(false)}
				/>
				<Sidebar
					sidebarVisible={this.state.sidebarVisible}
					setSidebarVisible={e => this.setSidebarVisible(e)}
				/>
			</React.Fragment>
		)
	}
}

Library.propTypes = {
	library: PropTypes.object,
	getVideos: PropTypes.func,
	dispatch: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
	library: makeSelectLibrary()
})

function mapDispatchToProps(dispatch) {
	return {
		getVideos: () => dispatch(actions.loadVideos())
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(Library)
