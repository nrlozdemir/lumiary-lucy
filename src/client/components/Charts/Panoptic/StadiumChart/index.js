import React from 'react'
import { shadeHexColor, injectStyle } from 'Utils/index'
import style from './style.scss'

class StadiumChart extends React.Component {
  constructor(props) {
    super(props)
    this.stadium = React.createRef()
    this.tooltip = React.createRef()
    this.text = React.createRef()
    this.currentBar = null
    this.state = {
      text: {
        width: 0,
        height: 0,
      },
    }
  }

  componentDidMount() {
    this.stadium.current.addEventListener('mouseover', (event) => {
      let value = event.target.dataset.value
      let title = event.target.dataset.title
      let color =
        event.target.attributes['stroke'] &&
        event.target.attributes['stroke'].value
      this.currentBar = event.target
      if (value && title && this.currentBar && color) {
        this.currentBar.addEventListener('mousemove', (a) => {
          a.stopPropagation()
          this.tooltip.current.style.top =
            a.pageY - this.tooltip.current.clientHeight - 20 + 'px'
          this.tooltip.current.style.left =
            a.pageX - this.tooltip.current.clientWidth / 2 + 'px'

          this.currentBar.attributes['stroke'].value = shadeHexColor(
            color,
            0.12
          )
        })

        this.currentBar.addEventListener('mouseout', () => {
          this.tooltip.current.innerHTML = ''
          this.tooltip.current.style.display = 'none'
          this.currentBar.attributes['stroke'].value = color
          color = null
        })

        this.tooltip.current.innerText = value + '% ' + title
        this.tooltip.current.style.display = 'block'
      }
    })

    const { width, height } = this.text.current.getBoundingClientRect()
    this.setState({
      text: {
        width: width,
        height: height,
      },
    })
  }

  componentWillUnmount() {
    // this.stadium.current.removeEventListener('mouseover', null)
    // this.currentBar.current.removeEventListener('mousemove', null)
    // this.currentBar.current.removeEventListener('mouseout', null)
  }

  render() {
    if (!this.props.data) return

    let stadiumText = 'Total Percentage'
    let angleColor = '#242B49'
    let barStroke = '#5A6386'
    let barFill = '#242b49'

    let animationSpeed = 1
    let borderWidth = 26
    let border = 1
    let angelBorder = 2
    let infoSpaceW = 210
    let infoSpaceH = 80
    let l = this.props.data.length

    let total = 0
    let value = 0
    console.log(value, total)

    let infoSpaceWBorder = infoSpaceW + 2 * border
    let infoSpaceHBorder = infoSpaceH + 2 * border
    let otherSpace = angelBorder >= border ? angelBorder : border

    let svgW =
      infoSpaceWBorder + l * (2 * (borderWidth + otherSpace)) + 2 * borderWidth
    let svgH =
      infoSpaceHBorder + l * (2 * (borderWidth + otherSpace)) + 2 * borderWidth

    return (
      <React.Fragment>
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
              total = 2 * (w + h - (h / 2) * (4 - Math.PI))
              value = (total * item.value) / 100

              let angelWidth = w + borderWidth + angelBorder - 2 * border
              let angelHeight = h + borderWidth + angelBorder - 2 * border

              let angelTotal =
                2 *
                (angelWidth + angelHeight - (angelHeight / 2) * (4 - Math.PI))
              let angelValue = (angelTotal * item.value) / 100

              let legendPos =
                x + index * borderWidth + (borderWidth + border) / 2

              const keyframesStyle = `
                    @-webkit-keyframes stadium-${index}-animation {
                      0%   { stroke-dasharray: 0 ${total}; }
                      100% { stroke-dasharray: ${value} ${total}; }
                    }
                  `
              const keyframesStyleAngel = `
                    @-webkit-keyframes stadium-angel-${index}-animation {
                      0%   { stroke-dasharray: 0 ${angelTotal}; }
                      100% { stroke-dasharray: ${angelValue} ${angelTotal}; }
                    }
                  `
              injectStyle(keyframesStyle)
              injectStyle(keyframesStyleAngel)

              return (
                <React.Fragment key={`rect-${index}`}>
                  {/**/}
                  <rect
                    id="BORDER"
                    stroke={barStroke}
                    strokeWidth={border}
                    fill={barFill}
                    x={x + index * borderWidth - (borderWidth + border) / 2}
                    y={y + index * borderWidth - (borderWidth + border) / 2}
                    width={w + borderWidth + border}
                    height={h + borderWidth + border}
                    rx={(h + borderWidth + border) / 2}
                  />

                  <rect
                    id="BAR"
                    strokeDasharray={`${value} ${total}`}
                    data-value={item.value}
                    data-title={item.title}
                    style={{
                      WebkitAnimation: `stadium-${index}-animation ${animationSpeed}s linear`,
                    }}
                    stroke={item.color}
                    strokeWidth={borderWidth}
                    x={x + index * borderWidth}
                    y={y + index * borderWidth}
                    width={w}
                    height={h}
                    rx={h / 2}
                  />

                  <rect
                    id="ANGEL"
                    strokeDasharray={`${angelValue} ${angelTotal}`}
                    style={{
                      WebkitAnimation: `stadium-${index}-animation ${animationSpeed}s linear`,
                    }}
                    stroke={angleColor}
                    strokeWidth={angelBorder}
                    x={
                      x +
                      index * borderWidth -
                      (borderWidth + border) / 2 -
                      angelBorder / 2
                    }
                    y={
                      y +
                      index * borderWidth -
                      (borderWidth + border) / 2 -
                      angelBorder / 2
                    }
                    width={w + borderWidth + border + angelBorder / 2}
                    height={h + borderWidth + border + angelBorder / 2}
                    rx={(h + borderWidth + border) / 2}
                  />

                  {l - 1 === index && stadiumText ? (
                    <React.Fragment>
                      <rect
                        id="Rectangle"
                        stroke={barStroke}
                        fill={barFill}
                        strokeWidth={border}
                        x={legendPos}
                        y={legendPos}
                        width={infoSpaceWBorder + border}
                        height={infoSpaceHBorder + border}
                        rx={infoSpaceHBorder / 2}
                      />

                      <text
                        id="Total-Percentage"
                        fontFamily="Helvetica"
                        fontSize="12"
                        fontWeight="normal"
                        fill="#FEFEFE"
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
        <div className={style.stadiumCharTooltip} ref={this.tooltip} />
      </React.Fragment>
    )
  }
}

export default StadiumChart
