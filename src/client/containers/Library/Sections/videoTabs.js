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
						customBodyClass="bg-dark-three"
					>
						<div className={style.secondTitle}>{video.secondTitle}</div>
						<div className="col-8 mt-25">
							<BarChart
								width="2"
								height="3"
								data={[video.value]}
								avarage={video.avarage}
								barBorder
								barBorderColor="#fff"
								labels={[]}
								yLabels={["100%", "75%", "50%", "25%", "0%"]}
								yLabelsLeft
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
													fontSize: 11,
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
						<div className="col-4">
							<p className={style.avarageText + " " + "pt-50"}>
								{video.avarageTitle}
							</p>
							<p>{video.avarageSecondTitle}</p>
						</div>
						<div className={style.videoBottomLegend}>
							<p>
								<span className={style.roundWhite} />
								{video.legendTitle}
								{video.legendSecondTitle}
							</p>
						</div>
					</Card>
				</div>
			</React.Fragment>
		));
	}
}

export default VideoTabs;
