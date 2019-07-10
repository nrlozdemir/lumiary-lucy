import React from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'
import style from './style.scss'

/* eslint-disable react/prefer-stateless-function */
class SocialSelectBoxes extends React.Component {
  render() {
    const cx = classnames(style.SocialSelectBoxes)
    const socialMediaApps = ['Facebook', 'Instagram', 'Youtube', 'Twitter']
    return (
      <React.Fragment>
        <label
          className={style.label}
          htmlFor="socialIcon-container"
          style={{ color: this.props.colors.textColor }}
        >
          Social Platform
        </label>
        <div name="socialIcon-container" className={cx}>
          {socialMediaApps.map((app) => (
            <div className={style.socialCheckbox} key={app}>
              <Field
                type="checkbox"
                colors={this.props.colors}
                onChange={(e) => {
                  this.props.clickEvent(e)
                }}
                component={(props) => {
                  return (
                    <React.Fragment>
                      <input
                        type="checkbox"
                        id={app}
                        name={app}
                        onChange={props.input.onChange}
                        checked={props.input.checked}
                      />
                      <label
                        className={`${style.labelSocial} icon-${app}-square`}
                        style={
                          props.input.value !== true
                            ? {
                                backgroundColor:
                                  props.colors.socialCheckboxBackground,
                                color: props.colors.socialColor,
                              }
                            : {
                                backgroundColor:
                                  props.colors.socialActiveBackground,
                                color: props.colors.socialColor,
                              }
                        }
                        htmlFor={app}
                      />
                    </React.Fragment>
                  )
                }}
                name={app}
              />
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }
}

SocialSelectBoxes.propTypes = {}

export default SocialSelectBoxes
