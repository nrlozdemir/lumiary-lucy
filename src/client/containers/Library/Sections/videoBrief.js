import React from "react";
import Card from "Components/Card";
import BarChart from "Components/Charts/BarChart";
// import TabBar from "../../../components/TabBar";
import style from "../styles.scss";
import { barChart } from "./../options";

const VideoBrief = props => {
	return (
		<React.Fragment>
			<div className="col-6">
				<Card removeHeader customBodyClass="bg-charcoal-grey">
					<div>
						<div className={style.tab}>
							<span className={style.closeButton}>X</span>
							<span
								onClick={() => props.compareModeOff()}
								className={style.tabElementActive}
							>
								Single View
							</span>
							<span
								onClick={() => props.compareModeOn()}
								className={style.tabElement}
							>
								Compare Mode
							</span>
						</div>
						<div className={style.videoImage}>
							<div className={style.video}>
								<div className={style.videoContainer}>
									<div key={props.video.id} className={style.videoContainer}>
										<video id={props.video.id} width="100%">
											<source src={props.video.video} type="video/mp4" />
										</video>
										<span
											onClick={() => {
												const video = document.getElementById(props.video.id);
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
					</div>
				</Card>
			</div>
			<div className="col-6 mt-10">
				<div className="col-12 grid-collapse">
					<div className="col-6">
						<h2 className={style.header}>Meet The Puppet</h2>
					</div>
					<div className="col-6">
						<div className="float-right">
							<span className={"qf-iconFacebook " + style.activeIcon} />
							<span className={"qf-iconInstagram " + style.activeIcon} />
							<span className={"qf-iconSnapchat " + style.deactiveIcon} />
							<span className={"qf-iconTwitter " + style.deactiveIcon} />
							<span className={"qf-iconYotube " + style.deactiveIcon} />
							<span className={"qf-iconPinterest " + style.deactiveIcon} />
						</div>
					</div>
				</div>
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
						{barChart.map(bar => (
							<div className="col-1-3" key={bar.label[0]}>
								<BarChart
									width="3"
									height="4"
									data={bar.data}
									avarage={bar.avarage}
									labels={bar.label}
									yLabels={bar.yLabels}
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
														stepSize: 10
													}
												}
											],
											xAxes: [
												{
													barPercentage: 0.95,
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

export default VideoBrief;
