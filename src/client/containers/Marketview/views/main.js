import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectMarketviewCompetitorView,
} from 'Reducers/marketview'

import ColorCard from 'Containers/Marketview/sections/main/ColorCard'
import PacingCard from 'Containers/Marketview/sections/main/PacingCard'
import FormatCard from 'Containers/Marketview/sections/main/FormatCard'
import TotalViewsCard from 'Containers/Marketview/sections/main/TotalViewsCard'
import TotalCompetitorCard from 'Containers/Marketview/sections/main/TotalCompetitorCard'

import style from '../style.scss'

class Main extends Component {
  componentDidMount() {
    this.props.getTotalCompetitorViewsRequest()
  }

  render() {
    const { totalCompetitorViewsData } = this.props
    return (
      <React.Fragment>
        <div className={style.mainCardContainer}>
          <ColorCard />
          <PacingCard />
          <FormatCard />
        </div>

        <div className="grid-collapse">
          <TotalViewsCard />
          {totalCompetitorViewsData && (
            <TotalCompetitorCard data={totalCompetitorViewsData} />
          )}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  totalCompetitorViewsData: makeSelectMarketviewCompetitorView(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Main)
