import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import Card from "../../../components/Card";
import TabBar from "../../../components/TabBar";

import style from "./../styles.scss";

const TabShow = ({
	location,
	icon,
	pieData,
	lineData,
	pieTitle,
	barTitle,
	barData,
	title,
	isGenerateBox,
	consequent,
	littleConsequent,
	compareMode
}) => {
	const generateBox = () => {
		let table = [];
		for (let i = 0; i < 24; i++) {
			table.push(<div className={style.box} />);
		}
		return table;
	};

	return (
		<Card
			title={title}
			headerIconLeft="qf-iconLeft-Arrow"
			customHeaderClass="bg-tealish border-bt-dark headerVideoTabs"
			customBodyClass="bg-color-custom"
			link={location}
		>
			<div className="grid-collapse">
				{compareMode ? (
					<React.Fragment>
						<div className="col-6">
							<div className={style.title}>
								<span className="color-white">This</span>
								<span className="color-tealish"> Video</span>
							</div>
							<div className="col-12">
								<div className={style.body}>
									{/* TODO: temporary solution */}

									{isGenerateBox ? (
										<div className="grid-collapse">
											<div className="col-6">
												<div className={style.boxes}>{generateBox()}</div>
											</div>
											<div className="col-6">
												<img src={icon} />
											</div>
										</div>
									) : (
										<img
											style={{ display: "block", margin: "0 auto" }}
											src={icon}
										/>
									)}
								</div>
								<div className={style.title}>{consequent}</div>
							</div>
						</div>
						<div className="col-6">
							<div className={style.title}>
								<span className="color-white">This</span>
								<span className="color-tealish"> Video</span>
							</div>
							<div className="col-12">
								<div className={style.body}>
									{/* TODO: temporary solution */}

									{isGenerateBox ? (
										<div className="grid-collapse">
											<div className="col-6">
												<div className={style.boxes}>{generateBox()}</div>
											</div>
											<div className="col-6">
												<img src={icon} />
											</div>
										</div>
									) : (
										<img
											style={{ display: "block", margin: "0 auto" }}
											src={icon}
										/>
									)}
								</div>
								<div className={style.title}>{consequent}</div>
							</div>
						</div>
					</React.Fragment>
				) : (
					<div className="col-4">
						<div className={style.title}>
							<span className="color-white">This</span>
							<span className="color-tealish"> Video</span>
						</div>
						<div className="col-12">
							<div className={style.body}>
								{/* TODO: temporary solution */}

								{isGenerateBox ? (
									<div className="grid-collapse">
										<div className="col-6">
											<div className={style.boxes}>{generateBox()}</div>
										</div>
										<div className="col-6">
											<img src={icon} />
										</div>
									</div>
								) : (
									<img
										style={{ display: "block", margin: "0 auto" }}
										src={icon}
									/>
								)}
							</div>
							<div className={style.title}>{consequent}</div>
						</div>
					</div>
				)}

				<div className={compareMode ? "col-12" : "col-8"}>
					<TabBar
						items={["General", "Most Views", "Most Comments", "Most Shares"]}
						selectedTabClassName={style.selectedTabForVideoTabs}
						selectedTabPanelClassName={style.selectedPanelForVideoTabs}
					>
						<div className="grid-collapse">
							<div className="col-6">
								<div className={style.title}>{pieTitle}</div>
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
											{pieData.labels.map((label, i) => (
												<li key={label}>
													<span
														className={style.legendRound}
														style={{
															backgroundColor:
																pieData.datasets[0].backgroundColor[i]
														}}
													/>
													{label}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className={style.title}>{barTitle}</div>
								<Bar
									data={pieData}
									width={compareMode ? 5 : 3}
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
									{barData.labels.map((label, i) => (
										<p key={label}>
											<span
												className={style.legendRound}
												style={{
													backgroundColor:
														barData.datasets[0].backgroundColor[i]
												}}
											/>
											{label}
										</p>
									))}
								</div>
							</div>
						</div>
						<div>
							<img
								className="width-100"
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
							<span className="color-tealish font-bold">
								{littleConsequent}
							</span>
						</div>
					</div>
					<div className="col-6">
						<div className="float-right">
							<p className={style.videoBriefLegendBottom} />
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

export default TabShow;
