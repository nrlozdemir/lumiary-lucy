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
import { createStructuredSelector } from 'reselect'
import DetailHeader from './DetailHeader'
import { makeSelectLibrary } from 'Reducers/library'

import style from './style.scss'
// import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class Navbar extends React.Component {
  detailStates(match, videos) {
    const basePath = match.path.split('/')[1]
    let title = null

    if (basePath === 'library') {
      const video =
        videos.find(({ id }) => id == Object.values(match.params)[0]) || {}
      title = video.title
    }

    return {
      basePath,
      title,
      url: '/' + basePath,
    }
  }

  render() {
    const containerClass = classnames('bg-dark-grey-blue ' + style.container)
    const linksClass = classnames(style.links)
    const profileClass = classnames(style.profile)
    const imageClass = classnames('circleImage ' + style.profileImage)
    const {
      match,
      library: { videos },
    } = this.props

		// temporary solution for quickview

		const isQuickview = match.url.split('/')[1] === 'quickview'

		return (
      <React.Fragment>
        {Object.keys(match.params).length && !isQuickview ? (
          <DetailHeader data={this.detailStates(match, videos)} />
        ) : (
          <div className={containerClass}>
            <div className={style.logo}>
              <Link to="/">Lumiere</Link>
            </div>
            <div className={linksClass}>
              <NavLink to="/panoptic" activeClassName={style.activeLink}>
                Panoptic
              </NavLink>
              <NavLink to="/audience" activeClassName={style.activeLink}>
                Audience
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
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Navbar)
