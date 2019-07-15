import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceChangeOverTime } from 'Reducers/audience'
import Module from 'Components/Module'
import LineChart from 'Components/Charts/LineChart'
import { isDataSetEmpty } from 'Utils/datasets'
import style from 'Containers/Audience/style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

class ChangeOverTime extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceChangeOverTimeData(data)
  }

  render() {
    const {
      audienceChangeOverTimeData: { data: dataToConvert, loading, error },
      infoText,
    } = this.props

    const labels = (!!dataToConvert && Object.keys(dataToConvert)) || []

    const data = {
      labels,
      datasets:
        !!labels.length &&
        labels.reduce(
          (datasets, label) => {
            const dataset = dataToConvert[label]
            let maleVal = 0
            let femaleVal = 0
            if (!!dataset) {
              const { male, female } = dataset
              maleVal = male
              femaleVal = femaleVal
            }
            datasets[0].data.push(maleVal)
            datasets[1].data.push(femaleVal)

            return datasets
          },
          [{ data: [] }, { data: [] }]
        ),
    }

    const max =
      (!!data &&
        !!data.datasets &&
        data.datasets.reduce((val, dataset) => {
          const currMax = Math.max(...dataset.data)
          return currMax > val ? currMax : val
        }, 0)) ||
      1000000

    const step = Math.ceil(max / 4)

    return (
      <Module
        loading={loading}
        isEmpty={!loading && isDataSetEmpty(data)}
        moduleKey={'Audience/ChangeOverTime'}
        title="Change Over Time By Property"
        action={this.callBack}
        infoText={infoText}
        filters={[
          {
            type: 'property',
            selectKey: 'ACOT-blablablatralala',
            placeHolder: 'Resolution',
          },
          {
            type: 'platformEngagement',
            selectKey: 'ACOT-plateng',
            placeHolder: 'Engagement by Platform',
          },
          {
            type: 'dateRange',
            selectKey: 'ACOT-wds',
            placeHolder: 'Date',
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
        <div className={style.audienceContainer}>
          <LineChart
            width={1162}
            height={292}
            dataSet={!loading ? data || [] : []}
            customLineOptions={[
              { borderColor: '#2fd7c4' },
              { borderColor: '#5292e5' },
            ]}
            xAxesFlatten
            shadow
            yAxesAbbreviate
            customTooltipText="Likes"
            yAxesStepSize={step}
            yAxesMax={max}
          />
        </div>
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
