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

class ForgotPassword extends Component {
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
      >
        <div className={style.form}>
          <div className={style.info}>
            <div className={style.image}>
              <img src="https://s3.amazonaws.com/quickframe-media/group/logo/bleacher-report-logo.png" />
            </div>
            <h1>Give us ya informationz</h1>
            <p>
              Need a disclaimer if a user does not connect with any social
              accounts, graphs will be blank
            </p>
          </div>

          <div className={style.oauth}>
            {Object.keys(connects).map((connect, key) => (
              <div
                className={cx(
                  style.connect,
                  {
                    [style.connected]: connects[connect].connected,
                  },
                  `icon-${connect}-square`
                )}
                onClick={() => this.connectSocial(connect)}
                key={key}
              >
                <span>Connect with {connects[connect].name}</span>
              </div>
            ))}
          </div>

          <div className={style.submitArea}>
            <Button
              customClass={style.buttonStyle}
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
)(ForgotPassword)
