import React from 'react'
import style from './style.scss'
import cn from 'classnames'

class PointerCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pointerData: 0,
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ pointerData: ++this.state.pointerData }, () => {
        if (this.state.pointerData === this.props.data.pointerData) {
          clearInterval(this.interval)
        }
      })
    }, 8)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { data, colors } = this.props
    const { pointerData } = this.state

    return (
      <div className={style.radialChart}>
        {style.topTitle && <h1 className={style.topTitle}>{data.topTitle}</h1>}
        <p className="font-secondary-first font-size-14 text-bold">
          {data.basedOn}
        </p>
        <div className={style.pointerContainer}>
          <div className={style.pointerWrapper}>
            <p className={style.pointerHeadText}>Avg: {data.avg}k</p>
            <svg
              width="188px"
              height="101px"
              viewBox="0 0 188 101"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path
                  d="M90,3.55271368e-14 L90,39.0023769 C61.7876064,39.2707078 39,62.2241886 39,90.5 C39,91.0017099 39.0071742,91.5017443 39.0214256,92.0000059 L0.0121125874,92 C0.0040478943,91.5009715 0,91.0009611 0,90.5 C0,40.5182301 40.2943725,2.84217094e-14 90,2.84217094e-14 Z M90.1428571,0.000111576685 C139.78281,0.0776574432 180,40.5661224 180,90.5 C180,91.0009611 179.995952,91.5009715 179.987887,92 L141.835717,92.0000059 C141.849969,91.5017443 141.857143,91.0017099 141.857143,90.5 C141.857143,62.0573354 118.799807,39 90.3571429,39 C90.2856802,39 90.2142515,39.0001456 90.1428571,39.0004052 L90.1428571,0.000103570802 Z"
                  id="path-1"
                />
                <filter
                  x="-6.7%"
                  y="-13.0%"
                  width="113.3%"
                  height="126.1%"
                  filterUnits="objectBoundingBox"
                  id="filter-2"
                >
                  <feOffset
                    dx="0"
                    dy="2"
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                  />
                  <feGaussianBlur
                    stdDeviation="2"
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                  />
                  <feColorMatrix
                    values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
                    type="matrix"
                    in="shadowBlurOuter1"
                    result="shadowMatrixOuter1"
                  />
                  <feMerge>
                    <feMergeNode in="shadowMatrixOuter1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g
                id="Library"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Video-Details-Frame-Rate-Graph-Hover-@2x"
                  transform="translate(-546.000000, -787.000000)"
                >
                  <g id="Group-3" transform="translate(550.000000, 757.000000)">
                    <g
                      id="Half-Circle"
                      transform="translate(0.000000, 32.000000)"
                    >
                      <g id="Combined-Shape">
                        <use
                          fill="red"
                          fillOpacity="1"
                          filter="url(#filter-2)"
                          xlinkHref="#path-1"
                        />
                        <use
                          fill={colors.moduleBorder}
                          fillRule="evenodd"
                          xlinkHref="#path-1"
                        />
                      </g>
                      <polygon
                        id="Path"
                        fill="#2FD7C4"
                        points="86 0 94 0 94 39 86 39"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <div className={style.pointer}>
              <div
                className={cn(
                  pointerData <= 90 && style.left,
                  style.pointerInner
                )}
                style={{
                  transform: `rotate(${pointerData / ((data.avg * 2) / 180) -
                    90 || 0}deg)`,
                }}
              >
                <svg
                  className={style.pointerArrow}
                  width="26px"
                  height="86px"
                  viewBox="0 0 158 676"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <path
                      d="M10.9528705,575.512194 L79,1 L147.047121,575.51212 C148.32366,580.799395 149,586.320714 149,592 C149,630.659932 117.659932,662 79,662 C40.3400675,662 9,630.659932 9,592 C9,586.320716 9.67633976,580.7994 10.9528685,575.512202 Z M65.8654047,554.229443 C45.6928768,561.37291 35.0657736,583.488847 42.242621,603.755639 C49.3860878,623.928167 71.5962891,634.52189 91.768817,627.378423 C111.941345,620.234956 122.535068,598.024755 115.391601,577.852227 C108.248134,557.679699 86.0379327,547.085977 65.8654047,554.229443 Z"
                      id="arrow-path-1"
                    />
                    <filter
                      x="-9.6%"
                      y="-1.6%"
                      width="119.3%"
                      height="104.1%"
                      filterUnits="objectBoundingBox"
                      id="arrow-filter-2"
                    >
                      <feOffset
                        dx="0"
                        dy="3"
                        in="SourceAlpha"
                        result="shadowOffsetOuter1"
                      />
                      <feGaussianBlur
                        stdDeviation="4"
                        in="shadowOffsetOuter1"
                        result="shadowBlurOuter1"
                      />
                      <feColorMatrix
                        values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 1 0"
                        type="matrix"
                        in="shadowBlurOuter1"
                      />
                    </filter>
                  </defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g id="Triangle-2" fillRule="nonzero">
                      <use
                        fill="black"
                        fillOpacity="1"
                        filter="url(#arrow-filter-2)"
                        xlinkHref="#arrow-path-1"
                      />
                      <use fill="#5292e5" xlinkHref="#arrow-path-1" />
                    </g>
                  </g>
                </svg>
                <div className={style.pointerText}>
                  <div
                    className={style.pointerTextInner}
                    style={{
                      transform: `rotate(${-1 *
                        (pointerData / ((data.avg * 2) / 180)) +
                        90 || 0}deg)`,
                    }}
                  >
                    <span
                      className={style.svgLineText}
                      style={{
                        color: colors.textColor,
                        background: colors.moduleBackground,
                      }}
                    >
                      {pointerData}K
                    </span>
                    <svg height="22" width="55">
                      <line
                        x1="18"
                        y1="0.5"
                        x2="55"
                        y2="0.5"
                        className={style.svgLine}
                      />
                      <line
                        x1="0"
                        y1="18"
                        x2="18"
                        y2="0"
                        className={style.svgLine}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="float-left font-secondary-second font-size-12 mt-16">
            Worse
          </span>
          <span className="float-right font-secondary-second font-size-12 mt-16">
            Better
          </span>
        </div>
        <div
          className={cn(
            style.radialChartRadius,
            'font-secondary-second font-size-12 text-center text-light'
          )}
        >
          <p className={style.infoText}>
            This video performs{' '}
            <span className={style.textBold}>{Math.abs(data.percent)}%</span>{' '}
            {data.percent > 0 ? 'better' : 'worse'} than the average video at{' '}
            <span className={style.textBold}>{data.fps}</span>
          </p>
        </div>
      </div>
    )
  }
}

export default PointerCard
