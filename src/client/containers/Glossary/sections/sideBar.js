import React, { Component } from 'react'
import classnames from 'classnames'
import { NavLink, withRouter } from 'react-router-dom'
import { withTheme } from 'ThemeContext/withTheme'
import { capitalize } from 'Utils/text'
import style from '../style.scss'

class Sidebar extends Component {
  render() {
    const {
      letter,
      content,
      themeContext: { colors },
    } = this.props
    return (
      <div
        className={style.glossarySidebar}
        style={{
          boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
        }}
      >
        <div
          className={style.inputContainer}
          style={{
            backgroundColor: colors.letterBarBackground,
            color: colors.labelColor,
          }}
        >
          <span
            className={classnames('icon-search', style.searchIcon)}
            style={{
              color: colors.labelColor,
            }}
          />
          <input
            className={style.searchInput}
            placeholder="Search glossary..."
            style={{
              color: colors.labelColor,
            }}
          />
        </div>
        <div
          className={style.sideBarMenu}
          style={{
            backgroundColor: colors.sidebarBackgroundColor,
            color: colors.labelColor,
          }}
        >
          {letter
            ? content[letter] &&
              content[letter].map((menu, i) => (
                <NavLink
                  key={i}
                  to={`/glossary/${letter}/${menu.slug}`}
                  className={style.menuLink}
                  activeClassName={style.active}
                  style={{
                    backgroundColor: colors.sidebarBackgroundColor,
                    color: colors.labelColor,
                  }}
                >
                  <span className={style.menuText}>
                    {capitalize(menu.term)}
                  </span>
                </NavLink>
              ))
            : Object.keys(content).map((item) =>
                content[item].map((term, i) => (
                  <NavLink
                    key={i}
                    to={`/glossary/${item}/${term.slug}`}
                    className={style.menuLink}
                    activeClassName={style.active}
                    style={{
                      backgroundColor: colors.sidebarBackgroundColor,
                      color: colors.labelColor,
                    }}
                  >
                    <span className={style.menuText}>
                      {capitalize(term.term)}
                    </span>
                  </NavLink>
                ))
              )}
        </div>
      </div>
    )
  }
}

export default withTheme(Sidebar)
