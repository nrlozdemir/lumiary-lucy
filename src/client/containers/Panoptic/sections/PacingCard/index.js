import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticPacingCard } from 'Reducers/panoptic'

import classnames from 'classnames'
import style from './style.scss'

import SelectFilters from 'Components/SelectFilters'
import HorizontalStackedBarChart from 'Components/Charts/Panoptic/HorizontalStackedBarChart'
import StadiumChart from 'Components/Charts/Panoptic/StadiumChart'

import Module from 'Components/Module'

const pacingCardContainer = classnames(
  'shadow-1 col-12 mt-72',
  style.pacingCardContainer
)

class PacingCard extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getPacingCardData(data)
  }
  render() {
    const {
      pacingChartData: {
        data: { horizontalStackedBarData, stadiumData },
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
