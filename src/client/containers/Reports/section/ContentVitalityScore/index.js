import React from 'react'
import { ThemeContext } from 'ThemeContext/themeContext'
import ContentVitalityScoreModule from 'Components/Modules/ContentVitalityScoreModule'
import { getCVScoreChartAttributes } from 'Utils/datasets'

class ContentVitalityScore extends React.Component {
  callBack = (data, moduleKey) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  shouldComponentUpdate(nextProps) {
    const {
      data: { data, loading },
    } = this.props

    const {
      data: { data: nextData, loading: nextLoading },
    } = nextProps

    return (
      JSON.stringify(data) !== JSON.stringify(data) || loading !== nextLoading
    )
  }

  render() {
    const {
      data: { data, loading, error },
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
            moduleKey={'Reports/ContentVitalityScore'}
            title="Content Vitality Score By Videos Produced Comparison"
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
