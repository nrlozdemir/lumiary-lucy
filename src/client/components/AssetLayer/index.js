import React from 'react'
import classnames from 'classnames'
import { socialIconSelector } from 'Utils'
import styles from './style.scss'

import { withTheme } from 'ThemeContext/withTheme'

const AssetLayer = (props) => {
  const {
    containerClassName,
    contentClassName,
    barOpacityClassName,
    leftSocialIcon,
    centerText,
    title,
    containerNoBorder,
    rightValue,
    barClassName,
    children,
    width,
    height,
  } = props

  const socialIcon = classnames(socialIconSelector(leftSocialIcon), styles.icon)

  const themes = props.themeContext.colors

  return (
    <React.Fragment>
      <div
        className={classnames(containerClassName, {
          [styles.noBorder]: containerNoBorder,
        })}
        style={{
          width: width,
          height: height,
          border: `1px solid ${themes.chartStadiumBarBorder}`,
          color: themes.textColor,
        }}
      >
        <div className={contentClassName}>{children && children[0]}</div>
        <div
          className={barOpacityClassName}
          style={{ background: themes.moduleBackground }}
        >
          {children && children[1]}
        </div>
        <div className={barClassName}>
          <div className={styles.barTitle}>
            {socialIcon && <span className={socialIcon} />}
            {title}
          </div>
          {centerText && <div className={styles.centerText}>{centerText}</div>}
          {rightValue && (
            <div className={styles.barChart}>
              <div className={styles.barChartInfo}>
                <span>{rightValue}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

AssetLayer.defaultProps = {
  containerNoBorder: false,
  containerClassName: classnames(styles.container, 'col-3 ml-0'),
  contentClassName: styles.content,
  barOpacityClassName: styles.barOpacity,
  barClassName: styles.bar,
  width: '100%',
  height: 'auto',
}

export default withTheme(AssetLayer)
