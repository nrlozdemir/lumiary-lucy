/**
  *
  * Marketview
  *
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import  makeSelectMarketview  from 'Selectors/Marketview.js'

/* eslint-disable react/prefer-stateless-function */
export class Marketview extends React.Component {
  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

Marketview.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  marketview: makeSelectMarketview(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);


export default compose(withConnect)(Marketview);