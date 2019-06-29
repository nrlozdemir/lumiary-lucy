import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectReportsPacingCard } from 'Reducers/generatedReport'
import PacingCardModule from 'Components/Modules/PacingCardModule'
import RouterLoading from 'Components/RouterLoading'

class PacingCard extends React.Component {
  componentDidMount() {
    const { action, report } = this.props
    action({ report })
  }

  render() {
    const {
      data: { data, loading },
    } = this.props

    return (
      <PacingCardModule
        data={data || {}}
        moduleKey={'Reports/PacingCard'}
        title="Pacing For Each Format by Performance"
        loading={loading}
      />
    )
  }
}

export default PacingCard
