import React, { Component } from 'react'
import { Field, reduxForm, Fields } from 'redux-form'
import cx from 'classnames'
import Input from 'Components/Form/Input'
import { compose } from 'redux'
import style from '../style.scss'
import { selectOptionsBrand } from '../options'
import { required } from 'Utils/validate'
import SelectBox from '../../../Form/CustomCheckbox'
import RightArrowCircle from "Components/Icons/RightArrowCircle";

import { ThemeContext } from 'ThemeContext/themeContext'

const getBrandKeysFromObject = () => {
  return selectOptionsBrand.map((item) => item.value)
}

class CompareBrand extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formValid: false,
    }
  }

  checkboxValidation = (valid) => {
    this.setState({ formValid: valid })
  }

  render() {
    const valid = this.props.valid && this.state.formValid

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => {
          return (
            <form
              onSubmit={this.props.handleSubmit(this.props.handleSubmitFunc)}
              style={{ color: colors.textColor }}
            >
              <div className={style.formArea}>
                <div className={style.formGroup}>
                  <p className={style.label}> Choose 2 Brands</p>
                  <Fields
                    names={getBrandKeysFromObject()}
                    component={SelectBox}
                    type="checkbox"
                    options={selectOptionsBrand}
                    canSelect={2}
                    checkboxValidation={this.checkboxValidation}
                  />
                </div>

                <div className={style.formGroup}>
                  <p className={style.label}>Title</p>
                  <Field
                    component={Input}
                    id="title"
                    name="title"
                    placeholder="Show this to steve…"
                    validate={required}
                  />
                </div>
                <button
                  className={cx(style.selectionLink, {
                    [style.active]: valid,
                  })}
                  type="submit"
                  disabled={!valid}
                  style={{
                    background: colors.modalButtonBackground,
                    color: colors.textColor,
                  }}
                >
                  Generate Report
                  <RightArrowCircle containerClass={style.icon}></RightArrowCircle>
                </button>
              </div>
            </form>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default compose(
  reduxForm({
    form: 'CompareBrand',
  })
)(CompareBrand)
