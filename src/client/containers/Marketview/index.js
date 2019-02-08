/**
 *
 * Marketview
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import makeSelectMarketview from "Selectors/Marketview.js";
import Slider from "react-slick";
import style from "./style.scss";

/* eslint-disable react/prefer-stateless-function */
export class Marketview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nav1: null,
			nav2: null
		};
	}

	componentDidMount() {
		this.setState({
			nav1: this.slider1,
			nav2: this.slider2
		});
	}

	render() {
		const settings = {
			className: "marketViewSlickSlider",
			infinite: false,
			centerMode: true,
			centerPadding: "0",
			slidesToShow: 3,
			speed: 500,
			arrows: false,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 1
					}
				}
			]
		};
		const settings2 = {
			className: "dots",
			infinite: false,
			centerMode: true,
			centerPadding: "0",
			slidesToShow: 3,
			speed: 500,
			arrows: false,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 1
					}
				}
			]
		};
		return (
			<React.Fragment>
				<div className={style.section}>
					<Slider
						{...settings}
						asNavFor={this.state.nav2}
						ref={slider => (this.slider1 = slider)}
					>
						<div>
							<article>
								<div className="col-5 img-box">
									<img src="http://placehold.it/200x385" alt="" />
								</div>
								<div className="col-7">
									<h1>1</h1>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Corrupti quos iusto praesentium, vitae officia similique, quo
									sapiente obcaecati modi quia laborum facere. Aut odit fugit
									architecto aperiam nam distinctio, debitis!
								</div>
							</article>
						</div>
						<div>
							<article>
								<div className="col-5 img-box">
									<img src="http://placehold.it/200x385" alt="" />
								</div>
								<div className="col-7">
									<h1>2</h1>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Corrupti quos iusto praesentium, vitae officia similique, quo
									sapiente obcaecati modi quia laborum facere. Aut odit fugit
									architecto aperiam nam distinctio, debitis!
								</div>
							</article>
						</div>
						<div>
							<article>
								<div className="col-5 img-box">
									<img src="http://placehold.it/200x385" alt="" />
								</div>
								<div className="col-7">
									<h1>3</h1>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Corrupti quos iusto praesentium, vitae officia similique, quo
									sapiente obcaecati modi quia laborum facere. Aut odit fugit
									architecto aperiam nam distinctio, debitis!
								</div>
							</article>
						</div>
						<div>
							<article>
								<div className="col-5 img-box">
									<img src="http://placehold.it/200x385" alt="" />
								</div>
								<div className="col-7">
									<h1>4</h1>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Corrupti quos iusto praesentium, vitae officia similique, quo
									sapiente obcaecati modi quia laborum facere. Aut odit fugit
									architecto aperiam nam distinctio, debitis!
								</div>
							</article>
						</div>
						<div>
							<article>
								<div className="col-5 img-box">
									<img src="http://placehold.it/200x385" alt="" />
								</div>
								<div className="col-7">
									<h1>5</h1>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Corrupti quos iusto praesentium, vitae officia similique, quo
									sapiente obcaecati modi quia laborum facere. Aut odit fugit
									architecto aperiam nam distinctio, debitis!
								</div>
							</article>
						</div>
						<div />
						<div />
					</Slider>
				</div>
				<div className={style.section}>
					<Slider
						asNavFor={this.state.nav1}
						ref={slider => (this.slider2 = slider)}
						{...settings2}
					>
						<div>
							<h3>1</h3>
						</div>
						<div>
							<h3>2</h3>
						</div>
						<div>
							<h3>3</h3>
						</div>
						<div>
							<h3>4</h3>
						</div>
						<div>
							<h3>5</h3>
						</div>
						<div />
						<div />
					</Slider>
				</div>
			</React.Fragment>
		);
	}
}

Marketview.propTypes = {
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
	marketview: makeSelectMarketview()
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

export default compose(withConnect)(Marketview);
