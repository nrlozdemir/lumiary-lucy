import React from "react";
import Card from "./../../../components/Card";
import BarChart from "../../../components/Charts/BarChart";
import style from "../../Library/styles.scss";
import { videoTabsDataBottom } from "../../Library/options";

class Tabs extends React.Component {
	render() {
		return videoTabsDataBottom.map(video => (
			<React.Fragment key={video.url}>
				<div className="col-1-5">
					<div className="mlr-10 pb-35">
						<Card
							title={video.tabName}
							bottomTitle
							headerIconRight="qf-iconRight-Arrow"
							customHeaderClass="bg-tealish border-bt-dark headerVideoTabs"
							customBodyClass="bg-dark-three box-shadow-black-1"
						>
							<div>
								<div className={style.barChartPosition}>
									<BarChart
										width="4"
										height="3"
										data={[video.value]}
										barBorder
										hasMoreDataset={false}
										barBorderColor="#fff"
										labels={[]}
										yLabels={["100%", "0%"]}
										yLabelsLeft
										options={{
											responsive: true,
											maintainAspectRatio: true,
											tooltips: {
												enabled: false
											},
											layout: {
												padding: {
													left: 0,
													right: 0,
													top: 0,
													bottom: 0
												}
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
														display: true,
														gridLines: {
															display: false
														},
														ticks: {
															min: 0,
															max: 100,
															stepSize: 100,
															beginAtZero: true,
															fontColor: "white",
															fontSize: 8,
															callback: function(value) {
																return value + "%";
															}
														}
													}
												],
												xAxes: [
													{
														barPercentage: 1,
														gridLines: {
															display: false
														}
													}
												]
											}
										}}
									/>
								</div>
								<div className={style.avaragePosition}>
									<p className={style.avarageText}>{video.avarageTitle}</p>
									<p className={style.avarageSecondText}>
										{video.avarageSecondTitle}
									</p>
								</div>
								<div className={style.videoBottomLegend}>
									<p>
										<span className={style.roundWhite} />
										{video.legendTitle}
									</p>
									<p className={style.legendSecondTitle}>
										{video.legendSecondTitle}
									</p>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</React.Fragment>
		));
	}
}

export default Tabs;
