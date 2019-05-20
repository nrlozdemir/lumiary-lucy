import React, { Component } from 'react'
import { reduxForm, Fields } from 'redux-form'
import cx from 'classnames'
import { compose } from 'redux'
import style from '../style.scss'
import { selectPredefinedBrands } from '../options'
import SelectBox from '../../../Form/CustomCheckbox'
import RightArrowCircle from "Components/Icons/RightArrowCircle";

import { ThemeContext } from 'ThemeContext/themeContext'

const getBrandKeysFromObject = () => {
  return selectPredefinedBrands.map((item) => item.value)
}
class PredefinedReport extends Component {
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
                  <p className={style.label}> Show me..</p>
                  <Fields
                    names={getBrandKeysFromObject()}
                    component={SelectBox}
                    type="checkbox"
                    options={selectPredefinedBrands}
                    canSelect={1}
                    checkboxValidation={this.checkboxValidation}
                  />
                </div>

                <button
                  className={cx(style.selectionLink, {
                    [style.active]: this.state.formValid,
                  })}
                  type="submit"
                  disabled={!this.state.formValid}
                  style={{
                    background: colors.modalButtonBackground,
                    color: colors.textColor,
                  }}
                >
                  Generate Report
                <div className={style.icon}>
                  <RightArrowCircle></RightArrowCircle>
                </div>
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
    form: 'PredefinedReport',
  })
)(PredefinedReport)
