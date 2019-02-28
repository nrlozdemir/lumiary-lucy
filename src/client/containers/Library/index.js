/**
 *
 * Library
 *
 */

import React from "react"
import classNames from "classnames"
import style from "./style.scss"

import { actions, makeSelectLibrary } from "Reducers/library"
import LibraryHeader from './sections/LibraryHeader'
import Sidebar from "./sidebar.js"
import VideoSection from './sections/VideoSection'

/* eslint-disable react/prefer-stateless-function */
export class Library extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sidebarVisible: false
		}
	}

	setSidebarVisible(e) {
		this.setState({ sidebarVisible: e })
	}

	render() {
		const sideBarClass = classNames(style.overlay, {
			[style.overlayShow]: this.state.sidebarVisible
		})
		return (
			<React.Fragment>
				<div className="grid-container col-12">
					<LibraryHeader
						setSidebarVisible={this.setSidebarVisible.bind(this)}
					/>
					<VideoSection />
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

export default Library
