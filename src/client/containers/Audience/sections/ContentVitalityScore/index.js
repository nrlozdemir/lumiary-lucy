import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceContentVitalityScore } from 'Reducers/audience'
import Module from 'Components/Module'
import cx from 'classnames'
import LineChart from 'Components/Charts/LineChart'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import chartStyle from './style.scss'

class ContentVitalityScore extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceContentVitalityScoreData(data)
  }

  render() {
    // const { selectViews, selectPlatforms, selectDate } = this.state;
    const {
      audienceContentVitalityScoreData: { data, loading, error },
		} = this.props

    const percentageCol = cx('col-4', chartStyle.percentageCol)

    return (
      <Module
        moduleKey={'Audience/ContentVitalityScore'}
        title="Content Vitality Score Based On Audience"
        action={this.callBack}
        filters={[
          {
            type: 'platform',
            selectKey: 'ACOT-ads',
            placeHolder: 'Platforms',
          },
          {
            type: 'timeRange',
            selectKey: 'ACOT-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        {data && data.datasets && (
          <div className="w-100">
            <div data-vertical-title="Number Of Videos" className={chartStyle.vitalityContainer}>
              <LineChart
                chartType="lineStackedArea"
                width={1140}
                height={291}
                backgroundColor="#21243B"
                dataSet={{
									labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
									datasets: data.datasets
								}}
                removeTooltip
                removePointRadius
                xAxesFlatten
                flattenFirstSpace={1}
                flattenLastSpace={5}
                options={{
                  scales:{
                    yAxes: [{
                      ticks: {
                        callback: function(value, index, values) {
                          if(value === 0) {
                            return value + ' '
                          } else if(value === 250) {
                            return value
                          } else {
                            return ''
                          }
                        }
                      }
                    }]
                  }
                }}
              />
            </div>
            <div className="row">
              <div className={percentageCol} data-title="Male Audience">
                <PercentageBarGraph
                  id={"percentageContainer-1"}
                  percentage={33.4}
                  color='#5292E5'
                />
              </div>
              <div className={percentageCol} data-title="Your Library">
                <PercentageBarGraph
                  id={"percentageContainer-2"}
                  percentage={40.1}
                  color='#8562F3'
                />
              </div>
              <div className={percentageCol} data-title="Female Audience">
                <PercentageBarGraph
                  id={"percentageContainer-3"}
                  percentage={46.8}
                  color='#2FD7C4'
                />
              </div>
            </div>
          </div>
        )}
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audienceContentVitalityScoreData: makeSelectAudienceContentVitalityScore(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ContentVitalityScore)
