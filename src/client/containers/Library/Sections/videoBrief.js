import React from "react";
import Card from "./../../../components/Card";
import BarChart from "./../../../components/Charts/BarChart";
import style from "../styles.scss";

const VideoBrief = () => (
	<React.Fragment>
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
			<div className="col-12 ">
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
				<div className="col-1-3">
					<BarChart
						width="2"
						height="3"
						data={[92]}
						avarage="50"
						labels={["1M Views"]}
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
										barPercentage: 0.65,
										gridLines: {
											display: false
										}
									}
								]
							}
						}}
					/>
				</div>
				<div className="col-1-3">
					<BarChart
						width="2"
						height="3"
						data={[76]}
						avarage="75"
						labels={["60k Likes"]}
						isGradient
						gradientColors={["#161620", "#2f2e3d"]}
						options={{
							tooltips: {
								enabled: false
							},
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
										barPercentage: 0.65,
										gridLines: {
											display: false
										}
									}
								]
							}
						}}
					/>
				</div>
				<div className="col-1-3">
					<BarChart
						width="2"
						height="3"
						data={[45]}
						avarage="60"
						labels={["123K Shares"]}
						yLabels={[
							"1M",
							"500K",
							"250K",
							"100K",
							"50K",
							"40K",
							"20K",
							"15K",
							"10K",
							"0"
						]}
						isGradient
						gradientColors={["#161620", "#2f2e3d"]}
						options={{
							tooltips: {
								enabled: false
							},
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
										gridLines: {
											display: false
										},
										ticks: {
											min: 10,
											max: 100,
											stepSize: 10
										}
									}
								],
								xAxes: [
									{
										barPercentage: 0.65,
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
	</React.Fragment>
);
export default VideoBrief;
