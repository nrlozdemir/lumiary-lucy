import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectReportsColorComparison } from 'Reducers/reports'

import classnames from 'classnames'
import style from './style.scss'

import RadarChart from 'Components/Charts/Panoptic/RadarChart'
import ProgressBar from 'Components/ProgressBar'
import Module from 'Components/Module'

class ColorComparison extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getColorComparisonData(data)
  }
  render() {
    const {
      colorComparisonData: { data, loading, error },
    } = this.props
    return (
      <Module
        moduleKey={'Reports/ColorComparison'}
        title="Video Library Color Comparison"
        action={this.callBack}
        filters={[
          {
            type: 'timeRange',
            selectKey: 'RVC-swda',
            placeHolder: 'Date',
          },
        ]}
      >
        {data && data.length > 0 && (
          <div className={style.radarChartComparison}>
            <div className={style.radarComponent}>
              <p className={style.radarTitle}>{data[0].type}</p>
              <div className={style.radarComponentContainer}>
                <RadarChart data={data[0].datas} />
              </div>
              <div className={style.progressBarArea}>
                {data[0].progress.map((progressItem, index) => (
                  <div
                    key={index}
                    className={classnames(
                      style.reverse,
                      style.progressBarInner
                    )}
                  >
                    <p className={style.progressText}>
                      <span className={style.leftTitle}>
                        <span
                          className={style.dot}
                          style={{ background: progressItem.color }}
                        />
                        <span>{progressItem.leftTitle}</span>
                      </span>
                      <span className={style.rightTitle}>
                        {progressItem.rightTitle}
                      </span>
                    </p>
                    <ProgressBar
                      width={progressItem.value}
                      customBarClass={style.progressBar}
                      customPercentageClass={style.percentageBlue}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={style.progressCountArea}>
              <span className={style.progressCount}>1</span>
              <span className={style.progressCount}>2</span>
              <span className={style.progressCount}>3</span>
            </div>
            <div className={style.radarComponent}>
              <p className={style.radarTitle}>{data[1].type}</p>
              <div className={style.radarComponentContainer}>
                <RadarChart data={data[1].datas} />
              </div>
              <div className={style.progressBarArea}>
                {data[1].progress.map((progressItem, index) => (
                  <div key={index} className={style.progressBarInner}>
                    <p className={style.progressText}>
                      <span className={style.leftTitle}>
                        <span
                          className={style.dot}
                          style={{ background: progressItem.color }}
                        />
                        <span>{progressItem.leftTitle}</span>
                      </span>
                      <span className={style.rightTitle}>
                        {progressItem.rightTitle}
                      </span>
                    </p>
                    <ProgressBar
                      width={progressItem.value}
                      customBarClass={style.progressBar}
                      customPercentageClass={style.percentageBlue}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  colorComparisonData: makeSelectReportsColorComparison(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ColorComparison)
