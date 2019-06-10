import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Fields } from 'redux-form'
import cx from 'classnames'
import { compose } from 'redux'
import style from '../style.scss'
import { selectPredefinedBrands } from '../options'
import SelectBox from '../../../Form/CustomCheckbox'
import RightArrowCircle from 'Components/Icons/RightArrowCircle'
import { randomKey } from 'Utils'
import { push } from 'connected-react-router'

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

  goToReport = (values) => {
    const { push } = this.props
    console.log('go to report', values)
    push(
      `/reports/predefined-reports/${randomKey(4)}-${randomKey(4)}-${randomKey(
        4
      )}-${randomKey(4)}`
    )
  }

  render() {
    const { handleSubmitFunc, handleSubmit } = this.props

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => {
          return (
            <form
              onSubmit={handleSubmit(this.goToReport)}
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
                    <RightArrowCircle />
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

const connected = connect(
  null,
  { push }
)(PredefinedReport)

export default compose(
  reduxForm({
    form: 'PredefinedReport',
  })
)(connected)
