import React from 'react'
import { shadeHexColor } from 'Utils'
import style from './style.scss'
import classnames from 'classnames'
import { withTheme } from 'ThemeContext/withTheme'

class Stadium extends React.Component {
  constructor(props) {
    super(props)
    this.stadium = React.createRef()
    this.text = React.createRef()
    this.currentBar = null
    this.state = {
      text: {
        width: 0,
        height: 0,
      },
      tooltipShow: false,
      title: null,
      value: null,
      top: 0,
    }
  }

  componentDidMount() {
    const { width, height } = this.text.current.getBoundingClientRect()
    this.setState({
      text: {
        width: width,
        height: height,
      },
    })
  }

  render() {
    if (!this.props.data) return

    let {
      stadiumText,
      angleColor,
      animationSpeed,
      borderWidth,
      border,
      angelBorder,
      infoSpaceW,
      infoSpaceH,
      data,
      themeContext,
    } = this.props
    // angelBorder = 4

    let l = data.length

    let infoSpaceWBorder = infoSpaceW + 2 * border
    let infoSpaceHBorder = infoSpaceH + 2 * border
    let otherSpace = angelBorder >= border ? angelBorder : border

    let svgW =
      infoSpaceWBorder + l * (2 * (borderWidth + otherSpace)) + 2 * borderWidth
    let svgH =
      infoSpaceHBorder + l * (2 * (borderWidth + otherSpace)) + 2 * borderWidth

    const {
      colors,
      colors: { themeType },
    } = themeContext

    return (
      <div className={style.stadiumChartContainer}>
        <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
          <g
            className={style.stadiumChart}
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            transform={`translate(${otherSpace / 2}, ${otherSpace / 2})`}
            ref={this.stadium}
          >
            {this.props.data.map((item, index) => {
              let w =
                infoSpaceWBorder +
                (l - index) * (2 * (borderWidth + border)) -
                borderWidth
              let h =
                infoSpaceHBorder +
                (l - index) * (2 * (borderWidth + border)) -
                borderWidth
              // otherSpace
              let x = (index + 1) * border + borderWidth + borderWidth / 2
              let y = (index + 1) * border + borderWidth + borderWidth / 2

              // rounded rectagle's perimeter is {p = 2 * [ a + b - r * ( 4 - π ) ]}
              // r = h / 2
              let total = 2 * (w + h - (h / 2) * (4 - Math.PI))
              let value = (total * item.value) / 100

              let angelWidth = w + borderWidth + angelBorder
              let angelHeight = h + borderWidth + angelBorder

              let angelTotal =
                2 *
                (angelWidth + angelHeight - (angelHeight / 2) * (4 - Math.PI))
              let angelValue = (angelTotal * value) / total - item.value / 10
              let legendPos =
                x + index * borderWidth + (borderWidth + border) / 2

              return (
                <React.Fragment key={`rect-${index}`}>
                  <defs>
                    <rect
                      id={`path-${index}`}
                      x={x + index * borderWidth}
                      y={y + index * borderWidth}
                      width={w}
                      height={h}
                      rx={h / 2}
                    />
                  </defs>

                  {/**/}
                  <rect
                    id="BORDER"
                    stroke={colors.chartStadiumBarBorder}
                    strokeWidth={border}
                    fill={colors.chartStadiumBarBackground}
                    x={x + index * borderWidth - (borderWidth + border) / 2}
                    y={y + index * borderWidth - (borderWidth + border) / 2}
                    width={w + borderWidth + border}
                    height={h + borderWidth + border}
                    rx={(h + borderWidth + border) / 2}
                  />

                  <rect
                    id="BAR"
                    data-value={item.value}
                    data-title={item.title}
                    onMouseOver={() => {
                      this.setState({
                        tooltipShow: true,
                        value: item.value,
                        title: item.title,
                        top: x + index * borderWidth - 23,
                      })
                    }}
                    onMouseOut={() => {
                      this.setState({
                        tooltipShow: false,
                        value: null,
                        title: null,
                        top: 0,
                      })
                    }}
                    stroke={item.color}
                    style={{
                      transition: `stroke-dasharray ${animationSpeed}s linear`,
                      strokeWidth: borderWidth,
                      strokeDasharray: `${value} ${total}`,
                    }}
                    x={x + index * borderWidth}
                    y={y + index * borderWidth}
                    width={w}
                    height={h}
                    rx={h / 2}
                  />

                  <rect
                    id="ANGLE"
                    stroke={colors.chartStadiumBarBackground}
                    strokeWidth={angelBorder}
                    style={{
                      transition: `stroke-dasharray ${animationSpeed}s linear`,
                      strokeDasharray: `${angelValue} ${total}`,
                    }}
                    x={
                      x + index * borderWidth - (borderWidth + angelBorder) / 2
                    }
                    y={
                      y + index * borderWidth - (borderWidth + angelBorder) / 2
                    }
                    width={w + borderWidth + angelBorder}
                    height={h + borderWidth + angelBorder}
                    rx={(h + borderWidth + angelBorder) / 2}
                  />

                  {l - 1 === index && stadiumText ? (
                    <React.Fragment>
                      <rect
                        id="Rectangle"
                        stroke={colors.chartStadiumBarBorder}
                        fill={colors.chartStadiumCenterBackground}
                        strokeWidth={border}
                        x={legendPos}
                        y={legendPos}
                        width={infoSpaceWBorder + border}
                        height={infoSpaceHBorder + border}
                        rx={infoSpaceHBorder / 2}
                      />

                      <text
                        id="Total-Percentage"
                        fontFamily="ClanOTBold"
                        fontSize="12"
                        fill={colors.textColor}
                        ref={this.text}
                      >
                        <tspan
                          x={
                            legendPos +
                            infoSpaceWBorder / 2 -
                            this.state.text.width / 2 +
                            border / 2
                          }
                          y={
                            legendPos +
                            infoSpaceHBorder / 2 +
                            this.state.text.height / 2
                          }
                        >
                          {stadiumText}
                        </tspan>
                      </text>
                    </React.Fragment>
                  ) : null}
                </React.Fragment>
              )
            })}
          </g>
        </svg>
        {this.state.tooltipShow && this.props.tooltipType === 'extended' && (
          <div
            style={{ top: this.state.top }}
            className={classnames(style.stadiumCharTooltip, {
              [style.light]: themeType === 'light',
              [style.dark]: themeType === 'dark',
            })}
          >
            <div className={style.chartjsTooltipTitle}>
              {this.state.value}% | {this.state.title} Pacing
            </div>
            <div className={style.chartjsTooltipBody}>
              <p>{this.state.value}% of your library</p>
              <p>represents video with a</p>
              <p>pacing of {this.state.title}.</p>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withTheme(Stadium)
