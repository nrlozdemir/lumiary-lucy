import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceChangeOverTime } from 'Reducers/audience'
import Module from 'Components/Module'
import LineChart from 'Components/Charts/LineChart'
import style from 'Containers/Audience/style.scss'

const SHADOW_PLUGINS = [
	{
		beforeDatasetDraw: function ({ctx}, {meta}) {
			ctx.shadowBlur = 10;
			ctx.shadowColor = meta.$filler.el._model.borderColor;
		},
		afterDatasetDraw: function (chart) {
			chart.ctx.shadowBlur = 0;
		},
	},
];

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
              customLineOptions={[
                {borderColor: '#2fd7c4'},
                {borderColor: '#5292e5'},
              ]}
              xAxesFlatten
              yAxesAbbreviate
              customTooltipText="Likes"
              yAxesStepSize={250000}
              yAxesMax={1000000}
              plugins={SHADOW_PLUGINS}
            />
          </div>
        )}
      </Module>
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
