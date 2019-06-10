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

    const { bucketedBrands = {}, brandCvSummary = {}} = data

    let yAxisMax = 0
    const formattedData = Object.keys(bucketedBrands).reduce((accumulator, brandUuid) => {
      const cvCountArray = Object.values(bucketedBrands[brandUuid])
      const maxCount = Math.max(...cvCountArray)
      yAxisMax = (maxCount > yAxisMax) ? maxCount : yAxisMax
      accumulator.datasets.push({
        data: cvCountArray
      })
      
      if(!accumulator.brands[brandUuid]){
        accumulator.brands[brandUuid] = {
          name: '',
          isCompetitor: false,
        }
      }

      accumulator.brands[brandUuid].data = cvCountArray
      if(authProfile.brand.uuid === brandUuid) {
        accumulator.brands[brandUuid].name = authProfile.brand.name
      } else {
        authProfile.brand.competitors.forEach((competitor) => {
          if(competitor.uuid === brandUuid){
            accumulator.brands[brandUuid].name = competitor.name
            accumulator.brands[brandUuid].isCompetitor = true
          }
        })
      }

      return accumulator
    }, {
      datasets: [],
      brands: {}
    })
    
    const chartYAxisMax = (yAxisMax < 1000) ? Math.ceil(yAxisMax/100)*100 : Math.ceil(yAxisMax/1000)*1000
    const chartYAxisStepSize = (yAxisMax < 1000) ? 100 : 1000

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <ContentVitalityScoreModule
            chartYAxisMax={chartYAxisMax}
            data={formattedData}
            brandCvSummary={brandCvSummary}
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