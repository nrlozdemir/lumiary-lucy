import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import ReactTooltip from 'react-tooltip'
import { CircleChartTemplate } from 'Utils/tooltip'

export default (props) => {
  console.log('props.template: ', props.template)
  const tooltipComponents = {
    CicleChart: CircleChartTemplate,
  }

  const TooltipTemplate = tooltipComponents[props.template]

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        let className = ''
        if (!props.template) {
          if (!!props.largeTooltip) {
            className = 'largeTooltip'
          } else if (!!props.mediumTooltip) {
            className = 'mediumTooltip'
          } else if (!!props.smallTooltip) {
            className = 'smallTooltip'
          } else if (!!props.xSmallTooltip) {
            className = 'xSmallTooltip'
          }
        }

        return (
          <ReactTooltip
            {...props}
            type={colors.themeType}
            className={classnames(className, {
              removePadding: !!props.template,
              [`${props.template}`]: !!props.template,
            })}
          >
            {!!props.template && (
              <CircleChartTemplate {...props.tooltipProps} />
            )}
          </ReactTooltip>
        )
      }}
    </ThemeContext.Consumer>
  )
}
