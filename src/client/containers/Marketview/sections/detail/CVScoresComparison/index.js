import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'

import { ThemeContext } from 'ThemeContext/themeContext'
import ContentVitalityScoreModule from 'Components/Modules/ContentVitalityScoreModule'
import { getCVScoreChartAttributes } from 'Utils/datasets'

import {
  actions,
  makeSelectMarketviewContentVitalityScore,
} from 'Reducers/marketview'
import { makeSelectAuthProfile } from 'Reducers/auth'

class ContentVitalityScore extends React.Component {
  callBack = (data, moduleKey) => {
    const { getContentVitalityScoreData, container } = this.props
    getContentVitalityScoreData({ ...data, container })
  }

  render() {
    const {
      title,
      moduleKey,
      filters,
      data: {
        data: { data, platform },
        loading,
        error,
      },
      authProfile = {},
    } = this.props

    const { chartYAxisMax, chartYAxisStepSize } = getCVScoreChartAttributes(
      data
    )

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <ContentVitalityScoreModule
            loading={loading}
            chartYAxisMax={chartYAxisMax}
            data={data}
            authProfile={authProfile}
            moduleKey={moduleKey}
            title={title}
            action={this.callBack}
            filters={filters}
            removeTooltip
            removePointRadius
            xAxesFlatten
            flattenFirstSpace={1}
            flattenLastSpace={5}
            platform={platform}
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
  profile: makeSelectAuthProfile(),
  data: makeSelectMarketviewContentVitalityScore(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ContentVitalityScore)
