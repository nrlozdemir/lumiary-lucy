import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectUpdatePassword } from 'Reducers/auth'
import { Field, reduxForm, getFormSyncErrors } from 'redux-form'
import { Link } from 'react-router-dom'

import Button from 'Components/Form/Button'
import { isEmpty } from 'lodash'

import Input from 'Components/Form/Input'
import AccountCard from 'Components/AccountCard'

import style from '../style.scss'

import { withTheme } from 'ThemeContext/withTheme'

const validate = ({ password, confirmPassword }) => {
  const errors = {}
  if (!password || password.length <= 3) {
    errors.inVisibleError = true
    return errors
  }
  if (!confirmPassword || confirmPassword.length <= 3) {
    errors.inVisibleError = true
    return errors
  }
  if (
    password &&
    confirmPassword &&
    (password.length > 3 && confirmPassword.length > 3)
  ) {
    if (password.length < 8 || confirmPassword.length < 8) {
      errors.error = 'Password Must Contain At Least 8 Characters'
      return errors
    }
    if (password.length >= 8 || confirmPassword.length >= 8) {
      if (confirmPassword !== password) {
        errors.error = 'Passwords Do Not Match'
        return errors
      }
    }
  }

  return errors
}

class ChangePassword extends Component {
  state = {
    validationError: null,
    showPassword: false,
    showConfirmPassword: false,
  }

  togglePasswordType = (type) => {
    this.setState({
      [`show${type}`]: !this.state[`show${type}`],
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      if (this.props.errors && this.props.errors.error) {
        this.setState({
          validationError: {
            message: this.props.errors.error,
            state: 'error',
          },
        })
      } else {
        this.setState({
          validationError: null,
        })
      }
    }
  }

  render() {
    const {
      themeContext: { colors },
      updatePassword,
      handleSubmit,
      passwordUpdate: { message, success, loading },
      dirty,
      submitting,
      pristine,
      errors,
    } = this.props
    return (
      <AccountCard
        status={
          message
            ? {
                message,
                state: success ? 'success' : 'error',
              }
            : this.state.validationError
        }
        loading={loading}
        colors={colors}
      >
        <form
          className={style.form}
          onSubmit={
            !dirty || submitting || pristine || !isEmpty(errors)
              ? undefined
              : handleSubmit((values) => updatePassword(values))
          }
        >
          <div className={style.info}>
            <div className={style.image}>
              <img src="https://s3.amazonaws.com/quickframe-media/group/logo/bleacher-report-logo.png" />
            </div>
            <h1 style={colors.account.h1 || {}}>Update your password</h1>
          </div>

          <div className={style.input}>
            <Field
              component={Input}
              type={this.state.showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter new password…"
              required={true}
              style={colors.account.input || {}}
            />
            <p
              style={colors.account.link || {}}
              onClick={() => this.togglePasswordType('Password')}
            >
              show
            </p>
          </div>

          <div className={style.input}>
            <Field
              component={Input}
              type={this.state.showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password…"
              required={true}
              style={colors.account.input || {}}
            />
            <p
              style={colors.account.link || {}}
              onClick={() => this.togglePasswordType('ConfirmPassword')}
            >
              show
            </p>
          </div>
          <div className={style.submitArea}>
            <Button
              disable={!dirty || submitting || pristine || !isEmpty(errors)}
              buttonText="Continue"
            />
          </div>
        </form>
      </AccountCard>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  passwordUpdate: makeSelectUpdatePassword(),
  errors: getFormSyncErrors('ChangePassword'),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  reduxForm({
    form: 'ChangePassword',
    validate,
  }),
  withConnect,
  withTheme
)(ChangePassword)
