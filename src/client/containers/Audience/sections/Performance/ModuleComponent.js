import React from 'react'
import classnames from 'classnames'
import MultipleNoDataModule from 'Components/MultipleNoDataModule'
import Module from 'Components/Module'
import _ from 'lodash'
import { BubbleChart, Bubble, Visual, ToolTip } from '@saypr/bubble-chart/react'
import { RangeWithBadgeComponent } from './RangeWithBadgeComponent'
import { handleStyle, trackStyle, railStyle, dotStyle } from './style'
import style from 'Containers/Audience/style.scss'
import moduleStyle from './style.scss'

const WrapperModule = ({ children, style, className }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

const titles = ['Male', 'Female', 'Both']

const moduleFilters = [
  {
    type: 'platformEngagement',
    selectKey: 'AP-plateng',
    placeHolder: 'Engagement by Platform',
    customOptions: [
      {
        label: 'Facebook',
        options: [{ value: 'facebook|views', label: 'Views' }],
      },
    ],
    defaultValue: { value: 'facebook|views', label: 'Views' },
  },
  {
    type: 'property',
    selectKey: 'AP-asd',
    placeHolder: 'Resolution',
  },
  {
    type: 'dateRange',
    selectKey: 'AP-wds',
    placeHolder: 'Date',
  },
]

const ModuleComponent = ({
  props,
  state,
  moduleCallback,
  parentUpdateSlider,
}) => {
  const {
    params: { metric },
    slider: [min, max],
  } = state

  const {
    type,
    audiencePerformanceData: { data, loading, error },
    themeContext: { colors },
  } = props

  const isEmpty =
    !loading &&
    (_.isEmpty(data) ||
      (!!data &&
        Object.values(data).every((valArr) => {
          return Object.keys(valArr).length && valArr.every((v) => !v.value)
        })))

  const bubbleChartOptions = !!colors && {
    maximumIterationCount: 1000,
    strokeWidth: 5,
    gap: 2,
    visualFontSize: 14,
    toolTipFontSize: 10,
    visualWidth: 55,
    visualHeight: 20,
    toolTipWidth: 206,
    toolTipHeight: 130,
    firstCircleTimesX: -0.3,
    firstCircleTimesY: -1,
    toolTipPositionTop: true,
    toolTipDelay: 10,
    toolTipRadius: 8,
    toolTipArrowWidth: 16,
    toolTipArrowHeight: 8,
    zIndex: 30,
    toolTipBackground: colors.audienceBubbleTooltipBackground,
    toolTipArrowBackground: colors.audienceBubbleTooltipBackground,
    toolTipArrowShadow: colors.audienceBubbleTooltipBackground,
  }

  handleStyle[0].borderColor = `${colors.textColor} transparent transparent transparent`
  handleStyle[1].borderColor = `${colors.textColor} transparent transparent transparent`
  railStyle.backgroundColor = colors.bodyBackground

  return (
    <Module
      actionOnProp={type}
      isEmpty={isEmpty}
      customEmptyClasses={style.performanceEmpty}
      loading={loading}
      moduleKey={'Audience/Performance'}
      title="Performance By Age, Gender and Date"
      action={moduleCallback}
      filters={moduleFilters}
    >
      <div
        className={classnames(
          style.audienceContainer,
          'grid-container mr-20 ml-20'
        )}
      >
        <div className="col-12-no-gutters">
          <MultipleNoDataModule>
            {!!data &&
              Object.values(data).map((el, k) => {
                return (
                  <WrapperModule
                    key={`wrapper-module-${k}`}
                    datasetsIsEmpty={!!el && !Object.keys(el).length}
                  >
                    <div className={moduleStyle.moduleContainer}>
                      <BubbleChart
                        size={[390, 400]}
                        options={bubbleChartOptions}
                        firstAngle={30}
                      >
                        {!!el &&
                          Object.keys(el).length &&
                          el.map((bubble, i) => {
                            return (
                              <div key={k}>
                                <Bubble
                                  key={'bubble-' + k}
                                  radius={bubble.value}
                                  fill={colors.bodyBackground}
                                  stroke="#5292E5"
                                >
                                  <Visual
                                    style={{
                                      background:
                                        colors.audienceBubbleBackground,
                                    }}
                                  >
                                    <span
                                      className={classnames(
                                        style.bubbleVisual,
                                        moduleStyle.bubbleVisual
                                      )}
                                      style={{
                                        color: colors.audienceBubbleText,
                                      }}
                                    >
                                      {bubble.visual}
                                    </span>
                                  </Visual>
                                  <ToolTip style={{ zIndex: 10000 }}>
                                    <div className={style.bubbleTooltip}>
                                      <span
                                        className={style.header}
                                        style={{
                                          color:
                                            colors.audienceBubbleTooltipText,
                                          borderBottom: `1px solid ${colors.audienceBubbleTooltipSeparator}`,
                                        }}
                                      >
                                        {`${bubble.percentage}% | ${bubble.visual} ${bubble.property}`}
                                      </span>
                                      <div
                                        className={style.body}
                                        style={{
                                          color:
                                            colors.audienceBubbleTooltipText,
                                        }}
                                      >
                                        <span>
                                          {bubble.percentage}% of{' '}
                                          {!!titles &&
                                            !!titles[k] &&
                                            titles[k].toLowerCase()}
                                          {k < 2 && `s`}
                                          {` ${bubble.min}-${bubble.max} `}
                                          <br />
                                          prefer videos that{` `}
                                          <br />
                                          {`are ${bubble.visual.toLowerCase()} paced`}
                                        </span>
                                      </div>
                                    </div>
                                  </ToolTip>
                                </Bubble>
                              </div>
                            )
                          })}
                      </BubbleChart>
                    </div>
                    <div className={style.chartSectionBadge}>
                      <span
                        style={{
                          background: colors.labelBackground,
                          color: colors.labelColor,
                          boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                        }}
                      >
                        {!!titles && !!titles[k] && titles[k]}
                        {!!k && k < 2 && 's'}
                      </span>
                    </div>
                  </WrapperModule>
                )
              })}
          </MultipleNoDataModule>
        </div>

        <div className="col-12-gutter-20" style={{ color: colors.textColor }}>
          {!!handleStyle && !!trackStyle && !!railStyle && !!dotStyle && (
            <RangeWithBadgeComponent
              themeType={colors.themeType}
              handleStyle={handleStyle}
              trackStyle={trackStyle}
              railStyle={railStyle}
              dotStyle={dotStyle}
              parentCallback={(val) => {
                parentUpdateSlider(val)
              }}
              isEmpty={isEmpty}
              loading={loading}
            />
          )}
        </div>
      </div>
    </Module>
  )
}

export { ModuleComponent }
