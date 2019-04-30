import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticColorTemperature } from 'Reducers/panoptic'

import { platforms, selectOneOptions, selectTwoOptions } from './options'
import ColorTemperatureModule from 'Components/Modules/ColorTemperatureModule'

import style from './style.scss'

class PanopticColorTemperature extends React.Component {
	callBack = (data) => {
		this.props.getColorTemperatureData(data)
	}

	render() {
		const {
			colorTemperatureData: { data, loading, error },
		} = this.props

		return (
			<ColorTemperatureModule
				extraClasses={style.colorChartContent}
				chartWrapperClass={style.colorTemperatureChartWrapper}
				borderLess
				verticalText
				infoLabels={['Views', 'Likes', 'Comment', 'Shares']}
				moduleKey={'Panoptic/ColorTemperature'}
				data={data}
				title="Color Temperature / Sentiment Comparison"
				action={this.callBack}
				filters={[
					{
						type: 'colorTempature',
						selectKey: 'PCT-asd',
						placeHolder: 'Color Tempature',
					},
					{
						type: 'timeRange',
						selectKey: 'PCT-wds',
						placeHolder: 'Date',
					},
				]}
			>
				<div className="d-flex align-items-center justify-content-center ph-48 mv-48">
					{platforms &&
						platforms.map((platform, index) => (
							<div key={index} className="d-flex align-items-center mr-32">
								<span
									className={style.round}
									style={{ backgroundColor: `${platform.color}` }}
								/>
								<p className={style.platformName}>{platform.name}</p>
							</div>
						))}
				</div>
			</ColorTemperatureModule>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	colorTemperatureData: makeSelectPanopticColorTemperature(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(PanopticColorTemperature)
