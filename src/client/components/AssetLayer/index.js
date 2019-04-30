import React from 'react'
import classnames from 'classnames'
import styles from './style.scss'

const defaultProps = {
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
			socialIconClass,
			title,
			rightScore,
      barClassName,
      children,
      width,
      height
		} = this.props

    return (
      <React.Fragment>
				<div className={containerClassName} style={{width: width, height: height}}>
					<div className={contentClassName}>
						{children && children[0]}
					</div>
					<div className={barOpacityClassName}>
						{children && children[1]}
					</div>
					<div className={barClassName}>
						<span className={socialIconClass} />
						{title}
						{rightScore}
					</div>
				</div>

      </React.Fragment>
    );
  }
}

AssetLayer.defaultProps = defaultProps
