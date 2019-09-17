import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceGender } from 'Reducers/audience'
import Module from 'Components/Module'
import HorizontalBarChart from 'Components/Charts/HorizontalBarChart'
import { barChartOptions } from './options'
import { isDataSetEmpty } from 'Utils/datasets'
import renderLegend from 'Components/Legend/render'

import style from '../../style.scss'

class GenderSection extends React.Component {
  callBack = (data, moduleKey) => {
    const { type, getAudienceGenderData } = this.props
    getAudienceGenderData({ ...data, type })
  }

  render() {
    const {
      type,
      audienceGenderData: {
        data,
        data: { dataset },
        loading,
        error,
      },
    } = this.props

    const labels = (data.dataset && Object.keys(data.dataset)) || []

    let genderData = []

    if (!!labels.length) {
      genderData = labels.reduce(
        (datasets, label) => {
          const { male, female } = data.dataset[label]
          datasets[0].data.push(Math.round(male * 100))
          datasets[1].data.push(Math.round(female * 100))
          return datasets
        },
        [
          {
            data: [],
          },
          { data: [] },
        ]
      )

      genderData = {
        datasets: genderData.map((el, i) => ({
          ...el,
          borderWidth: 1,
          label: labels, // data is not enough, so we don't know how to handle labels.
          borderColor: i === 1 ? '#2FD7C4' : '#5292E5',
          backgroundColor: i === 1 ? '#2FD7C4' : '#5292E5',
        })),
      }
    }

    return (
      <Module
        actionOnProp={type}
        loading={loading}
        isEmpty={!loading && isDataSetEmpty(genderData)}
        moduleKey={'Audience/Gender'}
        title="Video Properties Split By Gender"
        action={this.callBack}
        filters={[
          {
            type: 'property',
            selectKey: 'AG-asd',
            placeHolder: 'Resolution',
          },
          {
            type: 'platformEngagement',
            selectKey: 'AG-kms',
            placeHolder: 'Engagement by Platform',
            customOptions: [
              {
                label: 'Facebook',
                options: [{ value: 'facebook|views', label: 'Views' }],
              },
            ],
            defaultValue: { value: 'facebook|views', label: 'Views' },
          },
          {
            type: 'dateRange',
            selectKey: 'AG-wds',
            placeHolder: 'Date',
          },
        ]}
        legend={renderLegend([
          { label: 'Male', color: 'coral-pink' },
          { label: 'Female', color: 'cool-blue' },
        ])}
      >
        <div className={style.audienceContainer}>
          <div className={style.container}>
            <div className={style.legends}>
              {!loading &&
                labels.map((label, idx) => (
                  <div key={`label_${label}-${idx}`} className={style.legend}>
                    {label}
                  </div>
                ))}
            </div>
            {!loading && genderData && genderData.datasets && (
              <React.Fragment>
                <HorizontalBarChart
                  data={
                    !loading && !!genderData.datasets[0]
                      ? genderData.datasets[0]
                      : []
                  }
                  reverse
                  grids={['100%', '50%', '0%']}
                  tooltipType="extended"
                  gender="Male"
                />
                <HorizontalBarChart
                  data={
                    !loading && !!genderData.datasets[1]
                      ? genderData.datasets[1]
                      : []
                  }
                  grids={['0%', '50%', '100%']}
                  tooltipType="extended"
                  gender="Female"
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audienceGenderData: makeSelectAudienceGender(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(GenderSection)
