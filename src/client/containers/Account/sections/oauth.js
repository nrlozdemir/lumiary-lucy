import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectOAuth, makeSelectAuthProfile } from 'Reducers/auth'
import { push } from 'connected-react-router'

import AccountCard from 'Components/AccountCard'
import Button from 'Components/Form/Button'

import style from '../style.scss'

import { withTheme } from 'ThemeContext/withTheme'

class OAuth extends Component {
  state = {
    validationError: null,
  }

  connectSocial(name) {
    this.props.connectOAuthRequest(name)
  }

  render() {
    const {
      push,
      profile,
      updateHasOnboarded,
      themeContext: { colors },
      OAuth: { connects, success, message, loading },
    } = this.props

    const { validationError } = this.state

    const hasOnboarded =
      !!profile && !!profile.brand && profile.brand.has_onboarded

    return (
      <AccountCard
        status={
          message
            ? {
                message,
                state: success ? 'success' : 'error',
              }
            : validationError
        }
        loading={loading}
        colors={colors}
      >
        <div className={style.form}>
          <div className={style.info}>
            <h1 style={colors.account.h1 || {}}>Client Platform Access</h1>
            <p style={colors.account.p || {}}>
              It is recommended to connect all your brand's social platforms to
              your Lumiere dashboard to ensure full access to all insights
              provided.
            </p>
          </div>

          <div className={style.list}>
            {Object.keys(connects).map((connect, key) => (
              <div
                key={key}
                className={cx(style.listItem, {
                  [style.connected]: profile.brand[`oauth_${connect}`],
                })}
                onClick={() => this.connectSocial(connect)}
                style={colors.account.list.item || {}}
              >
                <span
                  className={cx(style.listItemIcon, `icon-${connect}-square`)}
                  style={colors.account.list.icon || {}}
                />
                <span
                  className={style.listItemText}
                  style={colors.account.list.text || {}}
                >
                  Connect with {connects[connect].name}
                </span>
                <span className={cx(style.listItemCheck, `icon-Check`)} />
              </div>
            ))}
          </div>

          <div className={style.submitArea}>
            <Button
              onClick={() => {
                push('/library')
              }}
              customClass={cx(style.buttonStyle, style.button)}
              disable={
                !Object.keys(connects).find(
                  (connect) => profile.brand[`oauth_${connect}`]
                )
              }
              buttonText="Complete Onboarding"
            />

            <div
              onClick={() =>
                hasOnboarded ? push('/library/') : updateHasOnboarded(true)
              }
              className={style.skipButton}
            >
              Skip
            </div>
          </div>
        </div>
      </AccountCard>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectAuthProfile(),
  OAuth: makeSelectOAuth(),
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actions, dispatch),
    push: (url) => dispatch(push(url)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  withTheme
)(OAuth)
