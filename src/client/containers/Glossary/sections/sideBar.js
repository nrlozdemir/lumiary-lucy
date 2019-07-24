import React, { Component } from 'react'
import { withTheme } from 'ThemeContext/withTheme'
import style from '../style.scss'

class SidaBar extends Component {
  render() {
    const { colors } = this.props.themeContext
    return <div className={style.glossarySidebar}>SidaBar</div>
  }
}

export default withTheme(SidaBar)
