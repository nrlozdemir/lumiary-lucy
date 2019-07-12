import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceGender } from 'Reducers/audience'
import Module from 'Components/Module'
import HorizontalBarChart from 'Components/Charts/HorizontalBarChart'
import { barChartOptions } from './options'
import style from '../../style.scss'

class GenderSection extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceGenderData(data)
  }

  render() {
    const {
      audienceGenderData: { data, loading, error },
    } = this.props

    let genderData = []

    if (data && data.datasets && genderData) {
      genderData = data
      data.datasets.map((el, i) => {
        genderData.datasets[i].borderWidth = 1
        genderData.datasets[i].label = 'Dataset 1'
        genderData.datasets[i].borderColor = '#5292E5'
        genderData.datasets[i].backgroundColor = '#5292E5'
        if (i === 1) {
          genderData.datasets[i].label = 'Dataset 2'
          genderData.datasets[i].borderColor = '#2FD7C4'
          genderData.datasets[i].backgroundColor = '#2FD7C4'
        }
      })
    }
    return (
      <Module
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
            defaultValue: 'month',
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
          {data && data.datasets && (
            <div className={style.container}>
              <div className={style.legends}>
                <div className={style.legend}>Fast</div>
                <div className={style.legend}>Medium</div>
                <div className={style.legend}>Slow</div>
                <div className={style.legend}>Slowest</div>
              </div>
              <HorizontalBarChart
                data={data.datasets[0]}
                reverse
                grids={['100%', '50%', '0%']}
              />
              <HorizontalBarChart
                data={data.datasets[1]}
                grids={['0%', '50%', '100%']}
              />
            </div>
          )}
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
