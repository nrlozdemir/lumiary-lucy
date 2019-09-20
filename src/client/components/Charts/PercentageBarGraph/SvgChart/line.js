import React from 'react'

const SvgChartLine = ({ d, o, svg, lib, id }) => {
  const pointsPositions = () => {
    return d.values.map((e) => {
      const x = lib.map(e[0], o.xMin, o.xMax, 0, svg.w)
      const y = lib.map(e[1], o.yMin, o.yMax, svg.h, 0)
      return [x, y]
    })
  }

  const createLine = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX),
    }
  }

  const controlPoint = (current, previous, next, reverse) => {
    const p = previous || current
    const n = next || current
    const line = createLine(p, n)
    // work in progress…
    const flat = lib.map(Math.cos(line.angle) * o.line.flattening, 0, 1, 1, 0)
    const angle = line.angle * flat + (reverse ? Math.PI : 0)
    const length = line.length * o.line.smoothing
    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return [x, y]
  }

  const bezierCommand = (point, i, a) => {
    const cps = controlPoint(a[i - 1], a[i - 2], point)
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true)
    const close = i === a.length - 1 ? ' z' : ''
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${
      point[1]
    }${close}`
  }

  const pathD = () => {
    return pointsPositions().reduce(
      (acc, e, i, a) =>
        i === 0
          ? `M ${a[a.length - 1][0]},${svg.h} L ${e[0]},${svg.h} L ${e[0]},${
              e[1]
            }`
          : `${acc} ${bezierCommand(e, i, a)}`,
      ''
    )
  }

  return (
    <React.Fragment>
      <defs>
        <linearGradient id={`${id}-grandient`}>
          <stop offset="0%" stop-color="#505050" />
          <stop offset={`${o.percentage}%`} stop-color="white" />
          <stop offset="100%" stop-color="#505050" />
        </linearGradient>
      </defs>

      <mask id={`${id}-mask`}>
        <path
          fill={`url(#${id}-grandient)`}
          stroke={`url(#${id}-grandient)`}
          d={pathD()}
        ></path>
      </mask>
    </React.Fragment>
  )
}

export default SvgChartLine
