import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import style from '../style.scss'
import { capitalize } from 'Utils/text'
import { withTheme } from 'ThemeContext/withTheme'

class LetterBar extends Component {
  render() {
    const {
      content,
      themeContext: { colors },
    } = this.props
    return (
      <div
        id='glossaryLetterBar'
        className={cx(style.letterBar)}
        style={{
          borderColor: colors.letterBorder,
        }}
      >
        <NavLink
          to={`/glossary`}
          className={cx(style.letter)}
          style={{
            backgroundColor: colors.letterBarBackground,
            color: colors.labelColor,
            borderColor: colors.letterBorder,
          }}
        >
          All
        </NavLink>
        {Object.keys(content).map((letter, index) => {
          if (!!content[letter].length) {
            return (
              <NavLink
                key={`letters-${index}`}
                to={`/glossary/${letter}`}
                className={cx(style.letter)}
                activeClassName={cx(style.activeLetter)}
                style={{
                  backgroundColor: colors.letterBarBackground,
                  color: colors.labelColor,
                  borderColor: colors.letterBorder,
                }}
                activeStyle={{ backgroundColor: '#2fd7c4', color: '#ffffff' }}
              >
                {capitalize(letter)}
              </NavLink>
            )
          } else {
            return (
              <span
                className={cx(style.letter, style.deactiveLetter)}
                style={{
                  backgroundColor: colors.deactiveLetter,
                  color: colors.labelColor,
                  borderColor: colors.letterBorder,
                }}
              >
                {capitalize(letter)}
              </span>
            )
          }
        })}
      </div>
    )
  }
}

export default withTheme(LetterBar)
