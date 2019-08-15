import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectOAuth } from 'Reducers/auth'

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
      themeContext: { colors },
      OAuth: { connects, success, message, loading },
    } = this.props
    const { validationError } = this.state

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
              It is recommended to connect all your brand's social platforms to your Lumiere dashboard to ensure full access to all insights provided.
            </p>
          </div>

          <div className={style.list}>
            {Object.keys(connects).map((connect, key) => (
              <div
                key={key}
                className={cx(style.listItem, {
                  [style.connected]: connects[connect].connected,
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
                <span
                  className={cx(style.listItemCheck, `icon-Check`)}
                />
              </div>
            ))}
          </div>

          <div className={style.submitArea}>
            <Button
              customClass={cx(style.buttonStyle, style.button)}
              disable={
                !Object.keys(connects).filter(
                  (connect) => connects[connect].connected
                ).length
              }
              buttonText="Complete Onboarding"
            />
          </div>
        </div>
      </AccountCard>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  OAuth: makeSelectOAuth(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  withTheme
)(OAuth)
