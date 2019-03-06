import React, { Component } from 'react'
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { compose, bindActionCreators } from "redux"
import { actions, makeSelectMarketview } from "Reducers/marketview"

import ColorCard from 'Containers/Marketview/sections/main/ColorCard'
import PacingCard from 'Containers/Marketview/sections/main/PacingCard'
import FormatCard from 'Containers/Marketview/sections/main/FormatCard'
import TotalViewsCard from 'Containers/Marketview/sections/main/TotalViewsCard'
import TotalCompetitorViewsCard from 'Containers/Marketview/sections/main/TotalCompetitorViewsCard'

class Main extends Component {
  componentDidMount() {
    this.props.getBubleChartRequest()
    this.props.getPacingChartRequest()
    this.props.getFormatChartRequest()
    this.props.getTotalViewsRequest()
    this.props.getTotalCompetitorViewsRequest()
  }
	render() {
    const {
      marketview: { bubleChartData, pacingChartData, formatChartData, totalViewsData, totalCompetitorViewsData }
    } = this.props
		return (
			<React.Fragment>
				<div className="grid-collapse">
          <div className="col-4 mb-48">
            {bubleChartData && <ColorCard bubleChartData={bubleChartData}/>}
          </div>

          <div className="col-4 mb-48">
            {pacingChartData && <PacingCard pacingChartData={pacingChartData}/>}
          </div>

          <div className="col-4 mb-48">
            {formatChartData && <FormatCard formatChartData={formatChartData}/>}
          </div>
        </div>

        <div className="grid-collapse">
          {totalViewsData && <TotalViewsCard totalViewsData={totalViewsData}/>}
          {totalCompetitorViewsData && <TotalCompetitorViewsCard totalCompetitorViewsData={totalCompetitorViewsData}/>}
        </div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = createStructuredSelector({
  marketview: makeSelectMarketview()
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Main)
