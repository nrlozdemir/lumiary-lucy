import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceColorTemperature } from 'Reducers/panoptic'

import classnames from 'classnames'
import style from 'Containers/Audience/style.scss'
import sectionStyle from './style.scss'

import { ColorTemperature as Chart } from 'Components/ColorTemperatureChart/ColorTemperature'
import Module from 'Components/Module'

class ColorTemperature extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceColorTemperatureData(data)
  }
  render() {
    const {
      audienceColorTemperatureData: { data, loading, error },
    } = this.props
    return (
      <Module
        moduleKey={'Audience/ColorTemperature'}
        title="Color Temperature / Sentiment Comparison"
        action={this.callBack}
        legend={
          <div className={style.headerLabel}>
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
          </div>
        }
        filters={[
          {
            type: 'timeRange',
            selectKey: 'ACT-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        <div className={style.audienceContainer}>
          <div
            className="col-12"
            style={{ display: 'flex', padding: '40px 0' }}
          >
            {data &&
              data.length > 0 &&
              data.map((temp, index) => (
                <div
                  className={classnames('col-4', sectionStyle.chartWrapper)}
                  key={'temp-chart-' + index}
                >
                  <Chart temp={temp} />
                  <div className={sectionStyle.chartInfo}>{temp.text}</div>
                </div>
              ))}
          </div>
        </div>
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audienceColorTemperatureData: makeSelectAudienceColorTemperature(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ColorTemperature)
