import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Select from 'Components/Form/Select'
import Input from 'Components/Form/Input'
import cx from 'classnames'
import { compose } from 'redux'
import { required } from 'Utils/validate'
import RightArrowCircle from "Components/Icons/RightArrowCircle";

import style from '../style.scss'

import {
  selectOptionsBrand,
  selectOptionsSocial,
  selectOptionsEngagement,
  selectOptionsDateRange,
} from '../options'

import { ThemeContext } from 'ThemeContext/themeContext'

const ReportsForm = (props) => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        return (
          <form
            onSubmit={props.handleSubmit(props.handleSubmitFunc)}
            style={{ color: colors.textColor }}
          >
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
                  validate={required}
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
                  validate={required}
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
                  validate={required}
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
                  validate={required}
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
                  validate={required}
                />
              </div>
              <button
                className={cx(style.selectionLink, {
                  [style.active]: props.valid,
                })}
                type="submit"
                disabled={!props.valid}
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

export default compose(
  reduxForm({
    form: 'ReportsForm',
  })
)(ReportsForm)
