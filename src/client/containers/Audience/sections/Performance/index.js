import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudiencePerformance } from 'Reducers/audience'
import Module from 'Components/Module'
import { BubbleChart, Bubble, Visual, ToolTip } from '@saypr/bubble-chart/react'
import RangeWithBadge from 'Components/Form/RangeWithBadge'
import classnames from 'classnames'
import { socialIconSelector } from 'Utils'
import _ from 'lodash'
import style from 'Containers/Audience/style.scss'


class Performance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slider: [0, 100],
    }
    this.updateSlider = _.debounce(this.updateSlider, 250)
  }

  updateSlider(val) {
    this.props.updateAudiencePerformance({ min: val[0], max: val[1] })
  }

  callBack = (data, moduleKey) => {
    this.props.getAudiencePerformanceData(data)
  }

  render() {
    const {
      slider: [min, max],
    } = this.state

    const {
      audiencePerformanceData: {
        data: { bubblesBoth, bubblesFemales, bubblesMales },
        loading,
        error,
      },
    } = this.props

    const handleStyle = [
      {
        width: '10px',
        height: '10px',
        borderStyle: 'solid',
        borderWidth: '25px 10px 0 10px',
        borderColor: ' #ffffff transparent transparent transparent',
        borderRadius: 0,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        filter: 'drop-shadow(0px 2px 4px 2px #000)',
        WebkitFilter: 'drop-shadow(0px 2px 4px 2px #000)',
        MozFilter: 'drop-shadow(0px 2px 4px 2px #000)',
        OFilter: 'drop-shadow(0px 2px 4px 2px #000)',
      },
      {
        width: '10px',
        height: '10px',
        borderStyle: 'solid',
        borderWidth: '25px 10px 0 10px',
        borderColor: '#ffffff transparent transparent transparent',
        backgroundColor: 'transparent',
        borderRadius: 0,
        boxShadow: 'none',
        filter: 'drop-shadow(0px 2px 4px 2px #000)',
        WebkitFilter: 'drop-shadow(0px 2px 4px 2px #000)',
        MozFilter: 'drop-shadow(0px 2px 4px 2px #000)',
        OFilter: 'drop-shadow(0px 2px 4px 2px #000)',
        marginLeft: '-12px',
      },
    ]
    const trackStyle = [
      {
        height: '16px',
        backgroundColor: '#acb0be',
      },
    ]
    const railStyle = {
      height: '16px',
      borderRadius: '8px',
      backgroundColor: '#21243B',
    }

    const dotStyle = {
      border: '0',
      width: '1px',
      height: '16px',
      backgroundColor: '#acb0be',
      top: 0,
      marginLeft: 0,
      display: 'none',
    }

    return (
      <Module
        moduleKey={'Audience/Performance'}
        title="Performance By Age, Gender and Date"
        action={this.callBack}
        filters={[
          {
            type: 'metric',
            selectKey: 'AP-asd',
            placeHolder: 'Engagement',
          },
          {
            type: 'dateRange',
            selectKey: 'AP-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        {bubblesMales && bubblesFemales && bubblesBoth && (
          <div
            className={classnames(
              style.audienceContainer,
              'grid-container mr-20 ml-20'
            )}
          >
            <div className={'col-12'}>
              <div className={'col-4'}>
                <div className={style.bubbleCont}>
                  <BubbleChart
                    size={[800, 600]}
                    fromPercentages={true}
                    options={{ toolTipWidth: 200, toolTipHeight: 75 }}
                  >
                    {bubblesMales.map((bubble, i) => (
                      <Bubble
                        key={'bubble-' + i}
                        radius={(parseInt(bubble.toolTip) / 100) * 0.0015 + 10}
                        fill="#21243B"
                        stroke="#5292E5"
                      >
                        <Visual>
                          <span
                            className={
                              socialIconSelector(bubble.visual) +
                              ' ' +
                              style.bubbleVisual
                            }
                          />
                        </Visual>
                        <ToolTip>
                          <div className={style.bubbleTooltip}>
                            {bubble.visual}
                          </div>
                          <div className={style.bubbleTooltip}>
                            {bubble.toolTip / 1000}k views
                          </div>
                        </ToolTip>
                      </Bubble>
                    ))}
                  </BubbleChart>
                  <div className={style.label}>
                    <span>Males</span>
                  </div>
                </div>
              </div>
              <div className={'col-4'}>
                <div className={style.bubbleCont}>
                  <BubbleChart
                    size={[800, 600]}
                    fromPercentages={true}
                    options={{ toolTipWidth: 200, toolTipHeight: 75 }}
                  >
                    {bubblesFemales.map((bubble, i) => (
                      <Bubble
                        key={'bubble-' + i}
                        radius={(parseInt(bubble.toolTip) / 100) * 0.0015 + 10}
                        fill="#21243B"
                        stroke="#2FD7C4"
                      >
                        <Visual>
                          <span
                            className={
                              socialIconSelector(bubble.visual) +
                              ' ' +
                              style.bubbleVisual
                            }
                          />
                        </Visual>
                        <ToolTip>
                          <div className={style.bubbleTooltip}>
                            {bubble.visual}
                          </div>
                          <div className={style.bubbleTooltip}>
                            {bubble.toolTip / 1000}k views
                          </div>
                        </ToolTip>
                      </Bubble>
                    ))}
                  </BubbleChart>
                  <div className={style.label}>
                    <span>Females</span>
                  </div>
                </div>
              </div>
              <div className={'col-4'}>
                <div className={style.bubbleCont}>
                  <BubbleChart
                    size={[800, 600]}
                    fromPercentages={true}
                    options={{ toolTipWidth: 200, toolTipHeight: 75 }}
                  >
                    {bubblesBoth.map((bubble, i) => (
                      <Bubble
                        key={'bubble-' + i}
                        radius={(parseInt(bubble.toolTip) / 100) * 0.0015 + 10}
                        fill="#21243B"
                        stroke="#8562F3"
                      >
                        <Visual>
                          <span
                            className={
                              socialIconSelector(bubble.visual) +
                              ' ' +
                              style.bubbleVisual
                            }
                          />
                        </Visual>
                        <ToolTip>
                          <div className={style.bubbleTooltip}>
                            {bubble.visual}
                          </div>
                          <div className={style.bubbleTooltip}>
                            {bubble.toolTip / 1000}k views
                          </div>
                        </ToolTip>
                      </Bubble>
                    ))}
                  </BubbleChart>
                  <div className={style.label}>
                    <span>Both</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12" style={{ paddingBottom: 40 }}>
              <RangeWithBadge
                customClass={'customRangeSlider'}
                minValue={0}
                maxValue={100}
                input={{ onChange: (val) => this.updateSlider(val) }}
                handleStyle={handleStyle}
                trackStyle={trackStyle}
                railStyle={railStyle}
                min={0}
                max={100}
                tipProps={{
                  visible: true,
                  overlayClassName: 'customTooltip',
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
                marks={{
                  0: <div className="custom-dot">0</div>,
                  10: <div className="custom-dot">10</div>,
                  20: <div className="custom-dot">20</div>,
                  30: <div className="custom-dot">30</div>,
                  40: <div className="custom-dot">40</div>,
                  50: <div className="custom-dot">50</div>,
                  60: <div className="custom-dot">60</div>,
                  70: <div className="custom-dot">70</div>,
                  80: <div className="custom-dot">80</div>,
                  90: <div className="custom-dot">90</div>,
                  100: <div className="custom-dot">100</div>,
                }}
                customTicksUnvisible
              />
            </div>
          </div>
        )}
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

export default compose(withConnect)(Performance)
