import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticColorTemperature } from 'Reducers/panoptic'

import style from './style.scss'
import { platforms, selectOneOptions, selectTwoOptions } from './options'
import ColorTemperatureChart from 'Components/ColorTemperatureChart'

import Module from 'Components/Module'

class PanopticColorTemperature extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getColorTemperatureData(data)
  }
  render() {
    const {
      colorTemperatureData: { data, loading, error },
    } = this.props
    return (
      <Module
        moduleKey={'Panoptic/ColorTemperature'}
        title="Color Temperature / Sentiment Comparison"
        action={this.callBack}
        filters={[
          {
            type: 'colorTempature',
            selectKey: 'PCT-asd',
            placeHolder: 'Color Tempature',
          },
          {
            type: 'timeRange',
            selectKey: 'PCT-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        <div className={style.radialChartsContainer}>
          <div className={style.temperatureContentContainer}>
            {data && data.length > 0 && (
              <ColorTemperatureChart
                borderLess
                verticalText
                colorTempData={data}
              />
            )}
          </div>
          <div className={style.infoWrapperContainer}>
            <div className={style.infoWrapper}>
              <div className={style.infoHandle}>
                <span className={style.infoText}>Views</span>
              </div>
            </div>
            <div className={style.infoWrapper}>
              <div className={style.infoHandle}>
                <span className={style.infoText}>Likes</span>
              </div>
            </div>
            <div className={style.infoWrapper}>
              <div className={style.infoHandle}>
                <span className={style.infoText}>Comment</span>
              </div>
            </div>
            <div className={style.infoWrapper}>
              <div className={style.infoHandle}>
                <span className={style.infoText}>Shares</span>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center ph-48 mv-48">
            {platforms &&
              platforms.map((platform, index) => (
                <div key={index} className="d-flex align-items-center mr-32">
                  <span
                    className={style.round}
                    style={{ backgroundColor: `${platform.color}` }}
                  />
                  <p className={style.platformName}>{platform.name}</p>
                </div>
              ))}
          </div>
        </div>
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  colorTemperatureData: makeSelectPanopticColorTemperature(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(PanopticColorTemperature)
