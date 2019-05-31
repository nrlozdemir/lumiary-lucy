import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectReportsTopVideosCard,
} from 'Reducers/generatedReport'
import TopVideosCardModule from 'Components/Modules/TopVideosCardModule'

class TopVideosCard extends React.Component {
  getCompetitorTopVideos = (data) => {
    const { getCompetitorTopVideosRequest, reportId } = this.props
    getCompetitorTopVideosRequest({ ...data, reportId })
  }

  render() {
    const {
      competitorTopVideos: { data },
    } = this.props

    return (
      <TopVideosCardModule
        chartData={data}
        height={150}
        moduleKey="Reports/TopVideosCardModule"
        title="Top Videos Over Time By Competitor"
        action={this.getCompetitorTopVideos}
        filters={[
          {
            type: 'property',
            selectKey: 'RTVC-asd',
            placeHolder: 'Resolution',
          },
        ]}
        references={[
          {
            className: 'bg-cool-blue',
            text: 'Facebook',
          },
          {
            className: 'bg-lighter-purple',
            text: 'Instagram',
          },
          {
            className: 'bg-coral-pink',
            text: 'Twitter',
          },
          {
            className: 'bg-cool-grey',
            text: 'YouTube',
          },
        ]}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  competitorTopVideos: makeSelectReportsTopVideosCard(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopVideosCard)
