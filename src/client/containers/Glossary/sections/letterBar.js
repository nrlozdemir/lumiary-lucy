import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import style from '../style.scss'
import { capitalize } from 'Utils/text'
class LetterBar extends Component {
  render() {
    const { content } = this.props
    return (
      <div className={cx(style.letterBar)}>
        <NavLink to={`/glossary`} className={cx(style.letter)}>
          All
        </NavLink>
        {Object.keys(content).map((letter) => {
          if (!!content[letter].length) {
            return (
              <NavLink
                to={`/glossary/${letter}`}
                className={cx(style.letter)}
                activeClassName={cx(style.activeLetter)}
              >
                {capitalize(letter)}
              </NavLink>
            )
          } else {
            return (
              <span className={cx(style.letter, style.deactiveLetter)}>
                {capitalize(letter)}
              </span>
            )
          }
        })}
      </div>
    )
  }
}

export default LetterBar
