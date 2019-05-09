import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceGender } from 'Reducers/panoptic'
import Module from 'Components/Module'
import HorizontalStackedBarChart from 'Components/Charts/HorizontalStackedBarChart'
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

    return (
      <Module
        moduleKey={'Audience/Gender'}
        title="Video Properties Split By Gender"
        action={this.callBack}
        filters={[
          {
            type: 'videoProperty',
            selectKey: 'AG-asd',
            placeHolder: 'Resolution',
          },
          {
            type: 'engagement',
            selectKey: 'AG-ads',
            placeHolder: 'Engagement',
          },
          {
            type: 'timeRange',
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
          {data && data.datasets && (
            <div
              className="col-12"
              style={{ display: 'flex', padding: '40px 0' }}
            >
              <HorizontalStackedBarChart
                width={1200}
                height={310}
                barData={data}
                options={barChartOptions}
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
