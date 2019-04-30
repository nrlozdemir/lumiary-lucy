import React from 'react'
import classnames from 'classnames'
import { socialIconSelector } from 'Utils'
import styles from './style.scss'

const defaultProps = {
	containerNoBorder: false,
	containerClassName: classnames(styles.container, 'col-3 ml-0'),
  contentClassName: styles.content,
  barOpacityClassName: styles.barOpacity,
  barClassName: styles.bar,
  width: "100%",
  height: "auto"
}

const parse = (children) => {
	if(children.length == 3){
		return children
	} else if (children.length == 2) {
		children[1] = ""
		children.push(children[1])
	} else if (children.length == 3 && children[1] == children[2]) {
		children[3] = ""
		children.push("")
	}

	return [
		children[0],
		children[1],
		children[2]
	]
}

export default class AssetLayer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
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
      height
		} = this.props

		const socialIcon = classnames(
			socialIconSelector(leftSocialIcon),
			styles.icon
		)

    return (
      <React.Fragment>
				<div className={classnames(
					containerClassName, {
						[styles.noBorder]: containerNoBorder
					}
				)} style={{width: width, height: height}}>
					<div className={contentClassName}>
						{children && children[0]}
					</div>
					<div className={barOpacityClassName}>
						{children && children[1]}
					</div>
					<div className={barClassName}>
						<div className={styles.barTitle}>
							{socialIcon && <span className={socialIcon} />}
							{title}
						</div>
						{centerText && <div className={styles.centerText}>{centerText}</div>}
						{rightValue && <div className={styles.barChart}>
							<div className={styles.barChartInfo}>
								<span>{rightValue}</span>
							</div>
						</div>}
					</div>
				</div>

      </React.Fragment>
    );
  }
}

AssetLayer.defaultProps = defaultProps
