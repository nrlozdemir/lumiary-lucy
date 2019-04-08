import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceDominantColor } from 'Reducers/panoptic'

import RadarChart from 'Components/Charts/Panoptic/RadarChart'
import style from 'Containers/Audience/style.scss'
import sectionStyle from './style.scss'
import { Progress } from './Progress'

import Module from 'Components/Module'

class DominantColor extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceDominantColorData(data)
  }

  render() {
    const {
      audienceDominantColorData: { data, loading, error },
    } = this.props

    return (
      <Module
        moduleKey={'Audience/DominantColor'}
        title="Dominant Color Performance By Gender"
        action={this.callBack}
        filters={[
          {
            type: 'engagement',
            selectKey: 'ADC-was',
            placeHolder: 'Engagement',
          },
          {
            type: 'platform',
            selectKey: 'ADC-wsd',
            placeHolder: 'Platforms',
          },
          {
            type: 'timeRange',
            selectKey: 'ADC-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        {data && data.length > 0 && (
          <div className="grid-container">
            <div className="col-6">
              <div className={style.label}>
                <span>Male</span>
              </div>
              <div style={{ padding: '0 8vw' }}>
                <RadarChart data={data[0].datas} />
              </div>
            </div>
            <div className="col-6">
              <div className={style.label}>
                <span>Female</span>
              </div>
              <div style={{ padding: '0 8vw' }}>
                <RadarChart data={data[1].datas} />
              </div>
            </div>
            <div className={'col-12 mt-32 ' + sectionStyle.progressContainer}>
              <Progress progress={data[0].progress} reverse={true} />
              <div className={sectionStyle.progressCountArea}>
                <span className={sectionStyle.progressCount}>1</span>
                <span className={sectionStyle.progressCount}>2</span>
                <span className={sectionStyle.progressCount}>3</span>
              </div>
              <Progress progress={data[1].progress} />
            </div>
          </div>
        )}
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audienceDominantColorData: makeSelectAudienceDominantColor(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(DominantColor)
