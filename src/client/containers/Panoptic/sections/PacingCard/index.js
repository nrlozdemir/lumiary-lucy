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
      pacingChartData: { data, loading, error },
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
            {data && data.datasets && (
              <HorizontalStackedBarChart barData={data} />
            )}
          </div>
          <div className={style.pacingCardInnerItem}>
            <StadiumChart
              data={[
                { value: 90, color: '#51ADC0', title: 'Slowest' },
                { value: 90, color: '#8567F0', title: 'Slow' },
                { value: 50, color: '#D0506C', title: 'Medium' },
                { value: 100, color: '#ACB0BE', title: 'Fast' },
              ]}
            />
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
