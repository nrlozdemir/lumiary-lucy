import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  selectMarketviewCompetitorTopVideosView,
} from 'Reducers/marketview'
import TopVideosCard from 'Components/Modules/TopVideosCardModule'

class TopVideosOverTime extends React.Component {
  getCompetitorTopVideos = (data) => {
    this.props.getCompetitorTopVideosRequest(data)
  }

  render() {
    const { competitorTopVideos } = this.props
    console.log('top', this.props)
    return (
      <TopVideosCard
        chartData={competitorTopVideos}
        height={150}
        moduleKey="MarketView/TopVideosCardModule"
        title="Top Videos Over Time By Competitor"
        action={this.getCompetitorTopVideos}
        filters={[
          {
            type: 'property',
            selectKey: 'property',
            placeHolder: 'property',
          },
          {
            type: 'metric',
            selectKey: 'engagement',
            placeHolder: 'engagement',
          },
          {
            type: 'dateRange',
            selectKey: 'dateRange',
            placeHolder: 'dateRange',
          },
        ]}
        references={[
          {
            className: 'bg-cool-blue',
            text: 'Barstool Sports',
          },
          {
            className: 'bg-lighter-purple',
            text: 'SB Nation',
          },
          {
            className: 'bg-coral-pink',
            text: 'ESPN',
          },
          {
            className: 'bg-cool-grey',
            text: 'Scout Media',
          },
          {
            className: 'bg-dusk"',
            text: 'Fanside',
          },
        ]}
      />
    )
  }
}
TopVideosOverTime.propTypes = {}

const mapStateToProps = createStructuredSelector({
  competitorTopVideos: selectMarketviewCompetitorTopVideosView(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopVideosOverTime)
