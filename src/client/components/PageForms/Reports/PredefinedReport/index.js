import React, { Component } from 'react'
import { reduxForm, Fields } from 'redux-form'
import cx from 'classnames'
import { compose } from 'redux'
import style from '../style.scss'
import { selectPredefinedBrands } from '../options'
import SelectBox from '../../../Form/CustomCheckbox'

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
      <form onSubmit={this.props.handleSubmit(this.props.handleSubmitFunc)}>
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
          >
            Generate Report
            <div className={style.icon}>
              <span className="icon-Right-Arrow-Circle">
                <span className="path1" />
                <span className="path2" />
                <span className="path3" />
              </span>
            </div>
          </button>
        </div>
      </form>
    )
  }
}

export default compose(
  reduxForm({
    form: 'PredefinedReport',
  })
)(PredefinedReport)
