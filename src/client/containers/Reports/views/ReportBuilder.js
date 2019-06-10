import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions as reportsActions,
  makeSelectReportsPredefinedReportValues,
} from 'Reducers/reports'

import RouterLoading from 'Components/RouterLoading'

class ReportBuilder extends React.Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props

    const { predefinedReportRequest } = this.props

    const id = params && params.id

    if (id) {
      predefinedReportRequest(id)
    }
  }

  render() {
    const {
      getPredefinedReportChartData,
      predefinedReportValues: { data: reportValues, loading, chartData },
    } = this.props

    console.log('predefined report values =', reportValues)

    if (loading) {
      return <RouterLoading />
    }

    if (!loading && !reportValues) {
      return <div>Empty Report</div>
    }

    return <div>hi</div>
  }
}

const mapStateToProps = createStructuredSelector({
  predefinedReportValues: makeSelectReportsPredefinedReportValues(),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...reportsActions }, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ReportBuilder)
