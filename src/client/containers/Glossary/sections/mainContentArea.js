import React, { Component } from 'react'
import { withTheme } from 'ThemeContext/withTheme'
import style from '../style.scss'

class MainContentArea extends Component {
  render() {
    const { colors } = this.props.themeContext
    console.log('Main content area page props: ', this.props)
    return <div className={style.glossaryMain}>MainContentArea</div>
  }
}

export default withTheme(MainContentArea)
