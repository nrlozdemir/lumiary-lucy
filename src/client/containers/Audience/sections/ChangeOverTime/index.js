import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceChangeOverTime } from 'Reducers/audience'
import Module from 'Components/Module'
import LineChart from 'Components/Charts/LineChart'
import style from 'Containers/Audience/style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

class ChangeOverTime extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceChangeOverTimeData(data)
  }

  render() {
    // const { selectViews, selectPlatforms, selectDate } = this.state;
    const {
      audienceChangeOverTimeData: { data, loading, error },
      infoText,
    } = this.props
    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <Module
            moduleKey={'Audience/ChangeOverTime'}
            title="Change Over Time By Property"
            action={this.callBack}
            infoText={infoText}
            filters={[
              {
                type: 'platformEngagement',
                selectKey: 'ACOT-plateng',
                placeHolder: 'Engagement by Platform',
              },
              {
                type: 'dateRange',
                selectKey: 'ACOT-wds',
                placeHolder: 'Date',
                defaultValue: 'month',
              },
            ]}
            legend={
              <div
                className={
                  'd-flex align-items-center justify-content-center ' +
                  style.headerLabel
                }
              >
                <div className="d-flex align-items-center mr-32">
                  <span className={style.redRound} />
                  <p>Male</p>
                </div>
                <div className="d-flex align-items-center mr-32">
                  <span className={style.duskRound} />
                  <p>Female</p>
                </div>
              </div>
            }
          >
            {data && data.datasets && (
              <div className={style.audienceContainer}>
                <LineChart
                  width={1162}
                  height={292}
                  dataSet={data}
                  xAxesFlatten
                  yAxesAbbreviate
                  shadow
                  customLineOptions={[
                    { borderColor: '#2fd7c4' },
                    { borderColor: '#5292e5' },
                  ]}
                  customTooltipText="Likes"
                  backgroundColor={colors.chartBackground}
                  yAxesStepSize={250000}
                  yAxesMax={1000000}
                />
              </div>
            )}
          </Module>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audienceChangeOverTimeData: makeSelectAudienceChangeOverTime(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ChangeOverTime)
