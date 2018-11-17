import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'Reducers/home'
import { actions as marketActions } from 'Reducers/marketview'
import SubNav from '../views/subNav'
import cx from 'classnames'
import style from '../styles.scss'
// import PropTypes from 'prop-types'

class Competitor extends Component {
  render() {
    return (
      <div className={cx(style.marketView, style.competitor)}>
        <SubNav/>
        <div className={style.container}>
          Competitor
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(Object.assign({}, actions, marketActions), dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Competitor)
