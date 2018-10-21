import React from 'react'
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form'
import PropTypes from 'prop-types'
import FormButton from 'Components/Form/Controls/Button'
import FormContainer from 'Components/Form/Container'
import FormFooter from 'Components/Form/Footer'
import { Input, Textarea, TextField, Fieldset} from 'Components/Form/Controls'
import { required, email, length3, length8 } from 'Utils/validate'
import { baseName } from 'Utils/globals'
import style from './styles.scss'

import classnames from 'classnames'

class LoginEmailForm extends React.PureComponent {

  render() {
    const {
      handleSubmit,
      pristine, submitting,
      touch, error,
      handleSignup,
      errors
    } = this.props

    const classNames = classnames({
      'blue-button': true,
      //pending: syncErrors,
    })

    return (
      <form className={ style.emailLoginForm } onSubmit={ handleSubmit }>
        <FormContainer>
          <Fieldset>
            <TextField
              name="email"
              component={ Input }
              type="text"
              placeholder="Username or Email"
              validate={ [ required ]  }
              onChange={ (e) => touch('email') }
              autoFocus={ true }
              className="condensed"
              />

            <TextField
              name="password"
              component={ Input }
              type="password"
              placeholder="Password"
              onChange={ (e) => touch('password') }
              validate={  required  }
              className="tight"
            />
          </Fieldset>
        </FormContainer>

        <FormFooter>
          <FormButton
            className="black"
            type="submit"
            name="nextStep"
            id="nextStep"
            disabled={submitting}
            label="Log In"
          />

        <div className={ style.message} >
          { errors && errors.length ? <div className={ style.validation }>{errors.join(';')}</div>:null }
          <div className={ style.messageContainer }>
            <div className={ style.forgotPassword }>
              <a href={`${baseName}forgot-password`}>Forgot password?</a>
            </div>
            <a onClick={ handleSignup }>Sign Up</a>
          </div>
        </div>
        </FormFooter>
      </form>
    )
  }
}

LoginEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  formId: PropTypes.string,
  user: PropTypes.string,
  error: PropTypes.string,
  formData: PropTypes.object
}

export default reduxForm({
  form: 'loginEmailForm',
  //asyncValidate: asyncForm,
  destroyOnUnmount: true,
  enableReinitialize: true,
})(LoginEmailForm)

