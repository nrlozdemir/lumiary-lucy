import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAuth } from 'Reducers/auth'
import { Field, reduxForm, getFormSyncErrors, getFormValues } from 'redux-form'
import { Link } from 'react-router-dom'

import Input from 'Components/Form/Input'
import AccountCard from 'Components/AccountCard'
import Button from 'Components/Form/Button'
import { isEmpty } from 'lodash'

import style from '../style.scss'

import { withTheme } from 'ThemeContext/withTheme'

const validate = ({ email, password }) => {
  const errors = {}
  if (!email) {
    errors.inVisibleError = true
    return errors
  }
  if (!!email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = true
    errors.error = 'Invalid email address'
    return errors
  }
  if (!password || password.length <= 3) {
    errors.inVisibleError = true
    return errors
  }
  if (password && password.length > 3 && password.length < 8) {
    errors.password = true
    errors.error = 'Password Must Contain At Least 8 Characters'
    return errors
  }
  return errors
}

class LoginForm extends Component {
  state = {
    isFormValid: false,
    validationError: null,
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
      loginRequest,
      handleSubmit,
      auth: { loggedIn, message, loading },
      dirty,
      submitting,
      pristine,
      errors,
    } = this.props
    const { validationError } = this.state
    return (
      <AccountCard
        status={
          message
            ? {
                message,
                state: loggedIn ? 'success' : 'error',
              }
            : validationError
        }
        loading={loading}
        colors={colors}
      >
        <form
          className={style.form}
          onSubmit={
            !dirty || submitting || pristine || !isEmpty(errors)
              ? undefined
              : handleSubmit((values) => loginRequest(values))
          }
        >
          <div className={style.info}>
            <div className={style.image}>
              <img src="https://s3.amazonaws.com/quickframe-media/group/logo/bleacher-report-logo.png" />
            </div>
            <h1 style={colors.account.h1 || {}}>Sign into your account</h1>
          </div>

          <div className={style.input}>
            <Field
              component={Input}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email..."
              required={true}
              style={colors.account.input || {}}
            />
          </div>

          <div className={style.input}>
            <Field
              component={Input}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password..."
              required={true}
              style={colors.account.input || {}}
            />
          </div>
          <div className={style.submitArea}>
            <Link
              className={style.link}
              style={colors.account.link || {}}
              to={'/account/forgot-password'}
            >
              Forgot Password?
            </Link>
            <Button
              disable={!dirty || submitting || pristine || !isEmpty(errors)}
              buttonText="Sign In"
            />
          </div>
        </form>
      </AccountCard>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
  errors: getFormSyncErrors('LoginForm'),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  reduxForm({
    form: 'LoginForm',
    validate,
  }),
  withConnect,
  withTheme
)(LoginForm)
