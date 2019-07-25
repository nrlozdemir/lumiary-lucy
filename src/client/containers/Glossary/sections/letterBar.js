import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import style from '../style.scss'
import { capitalize } from 'Utils/text'
class LetterBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      letters: [
        'all',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
      ],
    }
  }

  render() {
    const { letters } = this.state
    return (
      <div className={cx(style.letterBar)}>
        {letters.map((letter) => (
          <NavLink
            to={`/glossary/${letter}`}
            className={cx(style.letter)}
            activeClassName={cx(style.activeLetter)}
          >
            {capitalize(letter)}
          </NavLink>
        ))}
      </div>
    )
  }
}

export default LetterBar
