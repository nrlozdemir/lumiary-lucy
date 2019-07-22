import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectForgotPassword } from 'Reducers/auth'
import { Field, reduxForm, getFormSyncErrors } from 'redux-form'
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
  return errors
}

class ForgotPassword extends Component {
  state = {
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
      forgotPasswordRequest,
      handleSubmit,
      forgotPassword: { message, success, loading, password },
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
                state: success ? 'success' : 'error',
              }
            : validationError
        }
        loading={loading}
      >
        <form
          className={style.form}
          onSubmit={
            !dirty || submitting || pristine || !isEmpty(errors)
              ? undefined
              : handleSubmit((values) => forgotPasswordRequest(values))
          }
        >
          <div className={style.info}>
            <div className={style.image}>
              <img src="https://s3.amazonaws.com/quickframe-media/group/logo/bleacher-report-logo.png" />
            </div>
            <h1>Forgot Password?</h1>
          </div>

          <div className={style.input}>
            <Field
              component={Input}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email..."
              required={true}
            />
          </div>
          <div className={style.submitArea}>
            <Button
              customClass={style.buttonStyle}
              disable={!dirty || submitting || pristine || !isEmpty(errors)}
              buttonText="Send Password Reset Link"
            />
            <Link className={style.forgotPasswordLink} to={'/account/login'}>
              Go back to <span className={style.active}>Sign In</span>
            </Link>
          </div>
        </form>
      </AccountCard>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  forgotPassword: makeSelectForgotPassword(),
  errors: getFormSyncErrors('ForgotPassword'),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  reduxForm({
    form: 'ForgotPassword',
    validate,
  }),
  withConnect,
  withTheme
)(ForgotPassword)
