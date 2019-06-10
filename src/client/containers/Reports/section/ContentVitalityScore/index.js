import React from 'react'
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
      authProfile = {}
    } = this.props

    const chartYAxisMax = 100
    const chartYAxisStepSize = 25

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <ContentVitalityScoreModule
            chartYAxisMax={chartYAxisMax}
            data={data}
            authProfile={authProfile}
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

export default ContentVitalityScore