import React, { Component } from "react";
import classnames from "classnames";
import style from "./style.scss";
import { HorizontalBar } from "react-chartjs-2";
import Select from "Components/Form/Select";

class PacingCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleChange = (selectedOption, name) => {
		this.setState({ [name]: selectedOption });
	};

	render() {
		const { barData, barDataOptions } = this.props;
		const { likes, date } = this.state;

		const pacingCardContainer = classnames(
			"shadow-1 col-12 mt-48 mb-48",
			style.pacingCardContainer
		);

		return (
			<div className={pacingCardContainer}>
				<div className={style.componentTitle}>
					<span>Dominant Color, Facebook & YouTube Shares</span>
					<div className={style.selects}>
						<Select
							name="likes"
							customClass="custom-select"
							placeholder="Select Views"
							value={likes || ""}
							onChange={option => this.handleChange(option, "likes")}
							options={[
								{ value: "Likes", label: "Likes" },
								{ value: "Comments", label: "Comments" }
							]}
						/>
						<Select
							name="date"
							customClass="custom-select"
							placeholder="Select Views"
							value={date || ""}
							onChange={option => this.handleChange(option, "date")}
							options={[
								{ value: "Past Month", label: "Past Month" },
								{ value: "Past Year", label: "Past Year" }
							]}
						/>
					</div>
				</div>
				<div className="col-6">
					<HorizontalBar
						data={{
							labels: barData.labels,
							datasets: barData.datasets.map((data, index) => {
								const indexValues = data.data.map((v, i) => {
									return barData.datasets.map(d => d.data[i]);
								});

								return {
									...data,
									data: data.data.map((value, i) => {
										const totalValue = indexValues[i].reduce(
											(accumulator, currentValue) => accumulator + currentValue
										);

										return parseFloat((value / (totalValue / 100)).toFixed(2));
									})
								};
							})
						}}
						width={500}
						options={barDataOptions}
						height={300}
					/>
				</div>
				<div className="col-6">
					<div className="d-flex justify-space-between align-items-center">
						<div className={style.colorList}>
							<div className={style.colorListItem}>Fast</div>
							<div className={style.colorListItem}>Medium</div>
							<div className={style.colorListItem}>Slow</div>
							<div className={style.colorListItem}>Slowest</div>
						</div>
						<div className={style.stadiumCharts} title="Percentage of Library">
							<div className={style.stadiumChart} data="20" title="80% Data">
								<svg xmlns="http://www.w3.org/2000/svg">
									<rect className={style.bar} fill="none" rx="1" />
								</svg>
							</div>
							<div className={style.stadiumChart} data="50" title="50% Data">
								<svg xmlns="http://www.w3.org/2000/svg">
									<rect className={style.bar} fill="none" rx="1" />
								</svg>
							</div>
							<div className={style.stadiumChart} data="45" title="55% Data">
								<svg xmlns="http://www.w3.org/2000/svg">
									<rect className={style.bar} fill="none" rx="1" />
								</svg>
							</div>
							<div className={style.stadiumChart} data="40" title="60% Data">
								<svg xmlns="http://www.w3.org/2000/svg">
									<rect className={style.bar} fill="none" rx="1" />
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PacingCard;
