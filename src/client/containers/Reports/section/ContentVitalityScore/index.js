import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { makeSelectAuthProfile } from 'Reducers/auth'
import { ThemeContext } from 'ThemeContext/themeContext'
import ContentVitalityScoreModule from 'Components/Modules/ContentVitalityScoreModule'

class ContentVitalityScore extends React.Component {
  callBack = (data, moduleKey) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  render() {
    const {
      data: { data, loading, error },
    } = this.props

    let yAxisMax = 0
    const formattedData = Object.keys(data).reduce((accumulator, brandUuid) => {
      const cvCountArray = Object.values(data[brandUuid])
      const maxCount = Math.max(...cvCountArray)
      yAxisMax = (maxCount > yAxisMax) ? maxCount : yAxisMax
      accumulator.datasets.push({
        data: cvCountArray
      })
      return accumulator
    }, {
      datasets: []
    })
    
    const chartYAxisMax = (yAxisMax < 1000) ? Math.ceil(yAxisMax/100)*100 : Math.ceil(yAxisMax/1000)*1000
    const chartYAxisStepSize = (yAxisMax < 1000) ? 100 : 1000

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <ContentVitalityScoreModule
            chartYAxisMax={chartYAxisMax}
            data={formattedData}
            moduleKey={'Reports/ContentVitalityScore'}
            title="Content Vitality Score by Videos Produced Comparison"
            action={this.callBack}
            filters={[
              {
                type: 'platform',
                selectKey: 'RCVS-ads',
                placeHolder: 'Platforms',
              },
              {
                type: 'dateRange',
                selectKey: 'RCVS-wds',
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
  profile: makeSelectAuthProfile(),
})

const withConnect = connect(
  mapStateToProps,
)

export default compose(withConnect)(ContentVitalityScore)

// export default ContentVitalityScore