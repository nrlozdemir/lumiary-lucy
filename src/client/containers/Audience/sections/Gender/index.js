import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceGender } from 'Reducers/audience'
import Module from 'Components/Module'
import HorizontalBarChart from 'Components/Charts/HorizontalBarChart'
import { barChartOptions } from './options'
import { isDataSetEmpty } from 'Utils/datasets'

import style from '../../style.scss'

class GenderSection extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceGenderData(data)
  }

  render() {
    const {
      audienceGenderData: { data, loading, error },
    } = this.props

    const labels = (data && Object.keys(data)) || []

    let genderData = []

    if (!!labels.length) {
      genderData = labels.reduce(
        (datasets, label) => {
          const { male, female } = data[label]
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
          label: `Dataset ${i}`,
          borderColor: i === 1 ? '#2FD7C4' : '#5292E5',
          backgroundColor: i === 1 ? '#2FD7C4' : '#5292E5',
        })),
      }
    }

    return (
      <Module
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
            type: 'metric',
            selectKey: 'AG-ads',
            placeHolder: 'Engagement',
          },
          {
            type: 'dateRange',
            selectKey: 'AG-wds',
            placeHolder: 'Date',
          },
        ]}
        legend={
          <div className={style.headerLabel}>
            <div className="d-flex align-items-center justify-content-center">
              <div className="d-flex align-items-center mr-32">
                <span className={style.redRound} />
                <p>Male</p>
              </div>
              <div className="d-flex align-items-center mr-32">
                <span className={style.duskRound} />
                <p>Female</p>
              </div>
            </div>
          </div>
        }
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
                />
                <HorizontalBarChart
                  data={
                    !loading && !!genderData.datasets[1]
                      ? genderData.datasets[1]
                      : []
                  }
                  grids={['0%', '50%', '100%']}
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
