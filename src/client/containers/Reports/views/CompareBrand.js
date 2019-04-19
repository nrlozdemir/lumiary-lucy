import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import ContentVitalityScore from '../section/ContentVitalityScore'
import VideoComparison from '../section/VideoComparison'

class CompareBrand extends Component {
  render() {
    return (
      <div>
        <ContentVitalityScore />
        <VideoComparison />
      </div>
    )
  }
}

CompareBrand.propTypes = {}

const mapStateToProps = createStructuredSelector({})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(CompareBrand)
