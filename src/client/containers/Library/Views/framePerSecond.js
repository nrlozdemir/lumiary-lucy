import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import Card from "../../../components/Card";
import TabBar from "../../../components/TabBar";

import { pieData, lineData } from "./../options";
import style from "./../styles.scss";

const FramePerSecond = ({ location }) => {
	const generateBox = () => {
		let table = [];
		for (let i = 0; i < 24; i++) {
			table.push(<div className={style.box} />);
		}
		return table;
	};
	return (
		<Card
			title="Frames Per Second"
			headerIconLeft="qf-iconLeft-Arrow"
			customHeaderClass="bg-tealish border-bt-dark headerVideoTabs"
			customBodyClass="bg-color-custom"
			link={location}
		>
			<div className="grid-collapse">
				<div className="col-4">
					<div className={style.title}>
						<span className="color-white">This</span>
						<span className="color-tealish"> Video</span>
					</div>
					<div className="col-12">
						<div className={style.body}>
							<div className={style.boxes}>{generateBox()}</div>
							{/* temporary solution */}
							<img
								style={{ width: "50%", marginTop: "20px" }}
								src="data:image/png;base64,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
"
							/>
						</div>
						<div className={style.title}> 24 FPS (Film Style)</div>
					</div>
				</div>
				<div className="col-8">
					<TabBar
						items={["General", "Most Views", "Most Comments", "Most Shares"]}
						selectedTabClassName={style.selectedTabForVideoTabs}
						selectedTabPanelClassName={style.selectedPanelForVideoTabs}
					>
						<div className="grid-collapse">
							<div className="col-6">
								<div className={style.title}> Library Data</div>
								<div className="grid-collapse">
									<div className="col-8">
										<Pie
											data={pieData}
											width="200"
											height="200"
											options={{
												responsive: false,
												legend: {
													display: false
												},
												elements: {
													arc: {
														borderWidth: 0
													}
												},
												layout: {
													padding: {
														left: 0,
														right: 0,
														top: 50,
														bottom: 0
													}
												},
												plugins: {
													datalabels: {
														color: "white",
														font: {
															weight: "bold",
															size: "12"
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
									<div className="col-4">
										<ul className={style.videoBriefLegendRight}>
											<li>
												<span className={style.roundWhite} />
												24 FPS
											</li>
											<li>
												<span className={style.roundWhite} />
												23 FPS
											</li>
											<li>
												<span className={style.roundWhite} />
												12 FPS
											</li>
											<li>
												<span className={style.roundWhite} />
												52 FPS
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className={style.title}> Industry Data</div>
								<Bar
									data={pieData}
									width="3"
									height="2"
									options={{
										responsive: true,

										plugins: {
											datalabels: {
												display: true,
												anchor: "end",
												align: "end",
												color: "#1fbad2",
												font: {
													weight: "bold",
													size: "12"
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
										},
										legend: {
											display: false
										},
										layout: {
											padding: {
												left: 0,
												right: 0,
												top: 0,
												bottom: 0
											}
										},
										scales: {
											yAxes: [
												{
													display: false,
													ticks: {
														min: 0,
														max: 100,
														stepSize: 10
													}
												}
											],
											xAxes: [
												{
													display: false,
													categoryPercentage: 0.6,
													barPercentage: 0.6,
													gridLines: {
														display: false
													}
												}
											]
										}
									}}
								/>
								<div className={style.videoBriefLegendBottom}>
									<p>
										<span className={style.roundWhite} />
										24 FPS
									</p>
									<p>
										<span className={style.roundWhite} />
										15 FPS
									</p>
									<p>
										<span className={style.roundWhite} />
										15 FPS
									</p>
									<p>
										<span className={style.roundWhite} />
										15 FPS
									</p>
								</div>
							</div>
						</div>
						<div>
							<img
								style={{ width: "100%" }}
								src="https://picsum.photos/1000/430/
							"
							/>
						</div>
					</TabBar>
				</div>
				<div className="col-12 bg-charcoal-grey">
					<div className="col-6">
						<div className={style.lineTopLabel}>
							<span className="color-white">Change over time for:</span>
							<span className="color-tealish font-bold"> 24 FPS</span>
						</div>
					</div>
					<div className="col-6">
						<div className="float-right">
							<p className={style.videoBriefLegendBottom}>
								<span className={style.roundWhite} />
								This Video
								<span className={style.roundWhite} />
								Your Average Video
							</p>
						</div>
					</div>
				</div>
				<div className="col-12 bg-charcoal-grey">
					<Line
						data={lineData}
						options={{
							legend: {
								display: false
							},
							scales: {
								scaleLabel: { fontColor: "#fff", fontSize: "15" },
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
											max: 100,
											callback: function(value) {
												return ((value / 100) * 100).toFixed(0) + "%";
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
									display: false
								}
							}
						}}
					/>
				</div>
			</div>
		</Card>
	);
};

export default FramePerSecond;
