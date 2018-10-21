import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import FormButton from 'Components/Form/Controls/Button'
import FormContainer from 'Components/Form/Container'
import FormFooter from 'Components/Form/Footer'
import { Input, Textarea, TextField, Fieldset} from 'Components/Form/Controls'
import { required, email, number, equals6 } from 'Utils/validate'
import classnames from 'classnames'
import style from './styles.scss'

class HomeContactForm extends React.PureComponent {

  constructor(){
    super()
    this.state = {
      expanded: false
    }
  }

  expand = () => {
    if(!this.state.expanded) {
      this.setState({
        expanded: true
      })
    }

  }

  render() {

    const { handleSubmit, pristine, submitting } = this.props
    const { expanded } = this.state
   // const { loggedIn } = window.django

    const classNames = classnames({
      [style.hide]: !expanded
    })

    const footerClassNames = classnames({
      hide: !expanded
    })

    return (
      <form className={ style.homeContact } role="form" onSubmit={ handleSubmit }>
        <FormContainer>
          <Fieldset>
            <TextField
              name="name"
              component={ Input }
              placeholder="Full Name"
              validate={ required }
              className="tight"
            />

            <TextField
              name="email"
              component={ Input }
              placeholder="Email"
              validate={ [ required, email ] }
              onFocus={ this.expand }
              className="tight"
            />

            <div className={ classNames }>
              <TextField
                name="message"
                component={ Textarea }
                rows="10"
                placeholder="Your message."
                validate={ required }
                className="tight"
              />
            </div>

            <div className={ classNames }>
              <TextField
                name="human"
                component={ Input }
                placeholder="2 + 4 = ?"
                validate={ [ required, number, equals6 ] }
                className="tight"
              />
            </div>



            <FormFooter className={ footerClassNames }>
              <FormButton className="white" disabled={ pristine || submitting} label="Send Message" />
            </FormFooter>

          </Fieldset>
        </FormContainer>
      </form>
    )
  }
}

HomeContactForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
}

HomeContactForm = reduxForm({
  form: 'homeContactForm',
})(HomeContactForm)

export default HomeContactForm



