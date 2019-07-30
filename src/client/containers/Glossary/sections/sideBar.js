import React, { Component } from 'react'
import classnames from 'classnames'
import { NavLink, withRouter } from 'react-router-dom'
import { withTheme } from 'ThemeContext/withTheme'
import { capitalize } from 'Utils/text'
import style from '../style.scss'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm : '',
      contents: []
    }
    this.menuRef = []
    this.sideBarRef = React.createRef()
  }
  scrollToElement() {
    const { term } = this.props
    const selectedElem = this.menuRef[`sidebar-${term}`]

    if(!!term && !!selectedElem) {
      const topPos = selectedElem.offsetTop
      this.sideBarRef.scrollTop = topPos - 10
    }
  }
  componentDidUpdate() {
    this.scrollToElement()
  }
  componentDidMount() {
    const {
      letter,
      content,
    } = this.props
    const newContentArray = []
    if(!letter) {
      Object.keys(content).forEach(letter => {
        content[letter].forEach(item => {
           newContentArray.push({ ...item, letter })
        })
      })
    }else {
      content[letter].forEach(item => {
        newContentArray.push({ ...item,letter })
      })
    }
    this.setState({
      contents: newContentArray
    })
    this.scrollToElement()
  }
  onInputTermChange(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }
  renderNavLink(menu) {
    const {
      themeContext: { colors },
    } = this.props
    return <NavLink
      id={`sidebar-${menu.slug}`}
      to={`/glossary/${menu.letter}/${menu.slug}`}
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
  }
  fiterContentBySearch(searchTerm) {
    const { contents } = this.state
    const filteredArr = contents.filter(item => item.term.toLowerCase().includes(searchTerm.toLowerCase()))
    return filteredArr
  }

  render() {
    const {
      letter,
      content,
      themeContext: { colors },
      menuContent,
    } = this.props
    const { searchTerm, contents } = this.state
    let filteredContents = contents

    if(searchTerm) {
      filteredContents = this.fiterContentBySearch(searchTerm)
    }

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
            onChange={this.onInputTermChange.bind(this)}
            placeholder="Search glossary..."
            style={{
              color: colors.labelColor,
            }}
          />
        </div>
        <div
          id='glossarySideBarMenuContent'
          ref={e => this.sideBarRef = e}
          className={style.sideBarMenu}
          style={{
            backgroundColor: colors.sidebarBackgroundColor,
            color: colors.labelColor,
          }}
        >
          {[...(menuContent || filteredContents)].map((menu, i) => (

            <div key={i} ref={menuRef => this.menuRef[`sidebar-${menu.slug}`] = menuRef}>
              {this.renderNavLink(menu)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default withTheme(Sidebar)
