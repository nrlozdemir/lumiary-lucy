import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticCompareShares } from 'Reducers/panoptic'

import classnames from 'classnames'
import style from './style.scss'
import RadarChart from 'Components/Charts/Panoptic/RadarChart'
import ProgressBar from 'Components/ProgressBar'

import Module from 'Components/Module'

class CompareShares extends React.Component {
	callBack = (data, moduleKey) => {
		this.props.getCompareSharesData(data)
	}
	render() {
		const {
			compareSharesData: { data, loading, error },
		} = this.props
		return (
			<Module
				moduleKey={'Panoptic/compareShares'}
				title="Dominant Color On Facebook and YouTube By Shares"
				action={this.callBack}
				filters={[
					{
						type: 'timeRange',
						selectKey: 'PCS-wds',
						placeHolder: 'Date',
					},
				]}
			>
				{data && data.length > 0 && (
					<div className={style.radarChartComparison}>
						<div className={style.radarComponent}>
							<p className={style.radarTitle}>{data[0].type}</p>
							<div className={style.radarComponentContainer}>
								<RadarChart data={data[0].datas} />
							</div>
							<div className={style.progressBarArea}>
								{data[0].progress.map((progressItem, index) => (
									<div
										key={index}
										className={classnames(
											style.reverse,
											style.progressBarInner
										)}
									>
										<p className={style.progressText}>
											<span className={style.leftTitle}>
												<span
													className={style.dot}
													style={{ background: progressItem.color }}
												/>
												<span>{progressItem.leftTitle}</span>
											</span>
											<span className={style.rightTitle}>
												{progressItem.rightTitle}
											</span>
										</p>
										<ProgressBar
											width={progressItem.value}
											customBarClass={style.progressBar}
											customPercentageClass={style.percentageBlue}
										/>
									</div>
								))}
							</div>
						</div>
						<div className={style.progressCountArea}>
							<span className={style.progressCount}>1</span>
							<span className={style.progressCount}>2</span>
							<span className={style.progressCount}>3</span>
						</div>
						<div className={style.radarComponent}>
							<p className={style.radarTitle}>{data[1].type}</p>
							<div className={style.radarComponentContainer}>
								<RadarChart data={data[1].datas} />
							</div>
							<div className={style.progressBarArea}>
								{data[1].progress.map((progressItem, index) => (
									<div key={index} className={style.progressBarInner}>
										<p className={style.progressText}>
											<span className={style.leftTitle}>
												<span
													className={style.dot}
													style={{ background: progressItem.color }}
												/>
												<span>{progressItem.leftTitle}</span>
											</span>
											<span className={style.rightTitle}>
												{progressItem.rightTitle}
											</span>
										</p>
										<ProgressBar
											width={progressItem.value}
											customBarClass={style.progressBar}
											customPercentageClass={style.percentageBlue}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</Module>
		)
	}
}

{
  /*
const CompareShares = ({ radarData, handleSelectFilters, selectDate }) => {
  const compareSharesContainer = classnames(
    'shadow-1 col-12 mt-48 mb-48',
    style.compareSharesContainer
  )
  console.log('radarData', radarData)
  return (
    <div className={compareSharesContainer}>

    </div>
  )
}
*/
}

const mapStateToProps = createStructuredSelector({
	compareSharesData: makeSelectPanopticCompareShares(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(CompareShares)
