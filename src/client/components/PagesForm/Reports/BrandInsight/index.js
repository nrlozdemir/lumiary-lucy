import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Select from 'Components/Form/Select'
import Input from 'Components/Form/Input'
import { compose } from 'redux'

import style from '../style.scss'

import {
  selectOptionsBrand,
  selectOptionsSocial,
  selectOptionsEngagement,
  selectOptionsDateRange,
} from '../options'

const ReportsForm = ({}) => {
  return (
    <form onSubmit={() => console.log('object')}>
      <div className={style.formArea}>
        <div className={style.selectionArea}>
          <p className={style.label}>Choose a Brand</p>
          <Field
            component={Select}
            options={selectOptionsBrand}
            id="brand"
            name="brand"
            placeholder="Select One"
            label="Choose a Brand"
          />
        </div>
        <div className={style.selectionArea}>
          <p className={style.label}>Social Platform</p>
          <Field
            component={Select}
            options={selectOptionsSocial}
            id="social"
            name="social"
            placeholder="Social Platform"
            label="Social Platform"
          />
        </div>
        <div className={style.selectionArea}>
          <p className={style.label}>Engagement</p>
          <Field
            component={Select}
            options={selectOptionsEngagement}
            id="engagement"
            name="engagement"
            placeholder="Select One"
            label="Engagement"
          />
        </div>
        <div className={style.selectionArea}>
          <p className={style.label}>Date Range</p>
          <Field
            component={Select}
            options={selectOptionsDateRange}
            id="date"
            name="date"
            placeholder="Select Date"
            label="Date Range"
          />
        </div>
        <div className={style.selectionArea}>
          <p className={style.label}>Title</p>
          <Field
            component={Input}
            options={selectOptionsDateRange}
            id="title"
            name="title"
            placeholder="Enter title name"
          />
        </div>
        <button className={style.selectionLink} type="submit" disabled={true}>
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
    form: 'ReportsForm',
  })
)(ReportsForm)
