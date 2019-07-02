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
        data={data}
        moduleKey={'Panoptic/PacingCard'}
        title="Pacing For Each Format by Performance"
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
        infoText={`These two graphs measure specific properties for each format against engagement/platform over a certain time period. The graph on the right is an aggregate of all formats measured as a total percentage. Using the drop-downs, you can change the property being measured, engagement/platform and time range.`}
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
