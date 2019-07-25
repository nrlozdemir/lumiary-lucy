import React, { Component } from 'react'
import classnames from 'classnames'
import { NavLink, withRouter } from 'react-router-dom'
import { withTheme } from 'ThemeContext/withTheme'
import { capitalize } from 'Utils/text'
import style from '../style.scss'

class SidaBar extends Component {
  render() {
    const { colors } = this.props.themeContext
    const { letter, content } = this.props

    return (
    <div className={style.glossarySidebar}>
      <div className={style.inputContainer}>
        <span className={classnames("icon-search", style.searchIcon)} />
        <input className={style.searchInput} placeholder="Search glossary..."/>
      </div>
      <div className={style.sideBarMenu}>
        {content[letter] && content[letter].map((menu, i) => (
          <NavLink
            key={i}
            to={`/glossary/${letter}/${menu.term.toLowerCase()}`}
            className={style.menuLink}
            activeClassName={style.active}
          >
            <span className={style.menuText}>{capitalize(menu.term)}</span>
          </NavLink>
        ))}
      </div>
    </div>
    )
  }
}

export default withTheme(withRouter(SidaBar))
