import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectReportsPacingCard } from 'Reducers/generatedReport'
import PacingCardModule from 'Components/Modules/PacingCardModule'
import RouterLoading from 'Components/RouterLoading'
import { isEmpty, isEqual } from 'lodash'

class PacingCard extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      data: { data, loading },
    } = this.props
    const {
      data: { data: nextData, loading: nextLoading },
    } = nextProps

    return (
      (data && !isEqual(JSON.stringify(data), JSON.stringify(nextData))) ||
      loading !== nextLoading
    )
  }

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
        data={!loading ? data : {}}
        moduleKey={'BrandInsights/PacingCard'}
        title="Pacing For Each Duration by Performance"
        loading={loading}
      />
    )
  }
}

export default PacingCard
