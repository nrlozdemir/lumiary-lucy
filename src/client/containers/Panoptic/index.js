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
import LineAndDoughnutChartModule from 'Components/Modules/LineAndDoughnutChartModule'
import Cards from './sections/Cards'

/* eslint-disable react/prefer-stateless-function */
class Panoptic extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="grid-container col-12">
          <div className={style.alignTabs} />
        </div>

        <Cards />
        <LineAndDoughnutChartModule
          moduleKey="Panoptic/Top-Performing-Formats-This-Week-By-CV-Score"
          title="Top Performing Formats This Week By CV Score"
          action={() => {}}
        />
        <VideoReleasesBarChart />
        <ColorTemperature />
        <FilteringSection />
        <PacingCard />
        <CompareShares />
      </React.Fragment>
    )
  }
}

export default Panoptic
