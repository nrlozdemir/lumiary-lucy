import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticVideoReleases } from 'Reducers/panoptic'
import Module from 'Components/Module'
import { Bar } from 'react-chartjs-2'
import cx from 'classnames'
import { randomKey } from 'Utils/index'
import { options, wrapperBarOptions } from './chartOptions'
import style from './style.scss'

const barChartContainer = cx('col-12', style.panopticBarChart)
const barContainerClass = cx('col-12', style.barChartContainer)

const plugins = [
  {
    beforeDraw: function(chart, easing) {
      if (
        chart.config.options.chartArea &&
        chart.config.options.chartArea.backgroundColor
      ) {
        var ctx = chart.chart.ctx
        var chartArea = chart.chartArea

        ctx.save()
        ctx.fillStyle = chart.config.options.chartArea.backgroundColor
        ctx.fillRect(
          chartArea.left,
          chartArea.top,
          chartArea.right - chartArea.left,
          chartArea.bottom - chartArea.top
        )
        ctx.restore()
      }
    },
  },
]

class PanopticBarChart extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getVideoReleasesData(data)
  }

  datasetKeyProvider() {
    return randomKey(5)
  }

  render() {
    const {
      videoReleasesData: { data, loading, error },
    } = this.props
    return (
      <Module
        moduleKey={'Panoptic/VideoReleasesBarChart'}
        title="Video Releases vs Engagement"
        action={this.callBack}
        filters={[
          {
            type: 'engagement',
            selectKey: 'PVR-sad',
            placeHolder: 'Engagement',
          },
          {
            type: 'platform',
            selectKey: 'PVR-asd',
            placeHolder: 'Platform',
          },
          {
            type: 'timeRange',
            selectKey: 'PVR-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        <div className={barChartContainer}>
          <div className={barContainerClass}>
            <div className={style.wrapperBarChart}>
              <Bar
                data={data}
                options={wrapperBarOptions}
                datasetKeyProvider={this.datasetKeyProvider}
                plugins={plugins}
              />
            </div>
            <div className={style.groupChartsWrapper}>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar
                    data={data}
                    options={options}
                    datasetKeyProvider={this.datasetKeyProvider}
                  />
                </div>
                <div className={style.chartSectionBadge}>
                  <span>Live Action</span>
                </div>
              </div>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar
                    data={data}
                    options={options}
                    datasetKeyProvider={this.datasetKeyProvider}
                  />
                </div>
                <div className={style.chartSectionBadge}>
                  <span>Stop Motion</span>
                </div>
              </div>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar
                    data={data}
                    options={options}
                    datasetKeyProvider={this.datasetKeyProvider}
                  />
                </div>
                <div className={style.chartSectionBadge}>
                  <span>Cinemagraph</span>
                </div>
              </div>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar data={data} options={options} />
                </div>
                <div className={style.chartSectionBadge}>
                  <span>Animation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  videoReleasesData: makeSelectPanopticVideoReleases(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(PanopticBarChart)
