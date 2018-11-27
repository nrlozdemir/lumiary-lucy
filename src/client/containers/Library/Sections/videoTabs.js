import React from "react";
import Card from "./../../../components/Card";
import BarChart from "../../../components/Charts/BarChart";
import style from "./../styles.scss";
import { videoTabsData } from "./../options";

class VideoTabs extends React.Component {
	render() {
		return videoTabsData.map(video => (
			<React.Fragment key={video.url}>
				<div className="col-1-5">
					<Card
						title={video.tabName}
						headerIconRight="qf-iconRight-Arrow"
						customHeaderClass="bg-tealish border-bt-dark headerVideoTabs"
						customBodyClass="bg-dark-three box-shadow-black-1"
						link={this.props.location + "/" + video.url}
					>
						<div>
							<div className={style.secondTitle}>{video.secondTitle}</div>
							<div className={style.barChartPosition}>
								<BarChart
									width="3"
									height="4"
									data={[video.value]}
									avarage={video.avarage}
									barBorder
									hasMoreDataset={false}
									barBorderColor="#fff"
									labels={[]}
									yLabels={["100%", "75%", "50%", "25%", "0%"]}
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
														stepSize: 25,
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
			</React.Fragment>
		));
	}
}

export default VideoTabs;
