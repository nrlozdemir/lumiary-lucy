import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Fields, reset } from 'redux-form'
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

    return (
      !!values &&
      Object.keys(values).some((key) => !!values[key])
    )
  }

  goToReport = (values) => {
    const { push } = this.props

    const reportUuid = !!values && Object.keys(values).filter((key) => !!values[key]) || []

    if(!!reportUuid.length) {
      push(`/reports/predefined-reports/${reportUuid[0]}`)
    }
  }

  render() {
    const {
      reset,
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
                {!!reportOptions && !!reportOptions.length ? (
                  <React.Fragment>
                    <div className={style.formGroup}>
                      <p className={style.label}> Show me..</p>
                      <Fields
                        names={getBrandKeysFromObject(reportOptions)}
                        component={SelectBox}
                        type="checkbox"
                        options={reportOptions}
                        canSelect={1}
                        checkboxValidation={this.checkboxValidation}
                        reset={reset}
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
                  </React.Fragment>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    No Predefined Reports Available
                  </div>
                )}
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
