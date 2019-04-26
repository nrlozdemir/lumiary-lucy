import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import cx from 'classnames'
import style from './style.scss'
import { randomKey } from 'Utils/index'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticVideoReleases } from 'Reducers/panoptic'

import { options, wrapperBarOptions } from './chartOptions'

const barChartContainer = cx('col-12', style.panopticBarChart)
const barChartHeaderClass = cx('col-12 mt-24 mb-24', style.barChartHeader)
const barChartFooterClass = cx('col-12 mb-56', style.barChartFooter)
const barContainerClass = cx('col-12', style.barChartContainer)
const headerTitleClass = cx('font-secondary-second', style.title)
const referencesClass = cx('font-secondary-second', style.references)

import Module from 'Components/Module'

const plugins = [
  {
    beforeDraw: function (chart, easing) {
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

class VideoReleasesBarChart extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getVideoReleasesData(data)
  }

  datasetKeyProvider() {
    return randomKey(5)
  }

  render() {
    const {
      videoReleasesData: { data, loading, error },
      reportData
    } = this.props

    console.log(reportData)
    return (
      <Module
        moduleKey={'Panoptic/VideoReleasesBarChart'}
        title="Video Releases vs Engagement"
        action={this.callBack}
        filters={[
          ...(!reportData ? [{
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
          }] : [])

        ]}
        legend={
          reportData && (
            <div className='d-flex align-items-center justify-content-end'>
              <div className="d-flex align-items-center mr-32">
                <span className="blueDot" />
                <p>Likes</p>
              </div>
              <div className="d-flex align-items-center mr-32">
                <span className="redDot" />
                <p>Video Releases</p>
              </div>
            </div>
          )
        }
      >
        <div className={barChartContainer}>
          <div className={barContainerClass}>
            <div className={style.wrapperBarChart}>
              <Bar
                data={reportData || data}
                options={wrapperBarOptions}
                datasetKeyProvider={this.datasetKeyProvider}
                plugins={plugins}
              />
            </div>
            <div className={style.groupChartsWrapper}>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar
                    data={reportData || data}
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
                    data={reportData || data}
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
                    data={reportData || data}
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
                  <Bar data={reportData || data} options={options} />
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

export default compose(withConnect)(VideoReleasesBarChart)
