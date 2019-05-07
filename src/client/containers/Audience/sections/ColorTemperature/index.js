import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceColorTemperature } from 'Reducers/audience'
import ColorTemperatureModule from 'Components/Modules/ColorTemperatureModule'
import chartStyle from './style.scss'

class ColorTemperature extends React.Component {
	callBack = (data) => {
		this.props.getAudienceColorTemperatureData(data)
	}

	render() {
		const {
			audienceColorTemperatureData: { data, loading, error },
		} = this.props

		return (
			<ColorTemperatureModule
				moduleKey="Audience/ColorTemperature"
				extraClasses={chartStyle.colorChartWrapper}
				data={data}
				title="Color Temperature / Sentiment Comparison"
				action={this.callBack}
				legend={[
					{ label: 'Male', color: 'redRound' },
					{ label: 'Female', color: 'purpleRound' },
				]}
				filters={[
					{
						type: 'timeRange',
						selectKey: 'ACT-wds',
						placeHolder: 'Date',
					},
				]}
			/>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	audienceColorTemperatureData: makeSelectAudienceColorTemperature(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(ColorTemperature)
