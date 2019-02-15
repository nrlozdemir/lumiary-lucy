import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import classnames from 'classnames';
import makeSelectMarketview from 'Selectors/Marketview.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';

import style from './style.scss';

import Select from 'Components/Form/Select';

import { barData, barDataOptions, barDurationData, barDurationOptions } from './options';

/* eslint-disable react/prefer-stateless-function */
export class Marketview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bubbleChartOptions: [
				'#cc2226',
				'#dd501d',
				'#eb7919',
				'#f8b90b',
				'#fff20d',
				'#aac923',
				'#13862b',
				'#229a78',
				'#3178b0',
				'#79609b',
				'#923683',
				'#b83057'
			],
			bubbleChartData: [
				{
					name: 'Facebook',
					value: 124034,
					icon: <span className="qf-iconFacebook" />,
					color: '#fff20d'
				},
				{
					name: 'Instagram',
					value: 75424,
					icon: <span className="qf-iconInstagram" />,
					color: '#cc2226'
				},
				{
					name: 'Twitter',
					value: 63424,
					icon: <span className="qf-iconTwitter" />,
					color: '#13862b'
				},
				{
					name: 'Pinterest',
					value: 34543,
					icon: <span className="qf-iconYoutube" />,
					color: '#923683'
				},
				{
					name: 'Youtube',
					value: 65463,
					icon: <span className="qf-iconPinterest" />,
					color: '#3178b0'
				}
			]
		};
	}

	handleChange = (selectedOption, name) => {
		this.setState({ [name]: selectedOption });
	};

	render() {
		const { bubbleChartOptions, bubbleChartData } = this.state;
		const { views, platforms, date } = this.state;

		const cardContainer = classnames('shadow-1 col-12-gutter-20 mb-48', style.cardContainer);

		return (
			<div className="grid-container col-12">
				<div className={style.alignTabs}>
					<Link to="/marketview/platform" className={style.tab}>
						Platform
					</Link>
					<Link to="/marketview/competitor" className={style.tab}>
						Competitor
					</Link>
					<Link to="/marketview/time" className={style.tab}>
						Time
					</Link>
				</div>
				<div className="grid-collapse">
					<div className="col-4 mb-48">
						<div className={style.marketViewCard}>
							<div className={style.marketViewCardTitle}>Color</div>
							<div className={style.marketViewCardDescription}>Top Performing Platform</div>
							<div className={style.marketViewCardDate}>
								<span>Past 3 Months</span>
							</div>

							<div className={style.bubbleChart}>
								{bubbleChartData.map((item, i) => (
									<div key={i} className={style.bubbleChartItem}>
										<style>
											{`.${style.bubbleChartItem}:nth-child(${i + 1}){
												border-color: ${item.color};
											}.${style.bubbleChartItem}:nth-child(${i + 1}):hover{
												background-color: ${item.color};
											}`}
										</style>
										<div className={style.bubbleChartIcon}>{item.icon}</div>
										<div className={style.bubbleChartTooltip}>
											<span>{item.name}</span>
											<span>{item.value} Likes</span>
										</div>
									</div>
								))}
							</div>

							<div className={style.colors}>
								{bubbleChartOptions.map((color, i) => (
									<span key={i} style={{ backgroundColor: color }} />
								))}
							</div>

							<div className={style.marketViewCardDescription}>
								Based on the number of likes for competitors across all platforms
							</div>
							<Link to="/marketview/competitor" className={style.marketViewCardLink}>
								View Platform Metrics <span className="qf-iconRight-Arrow" />
							</Link>
						</div>
					</div>

					<div className="col-4 mb-48">
						<div className={style.marketViewCard}>
							<div className={style.marketViewCardTitle}>Pacing</div>
							<div className={style.marketViewCardDescription}>Top Competitor Similarities</div>
							<div className={style.marketViewCardDate}>
								<span>Past Month</span>
							</div>

							<Pie
								height={220}
								options={{
									responsive: true,
									legend: {
										display: false
									},
									layout: {
										padding: 0
									}
								}}
								data={{
									labels: [ 'Barstool Sports', 'SB Nation', 'ESPN', 'Scout Media', 'Fansided' ],
									datasets: [
										{
											data: [ 50, 20, 15, 10, 5 ],
											borderColor: '#303a5d',
											backgroundColor: [ '#51adc0', '#8567f0', '#ff556f', '#acb0be', '#5a6386' ],
											hoverBackgroundColor: [
												'#51adc0',
												'#8567f0',
												'#ff556f',
												'#acb0be',
												'#5a6386'
											]
										}
									]
								}}
							/>

							<div className={style.marketViewCardSubTitle}>Medium Paced</div>

							<div
								className={classnames(style.colorListSmall, style.colorListHorizontal, style.colorList)}
							>
								<div className={style.colorListItem}>Barstool Sports</div>
								<div className={style.colorListItem}>SB Nation</div>
								<div className={style.colorListItem}>ESPN</div>
								<div className={style.colorListItem}>Scout Media</div>
								<div className={style.colorListItem}>Fansided</div>
							</div>

							<div className={style.marketViewCardDescription}>
								Based on the number of likes for competitors across all platforms
							</div>
							<Link to="/marketview/platform" className={style.marketViewCardLink}>
								View Competitor Metrics <span className="qf-iconRight-Arrow" />
							</Link>
						</div>
					</div>

					<div className="col-4 mb-48">
						<div className={style.marketViewCard}>
							<div className={style.marketViewCardTitle}>Format</div>
							<div className={style.marketViewCardDescription}>Performance Over Time</div>
							<div className={style.marketViewCardDate}>
								<span>On Mondays</span>
							</div>

							<div className={style.hoverImage}>
								<img src="https://picsum.photos/250/140?image=10" alt="" />
								<img src="https://picsum.photos/250/140?image=11" alt="" />
							</div>

							<div className={style.marketViewCardSubTitle}>Stop Motion</div>

							<div className={style.formatItems}>
								<div className={style.formatItem}>
									<div className={style.formatItemIcon}>
										<span className="qf-iconRight-Arrow" />
									</div>
									<div className={style.formatItemText}>
										<span>36</span>
										<span>Stop Motion</span>
										<span>categories</span>
									</div>
								</div>

								<div className={style.formatItem}>
									<div className={style.formatItemIcon}>
										<span className="qf-iconRight-Arrow" />
									</div>
									<div className={style.formatItemText}>
										<span>12</span>
										<span>Animation</span>
										<span>categories</span>
									</div>
								</div>

								<div className={style.formatItem}>
									<div className={style.formatItemIcon}>
										<span className="qf-iconRight-Arrow" />
									</div>
									<div className={style.formatItemText}>
										<span>28</span>
										<span>Live Action</span>
										<span>categories</span>
									</div>
								</div>

								<div className={style.formatItem}>
									<div className={style.formatItemIcon}>
										<span className="qf-iconRight-Arrow" />
									</div>
									<div className={style.formatItemText}>
										<span>10</span>
										<span>Cinemagraph</span>
										<span>categories</span>
									</div>
								</div>
							</div>

							<div className={style.marketViewCardDescription}>
								Based on the number of likes for competitors across all platforms
							</div>
							<Link to="/marketview/time" className={style.marketViewCardLink}>
								View Time Metrics <span className="qf-iconRight-Arrow" />
							</Link>
						</div>
					</div>
				</div>

				<div className="grid-collapse">
					<div className={cardContainer}>
						<div className={style.cardTitle}>
							<span>Total Views For All Platforms In The Past Month</span>
							<div className={style.selects}>
								<Select
									name="views"
									customClass="custom-select"
									placeholder="Select Views"
									value={views || ''}
									onChange={(option) => this.handleChange(option, 'views')}
									options={[
										{ value: 'Views', label: 'Views' },
										{ value: 'Comments', label: 'Comments' }
									]}
								/>
								<Select
									name="platforms"
									customClass="custom-select"
									placeholder="Select Platforms"
									value={platforms || ''}
									onChange={(option) => this.handleChange(option, 'platforms')}
									options={[ { value: 'All Platforms', label: 'All Platforms' } ]}
								/>
								<Select
									name="date"
									customClass="custom-select"
									placeholder="Select Date"
									value={date || ''}
									onChange={(option) => this.handleChange(option, 'date')}
									options={[
										{ value: 'Past Month', label: 'Past Month' },
										{ value: 'Past Year', label: 'Past Year' }
									]}
								/>
							</div>
						</div>
						<div className="grid-collapse">
							<div className="col-6">
								<Bar
									data={{
										labels: barData.labels,
										datasets: barData.datasets.map((data, index) => {
											const indexValues = data.data.map((v, i) => {
												return barData.datasets.map((d) => d.data[i]);
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
										<div className={style.colorListItem}>Barstool Sports</div>
										<div className={style.colorListItem}>SB Nation</div>
										<div className={style.colorListItem}>ESPN</div>
										<div className={style.colorListItem}>Scout Media</div>
										<div className={style.colorListItem}>Fansided</div>
									</div>
									<div className={style.doughnutChart}>
										<Doughnut
											options={{
												responsive: false,
												legend: {
													display: false
												},
												layout: {
													padding: 0
												}
											}}
											width={300}
											height={300}
											data={{
												labels: [
													'Barstool Sports',
													'SB Nation',
													'ESPN',
													'Scout Media',
													'Fansided'
												],
												datasets: [
													{
														data: [ 50, 20, 15, 10, 5 ],
														borderColor: '#303a5d',
														backgroundColor: [
															'#51adc0',
															'#8567f0',
															'#ff556f',
															'#acb0be',
															'#5a6386'
														],
														hoverBackgroundColor: [
															'#51adc0',
															'#8567f0',
															'#ff556f',
															'#acb0be',
															'#5a6386'
														]
													}
												]
											}}
										/>
										<div className="poa-middle text-center">
											Past Month
											<br />
											Combinded
											<br />
											Views
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className={cardContainer}>
						<div className={style.cardTitle}>
							<span>Total Competitor Views By Duration</span>
							<div className={classnames(style.colorListHorizontal, style.colorList)}>
								<div className={style.colorListItem}>Barstool Sports</div>
								<div className={style.colorListItem}>SB Nation</div>
								<div className={style.colorListItem}>ESPN</div>
								<div className={style.colorListItem}>Scout Media</div>
								<div className={style.colorListItem}>Fansided</div>
							</div>
						</div>
						<Bar data={barDurationData} width={500} options={barDurationOptions} height={100} />
					</div>
				</div>
			</div>
		);
	}
}

Marketview.propTypes = {
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
	marketview: makeSelectMarketview()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Marketview);
