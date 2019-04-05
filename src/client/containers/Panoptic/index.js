/**
 *
 * Panoptic
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'

import { actions, makeSelectPanoptic } from 'Reducers/panoptic'
import style from './style.scss'

import VideoReleasesBarChart from './sections/VideoReleasesBarChart'
import ColorTemperature from './sections/ColorTemperature'
import FilteringSection from './sections/FilteringSection'
import PacingCard from './sections/PacingCard'
import CompareShares from './sections/CompareShares'

/* eslint-disable react/prefer-stateless-function */
const Panoptic = () => {
  return (
    <React.Fragment>
      <div className="grid-container col-12">
        <div className={style.alignTabs}>
          <NavLink
            to="/panoptic/audience"
            className={style.tab}
            activeClassName={style.activeLink}
          >
            Audience
          </NavLink>
        </div>
      </div>

      <VideoReleasesBarChart />
      <ColorTemperature />
      <FilteringSection />
      <PacingCard />
      <CompareShares />

      {/*
      <div className="grid-container col-12">
        <div className={style.alignTabs}>
          <NavLink
            to="/panoptic/audience"
            className={style.tab}
            activeClassName={style.activeLink}
          >
            Audience
          </NavLink>
        </div>
      </div>
      {videoReleasesData && (
        <VideoReleasesBarChart
          data={videoReleasesData}
          handleSelectFilters={this.handleSelectFilters}
          selectLikes={selectLikes}
          selectPlatforms={selectPlatforms}
          selectDate={selectDate}
        />
      )}
      {colorTempData && (
        <ColorTemperature
          colorTempData={colorTempData}
          handleSelectFilters={this.handleSelectFilters}
          selectWarmColor={selectWarmColor}
          selectDate={selectDate}
        />
      )}
      {verticalStackedChartData && (
        <FilteringSection data={verticalStackedChartData} />
      )}
      {pacingChartData && (
        <PacingCard
          handleSelectFilters={this.handleSelectFilters}
          barData={pacingChartData}
          selectDate={selectDate}
          selectLikes={selectLikes}
        />
      )}
      {compareSharesData && (
        <CompareShares
          selectDate={selectDate}
          radarData={compareSharesData}
          handleSelectFilters={this.handleSelectFilters}
        />
      )}
      */}
    </React.Fragment>
  )
}

export default Panoptic
