import React, { Component } from 'react'
import cx from 'classnames'
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
                message,
                state: success ? 'success' : 'error',
              }
            : null
        }
        loading={loading}
        colors={colors}
      >
        <div className={style.info}>
          <div className={style.image}>
            <img src="https://s3.amazonaws.com/quickframe-media/group/logo/bleacher-report-logo.png" />
          </div>
          <h1 style={colors.account.h1 || {}}>Here are ya compeitorz yo</h1>
        </div>
        <div className={style.list}>
          {!!data &&
            !!data.length &&
            data.map((competitor, key) => (
              <div
                key={key}
                className={style.listItem}
                style={colors.account.list.item || {}}
              >
                <span
                  className={style.listItemIcon}
                  style={colors.account.list.icon || {}}
                >
                  <img src={competitor.cover} />
                </span>
                <span
                  className={cx(
                    style.listItemText,
                    style.listItemTextNoneUnderline
                  )}
                  style={colors.account.list.text || {}}
                >
                  {competitor.name}
                </span>
              </div>
            ))}
        </div>
        <div className={style.submitArea}>
          <Link
            className={style.link}
            style={colors.account.link || {}}
            to="/account/competitors"
          >
            Request or remove a competitor
          </Link>
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
