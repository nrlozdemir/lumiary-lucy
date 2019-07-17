import React from 'react'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { actions } from 'Reducers/auth'
import { Field, reduxForm } from 'redux-form'
import { required } from 'Utils/validate'

import Input from 'Components/Form/Input'
import AccountCard from 'Components/AccountCard'

import style from '../style.scss'

import { withTheme } from 'ThemeContext/withTheme'

const LoginForm = ({
  themeContext: { colors },
  loginRequest,
  handleSubmit,
}) => {
  return (
    <AccountCard>
      <form
        className={style.form}
        onSubmit={handleSubmit((values) => loginRequest(values))}
      >
        <div className={style.info}>
          <div className={style.image}>
            <img src="https://s3.amazonaws.com/quickframe-media/group/logo/bleacher-report-logo.png" />
          </div>
          <h1>Sign into your account</h1>
        </div>

        <div className={style.input}>
          <Field
            component={Input}
            id="email"
            name="email"
            placeholder="Enter email..."
            required={true}
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
          />
        </div>
        <div className="text-center">
          <a className={style.link} href="/account/forgot-password">
            Forgot Password?
          </a>

          <button className={style.button}>Sign In</button>
        </div>
      </form>
    </AccountCard>
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  null,
  mapDispatchToProps
)

export default compose(
  reduxForm({
    form: 'LoginForm',
  }),
  withConnect,
  withTheme
)(LoginForm)
