import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticPacingCard } from 'Reducers/panoptic'
import Module from 'Components/Module'
import classnames from 'classnames'
import HorizontalStackedBarChart from 'Components/Charts/Panoptic/HorizontalStackedBarChart'
import StadiumChart from 'Components/Charts/Panoptic/StadiumChart'
import style from './style.scss'

const pacingCardContainer = classnames(
	'shadow-1 col-12 mt-72',
	style.pacingCardContainer
)

class PacingCard extends React.Component {
	callBack = (data, moduleKey) => {
		const { getPacingCardData } = this.props
		getPacingCardData(data)
	}

	render() {
		const {
			pacingChartData: {
				data: {
					horizontalStackedBarData = {
						labels: ['Live Action', 'Stop Motion', 'Cinemagraph', 'Animation'],
						datasets: [
							{
								label: 'Slowest',
								backgroundColor: '#2FD7C4',
								borderColor: '#2FD7C4',
								borderWidth: 1,
								data: [10, 3, 5, 1],
							},
							{
								label: 'Slow',
								backgroundColor: '#8562F3',
								borderColor: '#8562F3',
								borderWidth: 1,
								data: [12, 13, 2, 5],
							},
							{
								label: 'Medium',
								backgroundColor: '#5292E5',
								borderColor: '#5292E5',
								borderWidth: 1,
								data: [4, 5, 4, 2],
							},
							{
								label: 'Fast',
								backgroundColor: '#acb0be',
								borderColor: '#acb0be',
								borderWidth: 1,
								data: [9, 8, 1, 4],
							},
						],
					},
					stadiumData,
				},
				loading,
				error,
			},
		} = this.props
		return (
			<Module
				moduleKey={'Panoptic/PacingCard'}
				title="Pacing For Each Format by Performance"
				action={this.callBack}
				filters={[
					{
						type: 'engagement',
						selectKey: 'PCT-asd',
						placeHolder: 'Engagement',
					},
					{
						type: 'timeRange',
						selectKey: 'PCT-wds',
						placeHolder: 'Date',
					},
				]}
			>
				<div className={style.pacingCardInner}>
					<div className={style.pacingCardInnerItem}>
						{horizontalStackedBarData && (
							<HorizontalStackedBarChart barData={horizontalStackedBarData} />
						)}
					</div>
					<div className={style.pacingCardInnerItem}>
						{stadiumData && <StadiumChart data={stadiumData} />}
					</div>
				</div>
			</Module>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	pacingChartData: makeSelectPanopticPacingCard(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(PacingCard)
