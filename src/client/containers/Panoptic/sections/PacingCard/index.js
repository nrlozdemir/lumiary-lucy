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
        data: { horizontalStackedBarData, stadiumData },
        loading,
        error,
      },
    } = this.props

    const isEmpty =
      !!horizontalStackedBarData &&
      !!stadiumData &&
      horizontalStackedBarData.datasets.every((dataset) =>
        dataset.data.every((data) => data === 0)
      ) &&
      stadiumData.every((data) => data.value === 0)

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
        isEmpty={isEmpty}
      >
        <div className={style.pacingCardInner}>
          <div className={style.pacingCardInnerItem}>
            {horizontalStackedBarData && (
              <HorizontalStackedBarChart
                width={500}
                height={340}
                barData={{
                  labels: horizontalStackedBarData.labels,
                  datasets: horizontalStackedBarData.datasets.map(
                    (data, index) => {
                      const indexValues = data.data.map((v, i) => {
                        return horizontalStackedBarData.datasets.map(
                          (d) => d.data[i]
                        )
                      })

                      return {
                        ...data,
                        data: data.data.map((value, i) => {
                          const totalValue = indexValues[i].reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue
                          )
                          return parseFloat(
                            (value / (totalValue / 100)).toFixed(2)
                          )
                        }),
                      }
                    }
                  ),
                }}
                options={barChartOptions}
              />
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
