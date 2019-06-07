import React from 'react'
import styles from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'

class HorizontalBarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bars: props.data && props.data,
    }
  }
  renderBar = (bar) => {
    return (
      <div
        className={styles.bar}
        style={{
          backgroundColor: this.state.bars.backgroundColor,
          width: `${bar}%`,
          boxShadow: ` 0 2px 4px 0 ${
            this.props.themeContext.colors.barChartShadow
          }`,
        }}
      >
        <div
          style={
            this.props.reverse
              ? { right: 'calc(100% + 10px)' }
              : { left: 'calc(100% + 10px)' }
          }
        >
          {bar}%
        </div>
      </div>
    )
  }
  render() {
    const { bars } = this.state
    const {
      themeContext: { colors },
      grids,
      reverse,
    } = this.props
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
          {bars.data.map((bar, idx) => (
            <React.Fragment key={idx}>{this.renderBar(bar)}</React.Fragment>
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
