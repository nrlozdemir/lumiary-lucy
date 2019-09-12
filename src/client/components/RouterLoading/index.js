import React from 'react'
import style from './style.scss'

const renderItem = (rotate = '', begin) => {
  return (
    <g transform={rotate}>
      <rect
        x="47"
        y="24"
        rx="9.4"
        ry="4.8"
        width="6"
        height="12"
        fill="#50aabd"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          repeatCount="indefinite"
          begin={begin}
        ></animate>
      </rect>
    </g>
  )
}

const RouterLoading = ({ customStyle }) => {
  return (
    <div className={style.routerLoader} style={{ ...customStyle }}>
      <svg
        width="200px"
        height="200px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        {renderItem("rotate(0 50 50)", "-0.9166666666666666s")}
        {renderItem("rotate(30 50 50)", "-0.8333333333333334s")}
        {renderItem("rotate(60 50 50)", "-0.75s")}
        {renderItem("rotate(90 50 50)", "-0.6666666666666666s")}
        {renderItem("rotate(120 50 50)", "-0.5833333333333334s")}
        {renderItem("rotate(150 50 50)", "-0.5s")}
        {renderItem("rotate(180 50 50)", "-0.4166666666666667s")}
        {renderItem("rotate(210 50 50)", "-0.3333333333333333s")}
        {renderItem("rotate(240 50 50)", "-0.25s")}
        {renderItem("rotate(270 50 50)", "-0.16666666666666666s")}
        {renderItem("rotate(300 50 50)", "-0.08333333333333333s")}
        {renderItem("rotate(330 50 50)", "0s")}
      </svg>
    </div>
  )
}

export default RouterLoading
