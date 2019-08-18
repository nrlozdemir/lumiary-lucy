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
//import { AudienceContext } from '../../index'

class ContentVitalityScore extends React.Component {
  //static contextType = AudienceContext //React 16.6

  callBack = (data, moduleKey) => {
    const { type, getAudienceContentVitalityScoreData } = this.props
    //const type = this.context //React 16.6
    getAudienceContentVitalityScoreData({ ...data, type })
  }

  render() {
    const {
      type,
      audienceContentVitalityScoreData: {
        data: { data, platform },
        loading,
        error,
      },
    } = this.props

    const { chartYAxisMax, chartYAxisStepSize } = getCVScoreChartAttributes(
      data
    )

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <ContentVitalityScoreModule
            actionOnProp={type}
            audience={true}
            loading={loading}
            dataKeys={{
              leftKey: 'male',
              leftLabel: 'Males',
              rightKey: 'female',
              rightLabel: 'Females',
              middleKey: 'difference',
              middleLabel: 'Percent Difference',
            }}
            platform={platform}
            data={!loading ? data : {}}
            chartYAxisMax={chartYAxisMax}
            moduleKey={'Audience/ContentVitalityScore'}
            title="Content Vitality Score By Videos Produced Comparison"
            action={this.callBack}
            filters={[
              {
                type: 'platformEngagement',
                selectKey: 'ACOT-ads',
                placeHolder: 'Engagement by Platform',
                customOptions: [
                  {
                    label: 'Facebook',
                    options: [{ value: 'facebook|views', label: 'Views' }],
                  },
                ],
                defaultValue: { value: 'facebook|views', label: 'Views' },
              },
              {
                type: 'dateRange',
                selectKey: 'ACOT-wds',
                placeHolder: 'Date',
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
