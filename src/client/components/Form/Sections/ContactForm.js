'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'
import { formValueSelector, reduxForm } from 'redux-form'
import { required, email } from 'Utils/validate'

import style from './styles.scss'

import { Input, Textarea, TextField } from 'Components/Form/Controls'
import FormButton from 'Components/Form/Controls/Button'
import Select from 'Components/Form/Controls/Select'
import SelectField from 'Components/Form/Controls/SelectField'

class ContactForm extends React.PureComponent {
	constructor() {
		super();
	}
	
	/* label {string} 
	 * placeholder {string}
	 * name {string}
	 * styleType {string} - style object field
	 */
	renderInputTile(label, placeholder, name, styleType) {
		const { pristine, submitting } = this.props;

		return (
			<div className={ cx(style.tile, styleType) }>
				<div className={ style.tileContent }>
					<TextField
						className="fullWidth"
						filledClass={ style.filled }
						label={ label } 
		                name={ name }
		                type="text"
		                id={ (name === "message") ? "message" : null}
		                component={ Input }
		                placeholder={ placeholder }
		                validate={ (name==="email") 
		                	? [required, email] : required }
              		/>
              		{ (name === "message") &&
              			<input className={ style.submit }  disabled={ pristine || submitting} type="submit" value="Send Message" />
              		}
				</div>
			</div>
		);
	}

	renderSelectTile() {
		return(
			<div className={ style.tile }>
				<div className={ style.tileContent }>
					<SelectField
						defaultOption={1}
						id="client"
						label="I am..."
        		        name="client"
						options={[
							{ value: "creator", label: "Creator", name: "client" },
							{ value: "business", label: "Business", name: "client" },
						]}
                	validate={ required }
              		/>
				</div>
			</div>
		);
	}

	renderReferrerTile() {
		return(
			<div className={ cx(style.tile, style.tile4) }>
				<div className={ style.tileContent }>
					<div className={ style.referrerWrapper }>
						<label htmlFor="referrer">How did you hear about us? <span>(optional)</span>
						</label>
						<TextField
							className="fullWidth"
							filledClass={ style.filled }
							id="referrer"
			                name="referrer"
			                type="text"
			                component={ Input }
			                placeholder="Enter how you heard about us…"
			              />
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { clientType, handleSubmit, loggedIn, pristine, profile, submitting  } = this.props;

		return (
			<form className={ style.contactForm } onSubmit={ handleSubmit }>
				<div className={ style.contact }>

					{ this.renderSelectTile() }

					{ this.renderInputTile("Name", "Enter your name...", 
						"name", style.tile2) }

					{ this.renderInputTile("Email", "Enter your email...", 
						"email", style.tile3) }

					{(clientType === 'business') &&
						this.renderInputTile("Company", "Enter company name...", 
						"company", style.tile4) 
					}
					{(clientType !== 'business') &&
						this.renderReferrerTile()
					}

					{ this.renderInputTile("Website", "Enter company website...", 
						"website", style.tile5) }

					{ this.renderInputTile("Message", "Enter your message...", 
						"message", style.tile6) }
				</div>
	    </form>
		)
	}
}

ContactForm.propTypes = {
	handleSubmit: PropTypes.func,
	pristine: PropTypes.bool,
	submitting: PropTypes.bool,
	formData: PropTypes.object
}

ContactForm.defaultProps = {
	handleSubmit: null,
	pristine: null,
	submitting: null,
	formData: null
}

ContactForm = reduxForm({
	form: 'contactForm'
})(ContactForm)

const selector = formValueSelector('contactForm');

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    contact: state.contact,
		clientType: selector(state, 'client')
  }
}

export default connect(mapStateToProps, null)(ContactForm)
