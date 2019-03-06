/**
 *
 * Panoptic
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'

import { actions, makeSelectPanoptic } from 'Reducers/panoptic'

import VideoReleasesBarChart from './sections/VideoReleasesBarChart'
import ColorTemperature from './sections/ColorTemperature'
import FilteringSection from './sections/FilteringSection'
import PacingCard from './sections/PacingCard'
import CompareShares from './sections/CompareShares'

/* eslint-disable react/prefer-stateless-function */
export class Panoptic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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
    const { selectWarmColor, selectLikes, selectDate } = this.state
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

    return (
      <React.Fragment>
        {videoReleasesData && (
          <VideoReleasesBarChart data={videoReleasesData} />
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
