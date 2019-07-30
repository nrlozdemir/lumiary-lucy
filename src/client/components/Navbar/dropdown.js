import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './style.scss'
import classnames from 'classnames'
import { withTheme } from 'ThemeContext/withTheme'

import Switch from 'Components/Form/Switch'

class Dropdown extends Component {
  constructor() {
    super()

    this.state = {
      showMenu: false,
      switchOn: false,
    }
  }

  showMenu = (event) => {
    event.preventDefault()

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }

  closeMenu = (event) => {
    if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu)
      })
    }
  }

  controlSwitch = () => {
    const { setColor, status } = this.props.themeContext
    setColor(status === 'dark' ? 'light' : 'dark')
  }

  render() {
    const { switchOn } = this.state
    const { avatar, logout } = this.props
    const { status, colors } = this.props.themeContext
    const imageClass = classnames('circleImage ' + style.profileImage)

    return (
      <div>
        <img
          src={avatar || `https://picsum.photos/id/836/30/30`}
          className={imageClass}
          onClick={this.showMenu}
        />

        {this.state.showMenu ? (
          <div
            className={style.dropdown}
            ref={(element) => {
              this.dropdownMenu = element
            }}
            style={{
              background: colors.themeControlBackground,
              borderColor: colors.themeControlBorder,
              boxShadow: `0 2px 6px 0 ${colors.themeControlShadow}`,
              color: colors.textColor,
            }}
          >
            <ul>
              <li style={{ borderColor: colors.themeControlListBorder }}>
                <p className={style.text}>Night Mode</p>
                <Switch
                  id={Math.random()}
                  switchOn={status === 'dark'}
                  controlSwitch={this.controlSwitch}
                />
              </li>
              <li style={{ borderColor: colors.themeControlListBorder }}>
                <p className={style.text}>Glossary</p>
              </li>
              <li>
                <p className={style.text}>Support</p>
              </li>
              <li>
                <p onClick={() => logout()} className={style.text}>
                  Logout
                </p>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    )
  }
}

export default withTheme(Dropdown)
