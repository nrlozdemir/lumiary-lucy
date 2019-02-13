/**
 *
 * Library
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import classNames from "classnames";
import { compose } from "redux";
import { Link } from "react-router-dom";
import style from "./style.scss";

import makeSelectLibrary from "Selectors/Library.js";
import { actions } from "Reducers/Library";
import VideoCard from "Components/VideoCard";
import LibraryHeader from 'Components/LibraryHeader'
import Sidebar from "./sidebar.js";
import VideoCardList from "../../components/VideoCardList";


/* eslint-disable react/prefer-stateless-function */
export class Library extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarVisible: false
		};
	}

	componentDidMount() {
		this.props.getVideos();
	}

	setSidebarVisible(e) {
		this.setState({ sidebarVisible: e });
	}

	render() {
		const sideBarClass = classNames(style.overlay, {
			[style.overlayShow]: this.state.sidebarVisible
		});
		if (this.props.library.loading) {
			return <p>Loading</p>;
		}
		return (
			<React.Fragment>
				<div className="grid-container col-12">
					<LibraryHeader
						setSidebarVisible={this.setSidebarVisible.bind(this)}
					/>
					<div className="grid-collapse mt-50">
						<VideoCardList
							data={this.props.library.videos}
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
				/>
			</React.Fragment>
		);
	}
}

Library.propTypes = {
	library: PropTypes.object,
	getVideos: PropTypes.func,
	dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
	library: makeSelectLibrary()
});

function mapDispatchToProps(dispatch) {
	return {
		getVideos: () => dispatch(actions.loadVideos())
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(Library);
