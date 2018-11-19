import React, { Component } from "react";
import Card from "Components/Card";

// Styles
import style from "./styles.scss";
import LineChart from "./Sections/lineChart";

class Panoptic extends Component {
	render() {
		return (
			<div>
				<div className={style.panopticHero}>
					<div className={style.chartPanel + " col-6"}>
						<div className={style.controlGroup}>
							<label className={style.control + " controlCheckbox"}>
								2D Animation
								<input type="checkbox" checked="checked" />
								<div className={style.controlIndicator + " " + style.first} />
							</label>

							<label className={style.control + " controlCheckbox"}>
								Stop Motion
								<input type="checkbox" checked="checked" />
								<div className={style.controlIndicator + " second"} />
							</label>

							<label className={style.control + " controlCheckbox"}>
								Motion Graphics
								<input type="checkbox" checked="checked" />
								<div className={style.controlIndicator} />
							</label>

							<label className={style.control + " controlCheckbox"}>
								Live Action
								<input type="checkbox" checked="checked" />
								<div className={style.controlIndicator} />
							</label>
						</div>

						<figure className={style.chart}>
							<img src={require("../../assets/group.png")} />
						</figure>
					</div>

					<div className={style.resultsPanel + " col-3"}>
						<div className={style.wrapper}>
							<h4 className={style.title}>Engagement Rate</h4>
							<div className={style.outer}>
								<div className={style.outerWrapFirst}>
									<div className={style.skewBarFirst} />
								</div>
								<p>69%</p>
							</div>

							<div className={style.outer}>
								<div className={style.outerWrapSecond}>
									<div className={style.skewBarSecond} />
								</div>
								<p>21%</p>
							</div>
							<div className={style.outer}>
								<div className={style.outerWrapThird}>
									<div className={style.skewBarThird} />
								</div>
								<p>10%</p>
							</div>

							<div className={style.outer}>
								<div className={style.outerWrapFourth}>
									<div className={style.skewBarFourth} />
								</div>
								<p>1%</p>
							</div>
						</div>
					</div>
					<div className={style.rightPanel + " col-3"}>
						<p className={style.panelHeading}>
							High Impact Moments <span className={style.bottomBorder} />
						</p>
						<div className={style.panelContents}>
							<div className={style.listing}>
								<Card removeHeader>
									<div className={style.card}>
										<img
											className={style.cardImage}
											src="https://picsum.photos/200/115/"
										/>
										<div className={style.content}>
											<div className="col-12">
												<p className={style.cardHeader}>Steve Nash’s Godson…</p>
											</div>
											<div className="grid-container">
												<div className="col-6">
													<p className={style.cardDescription}>
														Likes <br />
														0:32
													</p>
												</div>
												<div className="col-6">
													<button className={style.rightButtonStyle}>
														View
													</button>
												</div>
											</div>
										</div>
									</div>
								</Card>
								<Card removeHeader>
									<div className={style.card}>
										<img
											className={style.cardImage}
											src="https://picsum.photos/200/115/"
										/>
										<div className={style.content}>
											<div className="col-12">
												<p className={style.cardHeader}>Steve Nash’s Godson…</p>
											</div>
											<div className="grid-container">
												<div className="col-6">
													<p className={style.cardDescription}>
														Likes <br />
														0:32
													</p>
												</div>
												<div className="col-6">
													<button className={style.rightButtonStyle}>
														View
													</button>
												</div>
											</div>
										</div>
									</div>
								</Card>
								<Card removeHeader>
									<div className={style.card}>
										<img
											className={style.cardImage}
											src="https://picsum.photos/200/115/"
										/>
										<div className={style.content}>
											<div className="col-12">
												<p className={style.cardHeader}>Steve Nash’s Godson…</p>
											</div>
											<div className="grid-container">
												<div className="col-6">
													<p className={style.cardDescription}>
														Likes <br />
														0:32
													</p>
												</div>
												<div className="col-6">
													<button className={style.rightButtonStyle}>
														View
													</button>
												</div>
											</div>
										</div>
									</div>
								</Card>
								<Card removeHeader>
									<div className={style.card}>
										<img
											className={style.cardImage}
											src="https://picsum.photos/200/115/"
										/>
										<div className={style.content}>
											<div className="col-12">
												<p className={style.cardHeader}>Steve Nash’s Godson…</p>
											</div>
											<div className="grid-container">
												<div className="col-6">
													<p className={style.cardDescription}>
														Likes <br />
														0:32
													</p>
												</div>
												<div className="col-6">
													<button className={style.rightButtonStyle}>
														View
													</button>
												</div>
											</div>
										</div>
									</div>
								</Card>
								<Card removeHeader>
									<div className={style.card}>
										<img
											className={style.cardImage}
											src="https://picsum.photos/200/115/"
										/>
										<div className={style.content}>
											<div className="col-12">
												<p className={style.cardHeader}>Steve Nash’s Godson…</p>
											</div>
											<div className="grid-container">
												<div className="col-6">
													<p className={style.cardDescription}>
														Likes <br />
														0:32
													</p>
												</div>
												<div className="col-6">
													<button className={style.rightButtonStyle}>
														View
													</button>
												</div>
											</div>
										</div>
									</div>
								</Card>
								<Card removeHeader>
									<div className={style.card}>
										<img
											className={style.cardImage}
											src="https://picsum.photos/200/115/"
										/>
										<div className={style.content}>
											<div className="col-12">
												<p className={style.cardHeader}>Steve Nash’s Godson…</p>
											</div>
											<div className="grid-container">
												<div className="col-6">
													<p className={style.cardDescription}>
														Likes <br />
														0:32
													</p>
												</div>
												<div className="col-6">
													<button className={style.rightButtonStyle}>
														View
													</button>
												</div>
											</div>
										</div>
									</div>
								</Card>
								<Card removeHeader>
									<div className={style.card}>
										<img
											className={style.cardImage}
											src="https://picsum.photos/200/115/"
										/>
										<div className={style.content}>
											<div className="col-12">
												<p className={style.cardHeader}>Steve Nash’s Godson…</p>
											</div>
											<div className="grid-container">
												<div className="col-6">
													<p className={style.cardDescription}>
														Likes <br />
														0:32
													</p>
												</div>
												<div className="col-6">
													<button className={style.rightButtonStyle}>
														View
													</button>
												</div>
											</div>
										</div>
									</div>
								</Card>
								<Card removeHeader>
									<div className={style.card}>
										<img
											className={style.cardImage}
											src="https://picsum.photos/200/115/"
										/>
										<div className={style.content}>
											<div className="col-12">
												<p className={style.cardHeader}>Steve Nash’s Godson…</p>
											</div>
											<div className="grid-container">
												<div className="col-6">
													<p className={style.cardDescription}>
														Likes <br />
														0:32
													</p>
												</div>
												<div className="col-6">
													<button className={style.rightButtonStyle}>
														View
													</button>
												</div>
											</div>
										</div>
									</div>
								</Card>
							</div>
						</div>
					</div>
				</div>
				<LineChart />
			</div>
		);
	}
}

// Panoptic.propTypes = {
//   bgImage: PropTypes.string.isRequired

// };

export default Panoptic;
