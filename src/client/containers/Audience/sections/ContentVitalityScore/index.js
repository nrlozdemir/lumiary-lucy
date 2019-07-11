import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectAudienceContentVitalityScore,
} from 'Reducers/audience'

import { ThemeContext } from 'ThemeContext/themeContext'
import ContentVitalityScoreModule from 'Components/Modules/ContentVitalityScoreModule'
import { makeSelectAuthProfile } from 'Reducers/auth'
import { getCVScoreChartAttributes } from 'Utils/datasets'

class ContentVitalityScore extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceContentVitalityScoreData(data)
  }

  render() {
    const {
      audienceContentVitalityScoreData: { data, loading, error },
    } = this.props

    const { chartYAxisMax, chartYAxisStepSize } = getCVScoreChartAttributes(
      data
    )

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <ContentVitalityScoreModule
            loading={loading}
            dataKeys={{
              leftKey: 'male',
              leftLabel: 'Male Audience',
              rightKey: 'female',
              rightLabel: 'Female Audience',
              middleKey: 'difference',
              middleLabel: 'Percent Difference',
            }}
            data={data}
            chartYAxisMax={chartYAxisMax}
            moduleKey={'Audience/ContentVitalityScore'}
            title="Content Vitality Score By Videos Produced Comparison"
            action={this.callBack}
            filters={[
              {
                type: 'platformEngagement',
                selectKey: 'ACOT-ads',
                placeHolder: 'Engagement by Platform',
              },
              {
                type: 'dateRange',
                selectKey: 'ACOT-wds',
                placeHolder: 'Date',
                defaultValue: 'month',
              },
            ]}
            removeTooltip
            removePointRadius
            xAxesFlatten
            flattenFirstSpace={1}
            flattenLastSpace={5}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      callback: function(value, index, values) {
                        if (value === 0) {
                          return value + ' '
                        } else if (value === chartYAxisMax) {
                          return value
                        } else {
                          return ''
                        }
                      },
                      stepSize: chartYAxisStepSize,
                      fontColor: colors.textColor,
                      max: chartYAxisMax,
                    },
                    gridLines: {
                      color: colors.chartStadiumBarBorder,
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: colors.textColor,
                    },
                    gridLines: {
                      color: colors.chartStadiumBarBorder,
                    },
                  },
                ],
              },
            }}
          />
        )}
      </ThemeContext.Consumer>
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
