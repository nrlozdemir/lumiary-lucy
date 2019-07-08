import { ThemeContext } from './themeContext'
import { themes } from './colors'
import React from 'react'

const checkTheme = window.localStorage.getItem('theme')
const check = checkTheme ? checkTheme : 'light'

class ThemeProvider extends React.Component {
  constructor() {
    super()
    const { colors } = ThemeContext._currentValue.themeContext
    this.state = {
      setColor: this.setColor,
      colors: { ...themes[check] },
    }
  }

  setColor = (name) => {
    window.localStorage.setItem('theme', name)
    this.setState({ colors: themes[name], status: name }, () => {
      document.body.style.backgroundColor = this.state.colors.bodyBackground
    })
  }

  componentDidMount() {
    this.setColor(check)
  }

  render() {
    return (
      <ThemeContext.Provider
        value={{
          themeContext: {
            ...this.state,
          },
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeProvider
