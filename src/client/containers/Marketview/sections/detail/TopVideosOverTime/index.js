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
  callback = (data) => {
    this.props.getCompetitorTopVideosRequest(data)
  }

  render() {
    const {
      competitorTopVideos,
      title,
      moduleKey,
      filters,
      references,
      container,
    } = this.props
    return (
      <TopVideosCard
        chartData={competitorTopVideos.data}
        height={150}
        moduleKey={moduleKey}
        title={title}
        action={this.callback}
        filters={filters}
        references={references}
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
