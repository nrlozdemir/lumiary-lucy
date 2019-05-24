import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectReportsPacingCard } from 'Reducers/generatedReport'
import PacingCardModule from 'Components/Modules/PacingCardModule'

class PacingCard extends React.Component {
  callBack = (data, moduleKey) => {
    const { getPacingCardData, reportId } = this.props

    getPacingCardData({ ...data, reportId })
  }

  render() {
    const {
      pacingChartData: { data },
    } = this.props

    return (
      <PacingCardModule
        data={data}
        moduleKey={'Reports/PacingCard'}
        title="Pacing For Each Format by Performance"
        action={this.callBack}
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
