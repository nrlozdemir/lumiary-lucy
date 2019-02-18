import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from "redux"
import { actions, makeSelectMarketview } from "Reducers/marketview"

import style from './style.scss';

import ColorCard from 'Components/MarketviewCards/color';
import FormatCard from 'Components/MarketviewCards/format';
import PacingCard from 'Components/MarketviewCards/pacing';
import TotalViewsChart from 'Components/TotalViewsChart';
import TotalCompetitorViewsChart from 'Components/TotalCompetitorViewsChart';

/* eslint-disable react/prefer-stateless-function */
export class Marketview extends React.Component {
	render() {
		return (
			<div className="grid-container col-12">
				<div className={style.alignTabs}>
					<Link to="/marketview/platform" className={style.tab}>
						Platform
          </Link>
					<Link to="/marketview/competitor" className={style.tab}>
						Competitor
          </Link>
					<Link to="/marketview/time" className={style.tab}>
						Time
          </Link>
				</div>
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
			</div>
		);
	}
}

Marketview.propTypes = {}

const mapStateToProps = createStructuredSelector({
	marketview: makeSelectMarketview()
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(Marketview)

