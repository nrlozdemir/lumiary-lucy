import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import cx from 'classnames'
import style from './style.scss'

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

class PanopticBarChart extends React.Component {
  callBack = (data, moduleKey) => {
    console.log('BURASI')
    if (moduleKey === 'Panoptic/VideoReleasesBarChart') {
      this.props.getVideoReleasesData(data)
      // console.log('===> DATA: ', data, 'MODULE_KEY: ', moduleKey)
    }
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
            type: 'platform',
            selectKey: 'PVR-asd',
            placeHolder: 'Platform',
          },
          {
            type: 'engagement',
            selectKey: 'PVR-sad',
            placeHolder: 'Engagement',
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
              <Bar data={data} options={wrapperBarOptions} />
            </div>
            <div className={style.barChartBackground} />
            <div className={style.groupChartsWrapper}>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar data={data} options={options} />
                </div>
                <div className={style.chartSectionBadge}>
                  <span>Live Action</span>
                </div>
              </div>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar data={data} options={options} />
                </div>
                <div className={style.chartSectionBadge}>
                  <span>Stop Motion</span>
                </div>
              </div>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar data={data} options={options} />
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
                  <span>Stop Motion</span>
                </div>
              </div>
            </div>
          </div>

          <div className={barChartFooterClass}>
            <div className={referencesClass}>
              <div className={style.referenceItem}>
                <span className="bg-cool-blue" />
                Likes
              </div>
              <div className={style.referenceItem}>
                <span className="bg-coral-pink" />
                Videos Released
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
