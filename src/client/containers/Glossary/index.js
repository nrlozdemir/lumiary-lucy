import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import style from './style.scss'
import Sidebar from './sections/sideBar'
import Letterbar from './sections/letterBar'
import MainContentArea from './sections/mainContentArea'
import { makeSelectGlobalSection } from 'Reducers/app'

class Glossary extends Component {
  render() {
    const {
      match: {
        params: { letter, term },
      },
      location: { pathname },
      history,
      content: {
        data: {
          glossary: { terms: letters },
        },
      },
    } = this.props
    if (!letters) {
      return null
    }

    let menuName
    if (term) {
      switch (pathname) {
        case '/glossary/p/properties':
          menuName = 'Properties'
          break
        case '/glossary/f/formats':
          menuName = 'Formats'
          break
        case '/glossary/p/pages':
          menuName = 'Pages'
          break
        default:
          menuName = null
      }
    }

    return (
      <div className="grid-container col-12">
        <Letterbar content={letters} />
        <div className={style.glossaryBodyContainer}>
          <Sidebar letter={letter} content={letters} term={term} />
          <MainContentArea content={letters} menu={menuName} letter={letter} term={term} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectGlobalSection(),
})

const withConnect = connect(mapStateToProps)

export default compose(
  withConnect,
  withRouter
)(Glossary)
