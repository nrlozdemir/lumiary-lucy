import React, { Component } from 'react'
import classnames from 'classnames'
import { NavLink, withRouter } from 'react-router-dom'
import { withTheme } from 'ThemeContext/withTheme'
import { capitalize } from 'Utils/text'
import style from '../style.scss'

class SidaBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: [
        'aamplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
        'Amplitude',
      ]
    }
  }
  render() {
    const { colors } = this.props.themeContext
    const { menus } = this.state
    const { urlInfo: { match = {}, history = {} } } = this.props

    return (
    <div className={style.glossarySidebar}>
      <div className={style.inputContainer}>
        <span className={classnames("icon-search", style.searchIcon)} />
        <input className={style.searchInput} placeholder="Search glossary..."/>
      </div>
      <div className={style.sideBarMenu}>
        {menus.map((menu, i) => (
          <NavLink
            key={i}
            to={`/glossary/${menu.toLowerCase()}`}
            className={style.menuLink}
            activeClassName={style.active}
            isActive={() => {
                console.log('i : ', i ,'match : ', match.params.term.toLowerCase())
                console.log('location : ', location)
                match && match.params && match.params.term && match.params.term.toLowerCase() === menu.toLowerCase()
            }}
          >
            <span className={style.menuText}>{capitalize(menu)}</span>
          </NavLink>
        ))}
      </div>
    </div>
    )
  }
}

export default withTheme(withRouter(SidaBar))
