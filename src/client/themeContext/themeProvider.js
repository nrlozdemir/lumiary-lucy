import { ThemeContext } from './themeContext'
import { themes } from './colors'
import React from 'react'

class ThemeProvider extends React.Component {
  constructor() {
    super()
    const { colors } = ThemeContext._currentValue.themeContext
    this.state = {
      setColor: this.setColor,
      colors: { ...themes.dark },
    }
  }

  setColor = (name) => {
    console.log(name)
    this.setState({ colors: themes[name] })
  }

  componentDidMount() {}

  componentDidUpdate() {
    console.log('@@')
    document.body.style.backgroundColor = this.state.colors.bodyBackground
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
