"use strict";

import React from "react";
// Components
import { Pie, Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

// Styles
import style from "./styles.scss";
import Card from "../../components/Card";
import VerticalPercentage from "../../components/Charts/VerticalPercantage";
import BarChart from "../../components/Charts/BarChart";
import { pieData, lineData, lineWithCustomLabel } from "./options";
import CustomLineGradient from "../../components/Charts/CustomLineGradient";

class Library extends React.Component {
	render() {
		const data = { first: 10, second: 90 };
		return (
			<React.Fragment>
				<div className={style.main}>
					<div className="col-7 mt-10">
						<Card
							title="Lumiere Data"
							customHeaderClass="bg-charcoal-grey border-bt-dark"
							customBodyClass="bg-charcoal-grey"
						>
							<div className="col-12">
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
								/>{" "}
							</div>
						</Card>
					</div>
					<div className="col-5 mt-10">
						<Card
							title="Lumiere Data"
							customHeaderClass="bg-charcoal-grey border-bt-dark"
							customBodyClass="bg-charcoal-grey pl-25"
						>
							<div className="col-12 p-10">
								<div className="col1-3">
									<BarChart
										width="1"
										height="2"
										data={[92]}
										avarage="50"
										labels={["Kar"]}
										isGradient
										gradientColors={["#161620", "#2f2e3d"]}
										options={{
											plugins: {
												datalabels: {
													display: false
												}
											},
											tooltips: {
												enabled: false
											},
											legend: {
												display: false
											},
											scales: {
												yAxes: [
													{
														display: false,
														ticks: {
															min: 0,
															max: 100,
															stepSize: 20
														}
													}
												],
												xAxes: [
													{
														barPercentage: 0.75,
														gridLines: {
															display: false
														}
													}
												]
											}
										}}
									/>
								</div>
								<div className="col1-3">
									<BarChart
										width="1"
										height="2"
										data={[76]}
										avarage="75"
										labels={["Kar"]}
										isGradient
										gradientColors={["#161620", "#2f2e3d"]}
										options={{
											plugins: {
												datalabels: {
													display: false
												}
											},

											legend: {
												display: false
											},
											scales: {
												yAxes: [
													{
														display: false,
														ticks: {
															min: 0,
															max: 100,
															stepSize: 20
														}
													}
												],
												xAxes: [
													{
														barPercentage: 0.75,
														gridLines: {
															display: false
														}
													}
												]
											}
										}}
									/>
								</div>
								<div className="col1-3">
									<BarChart
										width="1"
										height="2"
										data={[45]}
										avarage="60"
										labels={["Kar"]}
										isGradient
										gradientColors={["#161620", "#2f2e3d"]}
										options={{
											plugins: {
												datalabels: {
													display: false
												},
												afterDraw: function(chart, options) {
													console.log(chart, options);
												}
											},
											legend: {
												display: false
											},
											scales: {
												yAxes: [
													{
														display: true,
														position: "right",
														gridLines: {
															display: false
														},
														ticks: {
															min: 0,
															max: 100,
															stepSize: 20
														}
													}
												],
												xAxes: [
													{
														barPercentage: 0.75,
														gridLines: {
															display: false
														}
													}
												]
											}
										}}
									/>
								</div>
							</div>
						</Card>
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
							customBodyClass="bg-charcoal-grey  color-white"
						>
							<div className="col-12">
								<CustomLineGradient />
							</div>
						</Card>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Library.propTypes = {};

Library.defaultProps = {};

export default Library;
