import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import style from './style.scss'
import Sidebar from './sections/sidebar'
import Letterbar from './sections/letterbar'
import MainContentArea from './sections/mainContentArea'
import { makeSelectGlobalSection } from 'Reducers/app'

class Glossary extends Component {
  render() {
    const {
      match: {
        params: { letter, term },
      },
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
    return (
      <div className="grid-container col-12">
        <Letterbar content={letters} />
        <div className={style.glossaryBodyContainer}>
          <Sidebar letter={letter} content={letters} term={term} />
          <MainContentArea
            content={letters[letter]}
            term={term}
            letter={letter}
          />
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
