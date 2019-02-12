/**
  *
  * Marketview
  *
*/

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import  makeSelectMarketview  from 'Selectors/Marketview.js'
import { actions } from 'Reducers/Marketview';

import TopVideosChart from 'Components/Charts/MarketView/TopVideos';

/* eslint-disable react/prefer-stateless-function */
export class Marketview extends React.Component {
  componentDidMount() {
    this.props.getCompetitorTopVideosRequest();
  }
  render() {
    const { marketview: { competitorTopVideos } } = this.props;
    return (
      <Fragment>
        {competitorTopVideos && <TopVideosChart chartData={competitorTopVideos}/>}
      </Fragment>
    );
  }
}

Marketview.propTypes = {};

const mapStateToProps = createStructuredSelector({
  marketview: makeSelectMarketview(),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);


export default compose(withConnect)(Marketview);