import React from 'react'
import { ThemeContext } from './themeContext'
export function withTheme(Component) {
  return function ThemeComponent(props) {
    return (
      <ThemeContext.Consumer>
        {(contexts) => <Component {...props} {...contexts} />}
      </ThemeContext.Consumer>
    )
  }
}
