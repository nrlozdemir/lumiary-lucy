import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectCompetitors } from 'Reducers/auth'
import { Link } from 'react-router-dom'

import AccountCard from 'Components/AccountCard'
import Button from 'Components/Form/Button'

import style from '../style.scss'

import { withTheme } from 'ThemeContext/withTheme'

class Competitors extends Component {
  componentDidMount() {
    this.props.getCompetitors()
  }

  render() {
    const {
      themeContext: { colors },
      competitors: { data, loading, success, message },
    } = this.props
    console.log('data', data)
    return (
      <AccountCard
        status={
          message
            ? {
                success,
                state: loggedIn ? 'success' : 'error',
              }
            : null
        }
      >
        <div className={style.info}>
          <div className={style.image}>
            <img src="https://s3.amazonaws.com/quickframe-media/group/logo/bleacher-report-logo.png" />
          </div>
          <h1>Here are ya compeitorz yo</h1>
          <div className={style.accountTable}>
            <ul>
              {!!data &&
                !!data.length &&
                data.map((competitor, index) => {
                  return (
                    <li key={index}>
                      <div className={style.image}>
                        <img src={competitor.cover} />
                      </div>
                      <p>{competitor.name}</p>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
        <div className={style.submitArea}>
          <a className={style.link}>Request or remove a competitor</a>
          <Button buttonText="Continue" />
        </div>
      </AccountCard>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  competitors: makeSelectCompetitors(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  withTheme
)(Competitors)
