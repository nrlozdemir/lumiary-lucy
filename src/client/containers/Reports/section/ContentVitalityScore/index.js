import React from 'react'
import { ThemeContext } from 'ThemeContext/themeContext'
import ContentVitalityScoreModule from 'Components/Modules/ContentVitalityScoreModule'

class ContentVitalityScore extends React.Component {
  callBack = (data, moduleKey) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.data.data)
    console.log(nextProps.data.data)
    return JSON.stringify(this.props.data.data) !== JSON.stringify(nextProps.data.data)
  }

  render() {
    const {
      data: { data, loading, error },
      authProfile = {}
    } = this.props

    const maxVideoPercent = Object.keys(data).reduce((accumulator, key) => {
      const maxPercentInSet = Math.max(...data[key].videoPercents)
      return maxPercentInSet > accumulator ? maxPercentInSet : accumulator
    }, 0)

    const chartYAxisMax = (maxVideoPercent > 50) ? 100 : 50
    const chartYAxisStepSize = (maxVideoPercent > 50) ? 25 : 12.5

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