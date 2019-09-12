import React from 'react'
import cx from 'classnames'
import { socialIconSelector } from 'Utils'
import { withTheme } from 'ThemeContext/withTheme'
import styles from './style.scss'

const AssetLayer = (props) => {
  const {
    isActive,
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

  const socialIcon = cx(socialIconSelector(leftSocialIcon), styles.icon)

  const themes = props.themeContext.colors

  return (
    <React.Fragment>
      <div
        className={cx(styles.container, 'col-3 ml-0', {
          [styles.noBorder]: containerNoBorder,
        })}
        style={{
          width: width,
          height: height,
          boxShadow: `0 2px 6px 0 ${themes.assetLayerShadowColor}`,
          border: `0.9px solid ${themes.assetLayerBorderColor}`,
          color: themes.textColor,
        }}
      >
        <div className={cx(styles.content, contentClassName)}>
          {children && children[0]}
        </div>

        <div
          className={cx(styles.barOpacity, barOpacityClassName, {
            [styles['barOpacity--notActive']]: !isActive,
          })}
          style={{
            background: themes.moduleBackgroundWithOpacity,
          }}
        />
        <div
          className={cx(styles.bar, barClassName, {
            [styles['bar--notActive']]: !isActive,
          })}
          style={{
            border: `0.9px solid ${themes.assetLayerShadowColor}`,
          }}
        >
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
              {rightValue && rightValue !== 'NaN' && <span>{rightValue}</span>}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

AssetLayer.defaultProps = {
  isActive: true,
  containerNoBorder: false,
  containerClassName: '',
  contentClassName: '',
  barOpacityClassName: '',
  barClassName: '',
  width: '100%',
  height: 'auto',
}

export default withTheme(AssetLayer)
