import React from "react";
import Card from "Components/Card";
import BarChart from "Components/Charts/BarChart";
import { barChartCompare } from "./../../options";
import style from "../../styles.scss";

const CompareVideoBrief = props => {
	return (
		<React.Fragment>
			<div className="col-12">
				<Card removeHeader customBodyClass="bg-dark">
					<div>
						<div className={style.tab}>
							<span
								onClick={() => props.changeCompareMode(false)}
								className={style.tabElement}
							>
								Single View
							</span>
							<span
								onClick={() => props.changeCompareMode(true)}
								className={style.tabElementActive}
							>
								Compare Mode
							</span>
						</div>
						<div className="grid-collapse mt-25">
							<div className="col-6">
								<div className={style.videoImage}>
									<div className={style.video}>
										<div className={style.videoContainer}>
											<div
												key={props.video.id}
												className={style.videoContainer}
											>
												<video id={props.video.id} width="100%">
													<source src={props.video.video} type="video/mp4" />
												</video>
												<span
													onClick={() => {
														const video = document.getElementById(
															props.video.id
														);
														if (video.paused) video.play();
														else video.pause();
													}}
													className={style.videoIcon + " qf-iconPlay"}
												>
													<span className="path1" />
													<span className="path2" />
													<span className="path3" />
													<span className="path4" />
													<span className="path5" />
													<span className="path6" />
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col-12 grid-collapse mt-25">
									<div className="col-6">
										<h2 className={style.header}>Meet The Puppet</h2>
									</div>
									<div className="col-6">
										<div className="float-right">
											<span className={"qf-iconFacebook " + style.activeIcon} />
											<span
												className={"qf-iconInstagram " + style.activeIcon}
											/>
											<span
												className={"qf-iconSnapchat " + style.deactiveIcon}
											/>
											<span
												className={"qf-iconTwitter " + style.deactiveIcon}
											/>
											<span className={"qf-iconYotube " + style.deactiveIcon} />
											<span
												className={"qf-iconPinterest " + style.deactiveIcon}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className={style.videoImage}>
									<div className={style.video}>
										<div className={style.videoContainer}>
											<div
												key={props.video.id}
												className={style.videoContainer}
											>
												<video id={props.video.id + "compare"} width="100%">
													<source src={props.video.video} type="video/mp4" />
												</video>
												<span
													onClick={() => {
														const video = document.getElementById(
															props.video.id + "compare"
														);
														if (video.paused) video.play();
														else video.pause();
													}}
													className={style.videoIcon + " qf-iconPlay"}
												>
													<span className="path1" />
													<span className="path2" />
													<span className="path3" />
													<span className="path4" />
													<span className="path5" />
													<span className="path6" />
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col-12 grid-collapse mt-25">
									<div className="col-6">
										<h2 className={style.header}>The QB advetures</h2>
									</div>
									<div className="col-6">
										<div className="float-right">
											<span className={"qf-iconFacebook " + style.activeIcon} />
											<span
												className={"qf-iconInstagram " + style.activeIcon}
											/>
											<span
												className={"qf-iconSnapchat " + style.deactiveIcon}
											/>
											<span className={"qf-iconTwitter " + style.activeIcon} />
											<span className={"qf-iconYotube " + style.deactiveIcon} />
											<span
												className={"qf-iconPinterest " + style.activeIcon}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</div>
			<div className="col-12 mt-10">
				<Card removeHeader customBodyClass="bg-charcoal-grey pl-25">
					<div className="m-10">
						<div className="col-12">
							<div className="float-right">
								<p className={style.videoBriefLegend}>
									<span className={style.roundGrey} />
									This Video
									<span className={style.roundTealish} />
									Your Average Video
								</p>
							</div>
						</div>
						{barChartCompare.map(bar => (
							<div className="col-1-3" key={bar.label[0]}>
								<BarChart
									width="10"
									height="6"
									data={bar.data}
									hasMoreDataset
									labels={bar.label}
									yLabels={bar.yLabels}
									isGradient
									gradientColors={[["#161620", "#2f2e3d"], ["#fff", "#2f2e3d"]]}
									options={{
										annotation: {
											annotations: [
												{
													id: "line",
													type: "line",
													mode: "horizontal",
													scaleID: "y-axis-0",
													value: bar.avarage,
													borderColor: "#55bdd5",
													borderWidth: 2
												}
											]
										},
										layout: {
											padding: {
												top: 0,
												bottom: 0,
												right: 75,
												left: 75
											}
										},
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
														stepSize: 10
													}
												}
											],
											xAxes: [
												{
													barPercentage: 0.8,
													categorySpacing: 0,
													gridLines: {
														display: false
													}
												}
											]
										}
									}}
								/>
							</div>
						))}
					</div>
				</Card>
			</div>
		</React.Fragment>
	);
};

export default CompareVideoBrief;
