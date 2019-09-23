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

  getPasswordFieldComponent = (type) => {
    const types = {
      confirmPassword: {
        id: 'confirmPassword',
        name: 'confirmPassword',
        passwordToggleArgument: 'ConfirmPassword',
        placeholder: 'Confirm new password…',
        inputType: this.state.showConfirmPassword ? 'text' : 'password',
      },
      password: {
        id: 'password',
        name: 'password',
        passwordToggleArgument: 'Password',
        placeholder: 'Enter new password…',
        inputType: this.state.showPassword ? 'text' : 'password',
      },
    }

    return (
      <div className={style.input}>
        <Field
          component={Input}
          type={types[type].inputType}
          id={types[type].id}
          name={types[type].name}
          placeholder={types[type].placeholder}
          required={true}
          style={this.props.themeContext.colors.account.input || {}}
        />
        <p
          style={colors.account.link || {}}
          onClick={() => this.togglePasswordType(passwordToggleArgument)}
        >
          show
        </p>
      </div>
    )
  }

  isFormSubmittable = () => {
    const { dirty, submitting, pristine, errors } = this.props

    return !dirty || submitting || pristine || !isEmpty(errors)
  }

  render() {
    const {
      themeContext: { colors },
      updatePassword,
      handleSubmit,
      passwordUpdate: { message, success, loading },
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
            this.isFormSubmittable()
              ? undefined
              : handleSubmit((values) => updatePassword(values))
          }
        >
          <div className={style.info}>
            <h1 style={colors.account.h1 || {}}>Update your password</h1>
          </div>

          {this.getPasswordFieldComponent('password')}

          {this.getPasswordFieldComponent('confirmPassword')}

          <div className={style.submitArea}>
            <Button
              customClass={style.buttonStyle}
              disable={this.isFormSubmittable()}
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
