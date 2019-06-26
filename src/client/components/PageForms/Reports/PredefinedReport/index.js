import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Fields } from 'redux-form'
import cx from 'classnames'
import { compose } from 'redux'
import style from '../style.scss'
import SelectBox from '../../../Form/CustomCheckbox'
import RightArrowCircle from 'Components/Icons/RightArrowCircle'
import { randomKey } from 'Utils'
import { push } from 'connected-react-router'

import { ThemeContext } from 'ThemeContext/themeContext'

const getBrandKeysFromObject = (obj) => {
  return obj.map((item) => item.value)
}

class PredefinedReport extends Component {
  checkboxValidation = () => {
    const {
      formData: { values },
    } = this.props

    return !!values && !!values.length && values.indexOf(true) !== -1
  }

  goToReport = (values) => {
    const { push } = this.props
    console.log('go to report', values)
    push(`/reports/predefined-reports/20aa7853-ed00-4e1b-9cf4-d2b8f03c72c3`)
  }

  render() {
    const {
      handleSubmitFunc,
      handleSubmit,
      predefinedReports: { data, error, loading },
    } = this.props

    const formValid = this.checkboxValidation()

    const reportOptions =
      (!!data &&
        !!data.length &&
        data.map((r) => ({ value: r.uuid, label: r.title }))) ||
      []

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
                    names={getBrandKeysFromObject(reportOptions)}
                    component={SelectBox}
                    type="checkbox"
                    options={reportOptions}
                    canSelect={1}
                    checkboxValidation={this.checkboxValidation}
                  />
                </div>

                <button
                  className={cx(style.selectionLink, {
                    [style.active]: formValid,
                  })}
                  type="submit"
                  disabled={!formValid}
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

const mapStateToProps = (state) => {
  const { PredefinedReport } = state.form

  return {
    formData: PredefinedReport || {},
    predefinedReports: state.Reports.predefinedReports,
  }
}

const connected = connect(
  mapStateToProps,
  { push }
)(PredefinedReport)

export default compose(
  reduxForm({
    form: 'PredefinedReport',
  })
)(connected)
