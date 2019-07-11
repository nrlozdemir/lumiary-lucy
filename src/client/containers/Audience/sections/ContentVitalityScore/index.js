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

class ContentVitalityScore extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceContentVitalityScoreData(data)
  }
  render() {
    const {
      audienceContentVitalityScoreData: { data, loading, error },
      authProfile = {},
    } = this.props

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <ContentVitalityScoreModule
            data={data}
            moduleKey={'Audience/ContentVitalityScore'}
						title="Content Vitality Score By Videos Produced Comparison"
            action={this.callBack}
            authProfile={authProfile}
            filters={[
              {
                type: 'platform',
                selectKey: 'ACOT-ads',
                defaultValue: 'facebook',
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

const mapStateToProps = createStructuredSelector({
  audienceContentVitalityScoreData: makeSelectAudienceContentVitalityScore(),
  authProfile: makeSelectAuthProfile(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ContentVitalityScore)
