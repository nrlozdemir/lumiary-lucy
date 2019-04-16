import React from 'react'
import { Field, reduxForm, Fields } from 'redux-form'
import cx from 'classnames'
import Input from 'Components/Form/Input'
import { compose } from 'redux'
import style from '../style.scss'
import { selectOptionsBrand } from '../options'

const required = (value) => (value ? undefined : 'Required')

const getBrandKeysFromObject = () => {
  return selectOptionsBrand.map((item) => item.value)
}
const getBrandNamesFromObject = (field) => {
  return selectOptionsBrand.find((item) => item.value === field).label
}

const canSelect = (fields) => {
  const selectedFields = fields.names.filter(
    (field) => fields[field].input.value === true
  )
  return selectedFields.length == 2 ? true : false
}

const selectBox = (props) => {
  return props.names.map((field) => {
    return (
      <div
        className={cx(style.selectBoxContainer, {
          [style.selected]: props[field].input.value,
        })}
      >
        <label htmlFor={props[field].input.name}>
          {getBrandNamesFromObject(field)}
        </label>
        <input
          className={style.selectBox}
          type="checkbox"
          id={props[field].input.name}
          {...props[field].input}
          disabled={props[field].input.value ? false : canSelect(props)}
        />
        <span className={cx(style.selectCircle)} />
      </div>
    )
  })
}

const inputField = ({ input }) => {
  return <input {...input} />
}

const CompareBrand = (props) => {
  console.log(props)
  return (
    <form onSubmit={() => console.log('object')}>
      <div className={style.formArea}>
        <div className={style.formGroup}>
          <p className={style.label}> Choose 2 Brands</p>
          <Fields
            names={getBrandKeysFromObject()}
            component={selectBox}
            type="checkbox"
          />
        </div>

        <div className={style.formGroup}>
          <p className={style.label}>Title</p>
          <Field
            customClass={style.input}
            component={inputField}
            id="title"
            name="title"
            placeholder="Show this to steve…"
            validate={[required]}
          />
        </div>
        <button
          className={style.selectionLink}
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
