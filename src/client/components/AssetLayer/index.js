import React from 'react'
import classnames from 'classnames'
import { socialIconSelector } from 'Utils'
import { withTheme } from 'ThemeContext/withTheme'
import styles from './style.scss'

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
    truncateTitle,
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
          boxShadow: `0 2px 6px 0 ${themes.assetLayerShadowColor}`,
          border: `1px solid ${themes.assetLayerBorderColor}`,
          color: themes.textColor,
        }}
      >
        <div className={contentClassName}>{children && children[0]}</div>
        <div
          className={barOpacityClassName}
          style={{ background: themes.moduleBackground }}
        />
        <div className={barClassName}>
          <div className={styles.barTitle}>
            {socialIcon && <span className={socialIcon} />}
            {truncateTitle ? (
              <p className={styles.videoTitle} title={title}>
                {title}
              </p>
            ) : (
              title
            )}
          </div>
          {centerText && <div className={styles.centerText}>{centerText}</div>}
          <div className={styles.barChart}>
            {children && children[1] && (
              <div className={styles.percentageWrapper}>{children[1]}</div>
            )}
            <div className={styles.barChartInfo}>
              {rightValue && <span>{rightValue}</span>}
            </div>
          </div>
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
