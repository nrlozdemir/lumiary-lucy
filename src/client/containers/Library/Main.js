"use strict";

import React from "react";
import PropTypes from "prop-types";
// Components
import { Pie, Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

// Styles
import style from "./styles.scss";
import Card from "../../components/Card";
import BarChart from "../../components/Charts/BarChart";
import { pieData, lineData, lineWithCustomLabel } from "./options";
import CustomLineGradient from "../../components/Charts/CustomLineGradient";
import TabBar from "../../components/TabBar";
import VideoBrief from "./Sections/videoBrief";

class Library extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className={style.main}>
					<div className="col-7">
						<Card removeHeader customBodyClass="bg-charcoal-grey">
							<TabBar
								items={["Single View", "Compare Mode"]}
								selectedTabClassName={style.selectedTabs}
								selectedTabPanelClassName={style.selectedPanel}
								tablistClassName={style.tablList}
							>
								<div>
									<span
										className={style.closeButton}
										onClick={() => this.props.router.push(`/`)}
									>
										X
									</span>
									<div className={style.videoImage}>
										<span className={style.videoIcon + " qf-iconPlay"}>
											<span className="path1" />
											<span className="path2" />
											<span className="path3" />
											<span className="path4" />
											<span className="path5" />
											<span className="path6" />
										</span>
										<img
											style={{ width: "100%" }}
											src="https://picsum.photos/1000/430/?random
							"
										/>
									</div>
								</div>
								<div>
									<span
										className={style.closeButton}
										onClick={() => this.props.router.push(`/`)}
									>
										X
									</span>
									<img
										style={{ width: "100%" }}
										src="https://picsum.photos/1000/430/
							"
									/>
								</div>
							</TabBar>
						</Card>
					</div>
					<div className="col-5 mt-10">
						<VideoBrief />
					</div>
					<div className="col-12 mt-10">
						<Card
							title="Lumiere Data"
							customHeaderClass="bg-tealish border-bt-dark"
							customBodyClass="bg-dark-three box-shadow-black-1 color-white"
						>
							<div className="col-5 p-25 ">
								<Pie
									data={pieData}
									options={{
										responsive: true,
										legend: {
											position: "right",
											labels: {
												fontColor: "#fff"
											}
										},
										plugins: {
											datalabels: {
												color: "white",
												font: {
													weight: "bold"
												},
												formatter: (value, ctx) => {
													let sum = 0;
													let dataArr = ctx.chart.data.datasets[0].data;
													dataArr.map(data => {
														sum += data;
													});
													let percentage =
														((value * 100) / sum).toFixed(2) + "%";
													return percentage;
												}
											}
										},
										tooltips: {
											enabled: false
										}
									}}
								/>
							</div>
							<div className="col-7">
								<Line
									data={lineData}
									options={{
										legend: false,
										scales: {
											xAxes: [
												{
													gridLines: {
														color: "#000",
														borderDash: [5, 10.15]
													}
												}
											],
											yAxes: [
												{
													id: "right-y-axis",
													type: "linear",
													position: "right",
													gridLines: {
														display: false
													}
												}
											]
										},
										ticks: {
											display: false
										},
										layout: {
											padding: {
												left: 50,
												right: 50,
												bottom: 50,
												top: 50
											}
										},

										plugins: {
											datalabels: {
												display: false
											}
										}
									}}
								/>
							</div>
						</Card>
					</div>
					<div className="col-12 mt-10">
						<Card
							title="Lumiere Data"
							customHeaderClass="bg-tealish border-bt-dark"
							customBodyClass="bg-charcoal-grey  color-white"
						>
							<div className="col-7">
								<Line
									data={lineData}
									options={{
										legend: false,
										scales: {
											xAxes: [
												{
													gridLines: {
														color: "#000",
														borderDash: [5, 10.15]
													}
												}
											],
											yAxes: [
												{
													id: "right-y-axis",
													type: "linear",
													position: "right",
													gridLines: {
														display: false
													}
												}
											]
										},
										ticks: {
											display: false
										},
										layout: {
											padding: {
												left: 50,
												right: 50,
												bottom: 50,
												top: 50
											}
										},

										plugins: {
											datalabels: {
												display: false
											}
										}
									}}
								/>
							</div>
						</Card>
					</div>
					<div className="col-12 mt-10">
						<Card
							title="Lumiere Data"
							customHeaderClass="bg-tealish border-bt-dark"
							customBodyClass="bg-charcoal-grey  color-white"
						>
							<div className="col-7">
								<Line
									data={lineWithCustomLabel}
									options={{
										legend: {
											display: true
										},
										scales: {
											xAxes: [
												{
													gridLines: {
														color: "#000",
														borderDash: [5, 10.15]
													}
												}
											],
											yAxes: [
												{
													position: "right",
													gridLines: {
														display: false
													},
													ticks: {
														min: 0,
														max: this.max,
														callback: function(value) {
															return (
																((value / this.max) * 100).toFixed(0) + "%"
															);
														}
													}
												}
											]
										},

										layout: {
											padding: {
												left: 50,
												right: 50,
												bottom: 50,
												top: 50
											}
										},
										tooltips: {
											enabled: false
										},
										plugins: {
											datalabels: {
												color: "#fff",
												font: {
													size: 14,
													weight: "bold"
												},
												// eslint-disable-next-line no-unused-vars
												formatter: (value, ctx, i = 0) => {
													const arr = ctx.dataset.data.filter(
														x => !Number.isNaN(x)
													);
													const val = arr[Math.floor((arr.length - 1) / 2)];
													if (value === val) {
														return "12%...";
													}
													return null;
												}
											}
										}
									}}
								/>
							</div>
						</Card>
					</div>
					<div className="col-12 mt-10">
						<Card
							title="Lumiere Data"
							customHeaderClass="bg-tealish border-bt-dark"
							customBodyClass="bg-dark-three box-shadow-black-1 color-white"
						>
							<div className="col-12 p-25">
								<CustomLineGradient />
							</div>
						</Card>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Library.propTypes = { router: PropTypes.object };

Library.defaultProps = {};

export default Library;
