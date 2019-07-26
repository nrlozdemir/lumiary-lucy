import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectPanopticPacingCard } from 'Reducers/panoptic'
import PacingCardModule from 'Components/Modules/PacingCardModule'

class PacingCard extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getPacingCardData(data)
  }

  render() {
    const {
      pacingChartData: { data, loading },
    } = this.props

    return (
      <PacingCardModule
        data={!loading ? data : {}}
        moduleKey={'Panoptic/PacingCard'}
        title="Pacing For Each Duration by Performance"
        action={this.callBack}
        loading={loading}
        filters={[
          {
            type: 'platformEngagement',
            selectKey: 'PCT-plateng',
            placeHolder: 'Engagement by Platform',
          },
          {
            type: 'dateRange',
            selectKey: 'PCT-wds',
            placeHolder: 'Date',
          },
        ]}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  pacingChartData: makeSelectPanopticPacingCard(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(PacingCard)
