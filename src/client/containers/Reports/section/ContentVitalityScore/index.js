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
    } = this.props

    const dataOverride = {
      datasets: [
        {
          data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        {
          data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
        },
      ]
    }

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <ContentVitalityScoreModule
            data={dataOverride}
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
                        } else if (value === 250) {
                          return value
                        } else {
                          return ''
                        }
                      },
                      fontColor: colors.textColor,
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
