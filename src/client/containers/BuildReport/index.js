/**
 *
 * LibraryDetail
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import classNames from 'classnames'
import style from "./style.scss";
import makeSelectLibraryDetail from "Selectors/LibraryDetail.js";
import { Link, Redirect } from "react-router-dom";


/* eslint-disable react/prefer-stateless-function */
export class BuildReport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			percentage: 0,
			timerRef: null,
		}
	}

	componentDidMount() {
		const { match: { params: { videoId } } } = this.props;
		const { percentage } = this.state;
		if(percentage < 100){
			const timerRef = setInterval(() => {
				this.setState(prevState => {
					return {percentage: prevState.percentage + 1}
				});
			}, 400);
			this.setState({
				timerRef
			})
		}
	}


	render() {
		const { percentage, timerRef } = this.state;
		const { match: { params: { videoId } } } = this.props;
		if(percentage > 99 ){
			clearInterval(timerRef);
			return <Redirect to={`/library/${videoId}`} />
		}
		const active = classNames(
			style.service,
			"active"
		);
		return (
			<div className={style.wrapper}>
				<img src="https://picsum.photos/588/360?image=20" className={style.videoImg}/>
				<div className={style.overlay + " bg-dark-five"}></div>
				<div className={style.buildInfo}>
					<span className={style.buildInfoHeader}>Building Report</span>
					<div>
						<svg id="circle-nav-services" width="100%" height={50 + 'vh'} viewBox="0 0 650 550">
							<g id="service-collection" width="100%" height="100%">
								<text x="270" y="200"><tspan>{percentage ? percentage + '%' : '0%'}</tspan></text>
								<g className={style.service} data-svg-origin="325 185.7109375"
									 transform="matrix(1,0,0,1,0,-250)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175" style={percentage > 8 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
								<g className={style.service} data-svg-origin="324.984375 193.7109375"
									 transform="matrix(1,0,0,1,123.63294274500885,-214.71263682485582)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175" style={percentage > 16 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
								<g className={style.service} data-svg-origin="325 193.7109375"
									 transform="matrix(1,0,0,1,214.71263682485585,-123.63294274500878)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175" style={percentage > 24 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
								<g className={style.service} data-svg-origin="325 193.7109375" transform="matrix(1,0,0,1,250,0)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175" style={percentage > 32 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
								<g className={percentage > 40 ? active : style.service} data-svg-origin="325 193.7109375"
									 transform="matrix(1,0,0,1,214.71263682485585,123.63294274500878)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175" style={percentage > 40 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
								<g className={style.service} data-svg-origin="324.984375 193.7109375"
									 transform="matrix(1,0,0,1,123.63294274500885,214.71263682485582)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175" style={percentage > 48 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
								<g className={style.service} data-svg-origin="324.984375 193.7109375" transform="matrix(1,0,0,1,0,250)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175" style={percentage > 56 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
								<g className={style.service} data-svg-origin="325 185.7109375"
									 transform="matrix(1,0,0,1,-123.63294274500883,214.7126368248558)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175" style={percentage > 64 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
								<g className={style.service} data-svg-origin="324.984375 193.7109375"
									 transform="matrix(1,0,0,1,-214.71263682485582,123.63294274500885)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175" style={percentage > 74 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
								<g className={style.service} data-svg-origin="325 185.7109375"
									 transform="matrix(1,0,0,1,-250,0)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175"style={percentage > 82 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
								<g className={style.service} data-svg-origin="324.984375 193.7109375"
									 transform="matrix(1,0,0,1,-214.71263682485582,-123.63294274500885)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175" style={percentage > 90 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
								<g className={style.service} data-svg-origin="325 185.7109375"
									 transform="matrix(1,0,0,1,-123.63294274500883,-214.7126368248558)">
									<g className="icon-wrapper">
										<circle r="16" cx="325" cy="175" style={percentage > 99 ? {fillOpacity: 1} : {}}></circle>
									</g>
								</g>
							</g>
						</svg>
					</div>
					<div className={style.backlink}>
						<Link to={`/library`}>
							Cancel
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

BuildReport.propTypes = {
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
	libraryDetail: makeSelectLibraryDetail()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(BuildReport);
