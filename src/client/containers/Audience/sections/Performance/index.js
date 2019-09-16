import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudiencePerformance } from 'Reducers/audience'
import Module from 'Components/Module'
import { BubbleChart, Bubble, Visual, ToolTip } from '@saypr/bubble-chart/react'
import RangeWithBadge from 'Components/Form/RangeWithBadge'
import classnames from 'classnames'
import _ from 'lodash'
import style from 'Containers/Audience/style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import MultipleNoDataModule from 'Components/MultipleNoDataModule'
import { handleStyle, trackStyle, railStyle, dotStyle } from './style'

const WrapperModule = ({ children, style, className }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

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

const RangeWithBadgeComponent = ({
  themeType,
  handleStyle,
  trackStyle,
  railStyle,
  dotStyle,
  parentCallback,
}) => {
  return (
    <RangeWithBadge
      customClass={classnames('customRangeSlider', {
        dark: themeType === 'dark',
        light: themeType === 'light',
      })}
      minValue={0}
      maxValue={100}
      input={{ onChange: (val) => parentCallback(val) }}
      handleStyle={handleStyle}
      trackStyle={trackStyle}
      railStyle={railStyle}
      min={0}
      max={100}
      tipProps={{
        visible: true,
        overlayClassName: classnames('customTooltip', {
          dark: themeType === 'dark',
          light: themeType === 'light',
        }),
        overlayStyle: {
          background: 'none',
          border: 'none',
          boxShadow: 'none',
        },
        arrowContent: '',
      }}
      dotStyle={dotStyle}
      step={1}
      dots={true}
    />
  )
}

class Performance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slider: [0, 100],
      params: {},
    }
    this.updateSlider = _.debounce(this.updateSlider, 250)
    this.callBack = this.callBack.bind(this)
  }

  updateSlider(val) {
    const { params } = this.state
    const { type, getAudiencePerformanceData } = this.props
    getAudiencePerformanceData({
      min: val[0],
      max: val[1],
      ...params,
      type,
    })
  }

  callBack(data) {
    const { type, getAudiencePerformanceData } = this.props
    this.setState({
      params: data,
    })
    getAudiencePerformanceData({ ...data, type })
  }

  render() {
    const {
      params: { metric },
      slider: [min, max],
    } = this.state

    const {
      type,
      audiencePerformanceData: { data, loading, error },
      themeContext: { colors },
    } = this.props

    const titles = ['Male', 'Female', 'Both']

    const isEmpty =
      !loading &&
      (_.isEmpty(data) ||
        (!!data &&
          Object.values(data).every((valArr) => {
            return Object.keys(valArr).length && valArr.every((v) => !v.value)
          })))

    handleStyle[0].borderColor = `${colors.textColor} transparent transparent transparent`
    handleStyle[1].borderColor = `${colors.textColor} transparent transparent transparent`
    railStyle.backgroundColor = colors.bodyBackground

    const bubbleChartOptions = !!colors && {
      maximumIterationCount: 1000,
      toolTipBackground: colors.audienceBubbleTooltipBackground,
      toolTipArrowBackground: colors.audienceBubbleTooltipBackground,
      toolTipArrowShadow: colors.audienceBubbleTooltipBackground,
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
    }

    return (
      <Module
        actionOnProp={type}
        isEmpty={isEmpty}
        customEmptyClasses={style.performanceEmpty}
        loading={loading}
        moduleKey={'Audience/Performance'}
        title="Performance By Age, Gender and Date"
        action={this.callBack}
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
                      <div
                        style={{
                          width: '390px',
                          height: '400px',
                        }}
                      >
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
                                        className={style.bubbleVisual}
                                        style={{
                                          fontSize: 13,
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
                                            {`s`}
                                            {` `}
                                            {bubble.min}-{bubble.max}
                                            {` `}
                                            <br />
                                            prefer videos that{` `}
                                            <br />
                                            {`are ${bubble.visual} paced`}
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
                parentCallback={function(val) {
                  return callBack(val)
                }}
              />
            )}
          </div>
        </div>
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audiencePerformanceData: makeSelectAudiencePerformance(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  withTheme
)(Performance)
