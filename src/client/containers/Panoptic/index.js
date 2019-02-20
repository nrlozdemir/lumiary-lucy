/**
 *
 * Panoptic
 *
 */

import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { compose } from "redux"
import { reduxForm } from 'redux-form'

import { actions, makeSelectPanoptic } from 'Reducers/panoptic'

import VideoReleasesBarChart from './sections/VideoReleasesBarChart'
import ColorTemperature from "./sections/ColorTemperature";
import FilteringSection from "./sections/FilteringSection"
import PacingCard from "./sections/PacingCard"
import CompareShares from "./sections/CompareShares"


/* eslint-disable react/prefer-stateless-function */
export class Panoptic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
        }
      },
      startDateRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
        }
      },
      endDateRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
        }
      },
    }
  }

  componentDidMount() {
    this.props.getData()
  }

  handleChange = (selectedOption, name) => {
    this.setState({ [name]: selectedOption })
  }

  render() {

    const { panoptic: { data: {
      colorTempData,
      videoReleasesData,
      verticalStackedChartData,
      pacingChartData,
      compareSharesData
    }
    } } = this.props

    return (
      <React.Fragment>
        {
          videoReleasesData &&
          <VideoReleasesBarChart data={videoReleasesData} />
        }
        {
          colorTempData &&
          <ColorTemperature colorTempData={colorTempData}/>
        }
        {
          verticalStackedChartData &&
          <FilteringSection data={verticalStackedChartData} />

        }
        {
          pacingChartData &&
          <PacingCard barData={pacingChartData} />
        }
        {
          compareSharesData &&
          <CompareShares radarData={compareSharesData} />
        }
      </React.Fragment>
    )
  }
}

Panoptic.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  panoptic: makeSelectPanoptic()
})

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(actions.getData())
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(reduxForm({
  form: 'panoptic'
}), withConnect)(Panoptic)
