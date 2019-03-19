/**
 *
 * Navbar
 *
 */

import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import { createStructuredSelector } from "reselect"
import DetailHeader from './DetailHeader';
import { makeSelectLibrary } from "Reducers/library"

import style from './style.scss'
// import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class Navbar extends React.Component {
  render() {
    const containerClass = classnames('bg-dark-grey-blue ' + style.container)
    const linksClass = classnames(style.links)
    const profileClass = classnames(style.profile)
    const imageClass = classnames('circleImage ' + style.profileImage)

    return (
      <div className={containerClass}>
        <div className={style.logo}>
          <Link to="/">Lumiere</Link>
        </div>
        <div className={linksClass}>
          <NavLink to="/panoptic" activeClassName={style.activeLink}>
            Panoptic
          </NavLink>
          <NavLink to="/library" activeClassName={style.activeLink}>
            Library
          </NavLink>
          <NavLink to="/marketview" activeClassName={style.activeLink}>
            Marketview
          </NavLink>
          <NavLink to="/quickview" activeClassName={style.activeLink}>
            QuickView
          </NavLink>
          <NavLink to="/reports" activeClassName={style.activeLink}>
            Reports
          </NavLink>
        </div>
        <div className={profileClass}>
          <div className="float-right">
            <img src="https://picsum.photos/30" className={imageClass} />
            <span>Bleacher Report</span>
          </div>
        </div>
      </div>
    )
  }
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(Navbar)
