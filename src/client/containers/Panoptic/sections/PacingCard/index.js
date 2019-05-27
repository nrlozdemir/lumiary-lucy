import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticPacingCard } from 'Reducers/panoptic'
import Module from 'Components/Module'

import classnames from 'classnames'
import HorizontalStackedBarChart from 'Components/Charts/HorizontalStackedBarChart'
import { barChartOptions } from './options'
import StadiumChart from 'Components/Charts/Panoptic/StadiumChart'
import { isEmpty } from 'lodash'
import { isDataSetEmpty } from 'Utils'
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
        data,
        data: { horizontalStackedBarData, stadiumData },
        loading,
        error,
      },
    } = this.props
    const hasNoData =
      (!loading &&
        (isDataSetEmpty(horizontalStackedBarData) &&
          !!stadiumData &&
          horizontalStackedBarData.datasets.every((dataset) =>
            dataset.data.every((data) => data === 0)
          ) &&
          stadiumData.datasets.every((dataset) =>
            dataset.data.every((data) => data === 0)
          ))) ||
      isEmpty(data)

    const stadiumValues =
      stadiumData &&
      stadiumData.datasets.map((item, idx) => ({
        title: item.label,
        value: item.data[idx] || 0,
        color: item.backgroundColor,
      }))

    return (
      <Module
        moduleKey={'Panoptic/PacingCard'}
        title="Pacing For Each Format by Performance"
        action={this.callBack}
        filters={[
          {
            type: 'metric',
            selectKey: 'PCT-asd',
            placeHolder: 'Engagement',
          },
          {
            type: 'dateRange',
            selectKey: 'PCT-wds',
            placeHolder: 'Date',
          },
        ]}
        isEmpty={hasNoData}
      >
        <div className={style.pacingCardInner}>
          <div className={style.pacingCardInnerItem}>
            <HorizontalStackedBarChart
              width={500}
              height={340}
              barData={horizontalStackedBarData}
              options={barChartOptions}
            />
          </div>
          <div className={style.pacingCardInnerItem}>
            <StadiumChart data={stadiumValues} />
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
