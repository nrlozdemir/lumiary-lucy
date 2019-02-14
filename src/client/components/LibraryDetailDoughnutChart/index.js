import React from 'react';
import { Doughnut } from "react-chartjs-2";
import { Field } from "redux-form";

import style from './style.scss';
import { selectOptions, lineChartOptions, doughnutOptions} from './options';
import Select from "Components/Form/Select";
import LineChart from "Components/LineChart/Chart";
import PointerCard from "Components/PointerCard";

class LibraryDetailDoughnutChart extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isDoughnutVisible: true
		}
	}

	changeVisibilityDoughnut() {
		this.setState(prevState => ({
			isDoughnutVisible: !prevState.isDoughnutVisible
		}));
	}

	render(){
		const { isDoughnutVisible } = this.state;
		const { doughnutData, lineChartData } = this.props;
		return (
			<div className="col-12 shadow-1 mt-48 bg-dark-grey-blue">
				<div className={style.radialChartsContainer}>
					{isDoughnutVisible &&
					doughnutData.map((chart, i) => (
						<div
							key={i}
							className={style.radialChart}
							onClick={this.changeVisibilityDoughnut.bind(this)}
						>
							<h1 className="font-primary text-bold text-center">
								{chart.title}
							</h1>
							<div className={style.subtitle}>
								<p className="font-secondary-second font-size-12 text-center">
									{chart.secondTitle}
								</p>
							</div>
							<div className={style.doughnutChartContainer}>
								<Doughnut
									options={doughnutOptions}
									width={124}
									height={124}
									data={{
										labels: ["Red", "Green"],
										datasets: [
											{
												data: [...chart.average],
												borderColor: "#303a5d",
												backgroundColor: [
													"#ffffff",
													"#ffffff",
													"#ffffff",
													"#51adc0"
												],
												hoverBackgroundColor: [
													"#ffffff",
													"#ffffff",
													"#ffffff",
													"#51adc0"
												]
											}
										]
									}}
								/>
								<p className="pt-32">
											<span className={style.textBold}>
												{chart.average[chart.average.length - 1]}%
											</span>{" "}
									of your library is shot in{" "}
									<span className={style.textBold}>
												{chart.secondTitle}
											</span>
								</p>
							</div>
						</div>
					))}
					{!isDoughnutVisible && (
						<div className={style.radialChartsContainer}>
							<div className={style.doughnutPanelTab}>
								<div className={style.doughnutPanelHeader}>
									<div onClick={this.changeVisibilityDoughnut.bind(this)}>
										<i className="qf-iconX" />
										<span className={style.panelTitle}>Frame Rate</span>
									</div>
									<div className={style.headerInfo}>
										<div>
											<p className={style.panelTitle}>24 Fps</p>
										</div>
										<div className={style.formWrapper}>
											<form onSubmit={() => console.log("object")}>
												<Field
													component={Select}
													options={selectOptions}
													id="NumberOfScenes"
													name="NumberOfScenes"
													placeholder="Select One"
													label="Number of Scenes"
													className={style.formWrapper}
												/>
												<Field
													component={Select}
													options={selectOptions}
													id="NumberOfScenes"
													name="NumberOfScenes"
													placeholder="Select One"
													label="Number of Scenes"
													className={style.formWrapper}
												/>
											</form>
										</div>
									</div>
								</div>
								<div className={style.dataWrapper}>
									<div className={style.panelChart}>
										<h1 className="font-primary text-bold text-center">
											Library Data
										</h1>
										<div className={style.doughnutChartContainer}>
											<Doughnut
												options={doughnutOptions}
												width={180}
												height={180}
												data={{
													labels: ["Red", "Green"],
													datasets: [
														{
															data: [30, 12, 6, 52],
															borderColor: "#303a5d",
															backgroundColor: [
																"#ffffff",
																"#ffffff",
																"#ffffff",
																"#51adc0"
															],
															hoverBackgroundColor: [
																"#ffffff",
																"#ffffff",
																"#ffffff",
																"#51adc0"
															]
														}
													]
												}}
											/>
											<p className="pt-32">
												<span className={style.duskRound} />
												<span className={style.textBold}>{52}%</span> of your
												library is shot in{" "}
												<span className={style.textBold}>24fps</span>
											</p>
										</div>
									</div>
									<div className={style.panelChart}>
										<PointerCard
											data={{
												topTitle: "Based on Likes",
												pointerData: 140,
												bottomText: "of your library is shot in",
												likes: 50
											}}
										/>
									</div>
									<div className={style.panelChart}>
										<h1 className="font-primary text-bold text-center">
											Industry Data
										</h1>
										<div className={style.doughnutChartContainer}>
											<Doughnut
												options={doughnutOptions}
												width={180}
												height={180}
												data={{
													labels: ["Red", "Green"],
													datasets: [
														{
															data: [30, 12, 6, 52],
															borderColor: "#303a5d",
															backgroundColor: [
																"#ffffff",
																"#ffffff",
																"#ffffff",
																"#8567f0"
															],
															hoverBackgroundColor: [
																"#ffffff",
																"#ffffff",
																"#ffffff",
																"#8567f0"
															]
														}
													]
												}}
											/>
											<p className="w-75 text-center pt-32">
												<span className={style.purpleRound} />
												<span className={style.textBold}>{52}%</span> of your
												library is shot in{" "}
												<span className={style.textBold}>24fps</span>
											</p>
										</div>
									</div>
								</div>
								<div className="w-100 pt-48 pb-48">
									<LineChart
										backgroundColor="#242b49"
										dataSet={lineChartData}
										width={1070}
										height={291}
										options={lineChartOptions}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		)
	}
};

export default LibraryDetailDoughnutChart;
