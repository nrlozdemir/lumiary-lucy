/**
 *
 * SocialSelectBoxes
 *
 */

import React from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'

// import PropTypes from 'prop-types';
import style from './style.scss'

/* eslint-disable react/prefer-stateless-function */
class SocialSelectBoxes extends React.Component {
  render() {
    const cx = classnames(style.SocialSelectBoxes)
    const socialMediaApps = [
      'Facebook',
      'Instagram',
      'Youtube',
      'Twitter',
      'Pinterest',
    ]
    return (
      <React.Fragment>
        <label className={style.label} htmlFor="socialIcon-container">
          Social Platform
        </label>
        <div name="socialIcon-container" className={cx}>
          {socialMediaApps.map((app) => (
            <div className={style.socialCheckbox} key={app}>
              <Field
                type="checkbox"
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
                        className={`${style.labelSocial} icon-${app}-Bubble`}
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
