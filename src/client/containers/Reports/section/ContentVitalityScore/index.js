import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectReportsContentVitalityScore,
} from 'Reducers/reports'

import chartStyle from './style.scss'
import LineChart from 'Components/Charts/LineChart'

import Module from 'Components/Module'

class ContentVitalityScore extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getContentVitalityScoreData(data)
  }

  render() {
    // const { selectViews, selectPlatforms, selectDate } = this.state;
    const {
      contentVitalityScoreData: { data, loading, error },
    } = this.props

    return (
      <Module
        moduleKey={'Reports/ContentVitalityScore'}
        title="Content Vitality Score Based On Audience"
        action={this.callBack}
        filters={[
          {
            type: 'platform',
            selectKey: 'RCVS-ads',
            placeHolder: 'Platforms',
          },
          {
            type: 'timeRange',
            selectKey: 'RCVS-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        {data && data.datasets && (
          <div
            data-vertical-title="Number Of Videos"
            className={chartStyle.vitalityContainer}
          >
            <LineChart
                chartType="lineStackedArea"
                width={1144}
                height={291}
                backgroundColor="#21243B"
                dataSet={data}
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
        )}
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  contentVitalityScoreData: makeSelectReportsContentVitalityScore(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ContentVitalityScore)
