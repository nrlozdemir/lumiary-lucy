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

import PercentageBarGraph from 'Components/PercentageBarGraph'
import VideoReleasesBarChart from './sections/VideoReleasesBarChart'
import ColorTemperature from './sections/ColorTemperature'
import FilteringSection from './sections/FilteringSection'
import PacingCard from './sections/PacingCard'
import CompareShares from './sections/CompareShares'

/* eslint-disable react/prefer-stateless-function */
export class Panoptic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.getData()
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const {
      selectWarmColor,
      selectLikes,
      selectDate,
      selectPlatforms,
    } = this.state
    const {
      panoptic: {
        data: {
          colorTempData,
          videoReleasesData,
          verticalStackedChartData,
          pacingChartData,
          compareSharesData,
        },
      },
    } = this.props

    /* <div className="col-4">
          <PercentageBarGraph
            id={"percentageContainer-1"}
            percentage={76.8}
            color='#d0506c'
          />
        </div> */

    return (
      <React.Fragment>
        <div className="grid-container col-12">
          <div className={style.alignTabs}>
            <NavLink
              to="/panoptic/audience"
              className={style.tab}
              activeClassName={style.activeLink}
              onMouseEnter={this.hover}
              onMouseLeave={this.blur}

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
      </React.Fragment>
    )
  }
}

Panoptic.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  panoptic: makeSelectPanoptic(),
})

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(actions.getData()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  reduxForm({
    form: 'panoptic',
  }),
  withConnect
)(Panoptic)
