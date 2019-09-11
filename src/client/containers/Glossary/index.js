import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose, bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { ThemeContext } from 'ThemeContext/themeContext'
import { actions } from 'Reducers/app'

import style from './style.scss'
import Sidebar from './sections/sideBar'
import Letterbar from './sections/letterBar'
import MainContentArea from './sections/mainContentArea'
import { makeSelectGlobalSection } from 'Reducers/app'
import RouterLoading from 'Components/RouterLoading'

const EmptyState = () => (
  <ThemeContext.Consumer>
    {({ themeContext: { colors } }) => (
      <div
        className={style.emptyState}
        style={colors.themeType === 'dark' ? { color: 'white' } : {}}
      >
        No Glossary Found
      </div>
    )}
  </ThemeContext.Consumer>
)

class Glossary extends Component {
  componentDidMount() {
    const {
      content: { data },
      getSectionExplanationsRequest,
    } = this.props

    if (typeof window === 'object') {
      if (!window.localStorage.getItem('sections') || !data) {
        getSectionExplanationsRequest()
      }
    } else {
      getSectionExplanationsRequest()
    }
  }

  render() {
    const {
      match: {
        params: { letter, term },
      },
      location: { pathname },
      history,
      content: { loading, data = {} },
    } = this.props

    if (loading) {
      return (
        <div>
          <RouterLoading />
        </div>
      )
    }

    if (!data) {
      return <EmptyState />
    }

    const {
      glossary: { terms: letters },
    } = data

    if (!letters) {
      return <EmptyState />
    }

    let menuName
    let contents

    const newContentArray = []
    Object.keys(letters).forEach((letter) => {
      letters[letter].forEach((item) => {
        newContentArray.push({ ...item, letter })
      })
    })
    if (term) {
      switch (pathname) {
        case '/glossary/p/properties':
          menuName = 'Properties'
          contents = newContentArray.filter((item) =>
            item.tags.map((tag) => tag.slug).includes('property')
          )
          break
        case '/glossary/f/formats':
          menuName = 'Formats'
          contents = newContentArray.filter((item) =>
            item.tags.map((tag) => tag.slug).includes('format')
          )

          break
        case '/glossary/p/pages':
          menuName = 'Pages'
          contents = newContentArray.filter((item) =>
            item.tags.map((tag) => tag.slug).includes('page')
          )

          break
        default:
          menuName = null
          contents = letters
      }
    }

    return (
      <div className="grid-container col-12">
        <Letterbar content={letters} />
        <div className={style.glossaryBodyContainer}>
          <Sidebar
            letter={letter}
            content={letters}
            term={term}
            menuContent={menuName && contents}
          />
          <MainContentArea
            content={contents || letters}
            menu={menuName}
            letter={letter}
            term={term}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectGlobalSection(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  withRouter
)(Glossary)
