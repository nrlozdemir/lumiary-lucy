import React from 'react'
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form'
import PropTypes from 'prop-types'
import FormButton from 'Components/Form/Controls/Button'
import FormContainer from 'Components/Form/Container'
import FormFooter from 'Components/Form/Footer'
import { Input, Textarea, TextField, Fieldset} from 'Components/Form/Controls'
import { required, email, length3, length8 } from 'Utils/validate'
import { baseName } from 'Utils/globals'
import classnames from 'classnames'
import style from './styles.scss'

class SignupEmailForm extends React.PureComponent {

  render() {
    const {
      handleLogin, handleSubmit, pristine, submitting,
      touch, errors, buttonClassName, errorMsg
    } = this.props


    console.log(errors)

    return (
      <form className={ style.emailLoginForm} onSubmit={ handleSubmit }>
        <FormContainer>
          <Fieldset>
            <TextField
                name="username"
                component={ Input }
                type="text"
                placeholder="Username"
                validate={ required }
                onChange={ (e) => touch('username') }
                autoFocus={ true }
                className="tight"
              />

            <TextField
                name="email"
                component={ Input }
                type="text"
                placeholder="Email"
                validate={ [ required, email ]  }
                onChange={ (e) => touch('email') }
                className="tight"
              />

            <TextField
                name="password"
                component={ Input }
                type="password"
                placeholder="Password"
                onChange={ (e) => touch('password') }
                validate={ required }
                className="tight"
              />

          </Fieldset>
        </FormContainer>
        <FormFooter>

          { errors.length ?
              <div className={ style.signupError }>{ errors }</div>
            :null
          }

          <FormButton
            className="blue"
            type="submit"
            name="nextStep"
            id="nextStep"
            disabled={submitting}
            label="Sign Up"
          />

          <div className={ style.message }>

            <div className={ style.buyerLogin }>
              <a onClick={handleLogin}>Login</a>
            </div>

          </div>
        </FormFooter>
      </form>
    )
  }
}

SignupEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  formId: PropTypes.string,
  user: PropTypes.string,
  error: PropTypes.string,
  formData: PropTypes.object
}

export default reduxForm({
  form: 'signupEmailForm',
  //asyncValidate: asyncForm,
  //destroyOnUnmount: true,
  //enableReinitialize: true,
})(SignupEmailForm)

