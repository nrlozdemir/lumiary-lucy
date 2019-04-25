import React from 'react'
import { reduxForm, Fields } from 'redux-form'
import cx from 'classnames'
import { compose } from 'redux'
import style from '../style.scss'
import { selectPredefinedBrands } from '../options'
import SelectBox from '../../../Form/CustomCheckbox'

const getBrandKeysFromObject = () => {
  return selectPredefinedBrands.map((item) => item.value)
}

const PredefinedReport = (props) => {
  return (
    <form onSubmit={props.handleSubmit(props.handleSubmitFunc)}>
      <div className={style.formArea}>
        <div className={style.formGroup}>
          <p className={style.label}> Show me..</p>
          <Fields
            names={getBrandKeysFromObject()}
            component={SelectBox}
            type="checkbox"
            options={selectPredefinedBrands}
            canSelect={1}
          />
        </div>

        <button
          className={cx(style.selectionLink, { [style.active]: props.valid })}
          type="submit"
          disabled={!props.valid}
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

export default compose(
  reduxForm({
    form: 'PredefinedReport',
  })
)(PredefinedReport)
