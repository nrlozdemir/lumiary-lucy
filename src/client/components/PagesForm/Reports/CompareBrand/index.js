import React from 'react'
import { Field, reduxForm, Fields } from 'redux-form'
import cx from 'classnames'
import Input from 'Components/Form/Input'
import { compose } from 'redux'
import style from '../style.scss'
import { selectOptionsBrand } from '../options'
import { required } from 'Utils/validate'
import SelectBox from '../../../Form/CustomCheckbox'

const getBrandKeysFromObject = () => {
  return selectOptionsBrand.map((item) => item.value)
}

const CompareBrand = (props) => {
  return (
    <form onSubmit={() => console.log('object')}>
      <div className={style.formArea}>
        <div className={style.formGroup}>
          <p className={style.label}> Choose 2 Brands</p>
          <Fields
            names={getBrandKeysFromObject()}
            component={SelectBox}
            type="checkbox"
            options={selectOptionsBrand}
            canSelect={2}
          />
        </div>

        <div className={style.formGroup}>
          <p className={style.label}>Title</p>
          <Field
            component={Input}
            id="title"
            name="title"
            placeholder="Show this to steve…"
            validate={[required]}
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
    form: 'CompareBrand',
  })
)(CompareBrand)
