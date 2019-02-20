import React, { Component } from 'react'

import ColorCard from 'Components/MarketviewCards/color'
import FormatCard from 'Components/MarketviewCards/format'
import PacingCard from 'Components/MarketviewCards/pacing'
import TotalViewsChart from 'Components/TotalViewsChart'
import TotalCompetitorViewsChart from 'Components/TotalCompetitorViewsChart'

class Main extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="grid-collapse">
          <div className="col-4 mb-48">
            <ColorCard />
          </div>

          <div className="col-4 mb-48">
            <PacingCard />
          </div>

          <div className="col-4 mb-48">
            <FormatCard />
          </div>
        </div>

        <div className="grid-collapse">
          <TotalViewsChart />
          <TotalCompetitorViewsChart />
        </div>
			</React.Fragment>
		)
	}
}

export default Main
