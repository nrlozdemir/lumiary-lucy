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
import BarChartModule from 'Components/Modules/BarChartModule'

import style from '../style.scss'
import { randomKey } from '../../../utils'

class Main extends Component {
  componentDidMount() {
    this.props.getTotalCompetitorViewsRequest()
  }

  render() {
    return (
      <React.Fragment>
        <div className={style.mainCardContainer}>
          <ColorCard />
          <PacingCard />
          <FormatCard />
        </div>

        <div className="grid-collapse">
          <TotalViewsCard />
          <BarChartModule
            moduleKey={randomKey(10)}
            barData={this.props.totalCompetitorViewsData}
            title="Total Competitor Views By Duration"
            height={55}
            titleLabels={[
              'Barstool Sports',
              'SB Nation',
              'ESPN',
              'Scout Media',
              'Fansided',
            ]}
          />
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
