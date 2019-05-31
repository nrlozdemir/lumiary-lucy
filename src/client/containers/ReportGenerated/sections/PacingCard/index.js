import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectReportsPacingCard } from 'Reducers/generatedReport'
import PacingCardModule from 'Components/Modules/PacingCardModule'
import RouterLoading from 'Components/RouterLoading'

class PacingCard extends React.Component {
  componentDidMount() {
    const { getPacingCardDataRequest, reportId } = this.props
    getPacingCardDataRequest({ reportId })
  }

  render() {
    const {
      pacingChartData: { data, loading },
    } = this.props

    if (!data && loading) {
      return <RouterLoading />
    }

    return (
      <PacingCardModule
        data={data || {}}
        moduleKey={'Reports/PacingCard'}
        title="Pacing For Each Format by Performance"
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  pacingChartData: makeSelectReportsPacingCard(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(PacingCard)
