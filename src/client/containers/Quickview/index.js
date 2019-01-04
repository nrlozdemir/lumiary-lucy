/**
  *
  * Quickview
  *
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import  makeSelectQuickview  from 'Selectors/Quickview.js'

/* eslint-disable react/prefer-stateless-function */
export class Quickview extends React.Component {
  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

Quickview.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  quickview: makeSelectQuickview(),
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


export default compose(withConnect)(Quickview);