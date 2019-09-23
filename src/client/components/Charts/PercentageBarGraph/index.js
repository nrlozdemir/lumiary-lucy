import React from 'react'
import classnames from 'classnames'
import { withTheme } from 'ThemeContext/withTheme'

import style from './style.scss'
import SvgChart from './SvgChart'

const PercentageBarGraph = (props) => {
  const {
    percentage,
    disableLabels = false,
    id,
    width = 250,
    height = 40,
    themeContext,
  } = props

  const themes = themeContext.colors

  const colors = {
    green: '#39e5d1',
    blue: '#5d9ef2',
    lightGrey: '#c6c9d7',
    grey: '#acb0be',
    purple: '#9576f5',
    darkgrey: '#505050',
    white: '#ffffff',
    '#2FD7C4': '#2FD7C4',
    '#8562F3': '#8562F3',
    '#5292E5': '#5292E5',
    '#ACB0BE': '#ACB0BE',
    '#545b79': '#545b79',
    '#ff556f': '#ff556f',
    '#3edcca': '#3edcca',
    '#229a78': '#229a78',
    '#fff20d': '#fff20d',
    '#9576f5': '#9576f5',
    '#ffacb9': '#ffacb9',
    '#eb7919': '#eb7919',
  }

  return (
    <div className={id}>
      <div className={style.percentageContainer}>
        {!disableLabels && <div className={style.percentage}>{percentage}</div>}
        <div
          className={classnames(style.percentageGraph, {
            [style.noLabel]: disableLabels,
          })}
        >
          <style>
            {`.${id} .${style.percentageGraphWrapper}:before{
							left: ${percentage}%;
							}.${id} .${style.percentageGraphWrapper}:after{
								left: ${percentage}%;
								background-color: ${themes.iconColor};
							}`}
          </style>
          <div
            style={{ height, width }}
            className={classnames(style.percentageGraphWrapper, {
              [style.noLabel]: disableLabels,
            })}
            data-active={percentage}
          >
            <SvgChart {...props} color={colors[props.color] || '#5d9ef2'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withTheme(PercentageBarGraph)
