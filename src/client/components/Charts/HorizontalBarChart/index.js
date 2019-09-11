import React from 'react'
import styles from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import { isEqual } from 'lodash'
import ToolTip from 'Components/ToolTip'

class HorizontalBarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bars: props.data && props.data,
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { data } = props
    const { bars } = state
    if (!isEqual(JSON.stringify(data), JSON.stringify(bars))) {
      return {
        bars: data,
      }
    }
    return null
  }

  renderBar = (bar, label = false) => {
		const tooltipKey = Math.random()
    return (
			<React.Fragment>
				<div
					className={styles.bar}
					style={{
						backgroundColor: this.state.bars.backgroundColor,
						width: `${bar}%`,
						boxShadow: ` 0 2px 4px 0 ${
							this.props.themeContext.colors.barChartShadow
						}`,
					}}
					data-tip={'Tooltip Text'}
					data-for={`hc-${tooltipKey}`}
				>
					<div
						style={
							this.props.reverse
								? { right: 'calc(100% + 10px)' }
								: { left: 'calc(100% + 10px)' }
						}
					>
					</div>
				</div>
				<ToolTip
					effect="solid"
					id={`hc-${tooltipKey}`}
					template='HorizontalBarChart'
					tooltipProps={{
						value: !!bar && bar,
						label: !!label && label,
						metric: 'Pacing',
						property: 'Slow',
						gender: 'male'
					}}

				/>
			</React.Fragment>
    )
  }

  render() {
    const { bars } = this.state
    const {
      themeContext: { colors },
      grids,
      reverse,
		} = this.props

		console.log("Horizontal Bar Chart component props", this.props.data)

    return (
      <div
        className={styles.barWrapper}
        style={{
          backgroundColor: colors.bodyBackground,
          borderTop: `1px solid ${colors.moduleBorder}`,
          borderBottom: `1px solid ${colors.moduleBorder}`,
        }}
      >
        <div
          className={styles.barContainer}
          style={{
            alignItems: `${reverse ? 'flex-end' : 'flex-start'}`,
          }}
        >
          {!!bars &&
            !!bars.data &&
            !!bars.data.length &&
            bars.data.map((bar, idx) => (
              <React.Fragment key={idx}>{this.renderBar(bar, !!bars.label && bars.label)}</React.Fragment>
            ))}
        </div>
        <div className={styles.grids}>
          {grids.map((grid, idx) => (
            <div
              key={idx}
              className={styles.grid}
              style={{ backgroundColor: colors.moduleBorder }}
            >
              <div>{grid}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
export default withTheme(HorizontalBarChart)
