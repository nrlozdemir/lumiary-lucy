import React from 'react'
import { Field, FormSection } from 'redux-form'
import PropTypes from 'prop-types'
import { Input } from 'Components/Form/Controls'
import TextField from 'Components/Form/Controls/TextField'
import { required, email } from 'Utils/validate'

class Signup extends FormSection {

  render(){

    return(
      <fieldset>
        <legend>Sign up!</legend>

       <TextField
          name="email"
          component={ Input }
          type="email"
          placeholder="Email Address"
          validate={[ required, email ]}
        />

        <TextField
          name="password"
          component={ Input }
          type="password"
          placeholder="Password"
          validate={ required }
        />

        <TextField
          name="first_name"
          component={ Input }
          placeholder="First Name"
          validate={ required }
        />

        <TextField
          name="last_name"
          component={ Input }
          placeholder="Last Name"
          validate={ required }
        />

      </fieldset>
    )
  }
}

export default Signup
