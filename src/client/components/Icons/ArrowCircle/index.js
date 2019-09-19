import React from 'react'
import { ThemeContext } from 'ThemeContext/themeContext'
import cx from 'classnames'
import styles from './style.scss'

export default class ArrowCircleIconComponent extends React.Component {
  static contextType = ThemeContext

  render() {
    const { size = null, flatIcon = false, direction = 'down' } = this.props
    const {
      iconColor,
      iconBackground,
      iconBorder,
    } = this.context.themeContext.colors
    const commonStyle = {
      fontSize: size,
    }

    const iconName = direction.replace(/^.{1}/g, direction[0].toUpperCase())

    return (
      <span
        className={cx(`icon-${iconName}-Arrow-Circle`, this.props.className)}
      >
        <span
          className={cx(styles[`${direction}-path1`], {
            ['flat-icon']: flatIcon,
          })}
          style={{ ...commonStyle, color: iconBackground }}
        />
        {!flatIcon && (
          <span
            className={styles[`${direction}-path2`]}
            style={{ ...commonStyle, color: iconBorder }}
          />
        )}
        <span
          className={cx(styles[`${direction}-path3`], {
            ['flat-icon']: flatIcon,
          })}
          style={{ ...commonStyle, color: iconColor }}
        />
      </span>
    )
  }
}
