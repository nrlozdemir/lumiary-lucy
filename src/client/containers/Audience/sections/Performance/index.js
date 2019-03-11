import React from 'react'
import { BubbleChart, Bubble, Visual, ToolTip } from '@saypr/bubble-chart/react'

import Range from 'Components/Form/Range'
import SelectFilters from "Components/SelectFilters";
import style from 'Containers/Audience/style.scss'
import { socialIconSelector } from 'Utils'

export class Performance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			slider: [0, 100],
			selectViews: '',
			selectDate: '',
      bubblesMales: [
        {
          value: 30,
          visual: 'youtube',
        },
        {
          value: 25,
          visual: 'facebook',
        },
        {
          value: 20,
          visual: 'twitter',
        },
        {
          value: 15,
          visual: 'pinterest',
        },
        {
          value: 10,
          visual: 'instagram',
        },
      ],
      bubblesFemales: [
        {
          value: 20,
          visual: 'youtube',
        },
        {
          value: 35,
          visual: 'facebook',
        },
        {
          value: 20,
          visual: 'twitter',
        },
        {
          value: 15,
          visual: 'pinterest',
        },
        {
          value: 10,
          visual: 'instagram',
        },
      ],
      bubblesBoth: [
        {
          value: 20,
          visual: 'youtube',
        },
        {
          value: 25,
          visual: 'facebook',
        },
        {
          value: 20,
          visual: 'twitter',
        },
        {
          value: 15,
          visual: 'pinterest',
        },
        {
          value: 20,
          visual: 'instagram',
        },
      ],
    }
  }

  updateSlider() {
    const randomOne = [
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'youtube',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'facebook',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'twitter',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'pinterest',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'instagram',
      },
    ]
    const randomTwo = [
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'youtube',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'facebook',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'twitter',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'pinterest',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'instagram',
      },
    ]
    const randomTree = [
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'youtube',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'facebook',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'twitter',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'pinterest',
      },
      {
				value: Math.max(Math.floor(Math.random() * 30), 15),
				toolTip: Math.round(Math.random() * 1000) + '.' + Math.ceil(Math.random() * 9) + 'k views',
        visual: 'instagram',
      },
    ]
    this.setState({
      bubblesMales: randomOne,
      bubblesFemales: randomTwo,
      bubblesBoth: randomTree,
    })
  }

  render() {
    const {
      slider: [min, max],
      bubblesBoth,
      bubblesFemales,
			bubblesMales,
			selectViews,
			selectDate
    } = this.state
    console.log(this.state)
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
      backgroundColor: '#242b49',
    }

    const dotStyle = {
      border: '0',
      width: '1px',
      height: '16px',
      backgroundColor: '#acb0be',
      top: 0,
      marginLeft: 0,
    }

    return (
      <div className="grid-container mr-20 ml-20 mt-72 bg-dark-grey-blue shadow-1">
        <div className={style.cardTitle + ' col-12'}>
          <span>Performance By Age, Gender and Date</span>
          <div className={style.selects}>
						<SelectFilters selectViewsShow={true} selectViews={selectViews} />
            <SelectFilters selectDateShow={true} selectDate={selectDate} />
          </div>
        </div>
        <div className={'col-12'}>
          <div className={'col-4'}>
            <div className={style.bubbleCont}>
              <BubbleChart size={[800, 600]} fromPercentages={true} options={{toolTipWidth: 200, toolTipHeight: 75}}>
                {bubblesMales.map((bubble, i) => (
                  <Bubble
                    key={'bubble-' + i}
                    radius={bubble.value}
                    fill="#303a5d"
                    stroke="#d0506c"
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
											<div className={style.bubbleTooltip}>{bubble.visual}</div>
											<div className={style.bubbleTooltip}>{bubble.toolTip}</div>
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
              <BubbleChart size={[800, 600]} fromPercentages={true} options={{toolTipWidth: 200, toolTipHeight: 75}}>
                {bubblesFemales.map((bubble, i) => (
                  <Bubble
                    key={'bubble-' + i}
                    radius={bubble.value}
                    fill="#303a5d"
                    stroke="#51adc0"
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
											<div className={style.bubbleTooltip}>{bubble.visual}</div>
											<div className={style.bubbleTooltip}>{bubble.toolTip}</div>
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
              <BubbleChart size={[800, 600]} fromPercentages={true} options={{toolTipWidth: 200, toolTipHeight: 75}}>
                {bubblesBoth.map((bubble, i) => (
                  <Bubble
                    key={'bubble-' + i}
                    radius={bubble.value}
                    fill="#303a5d"
                    stroke="#8567f0"
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
											<div className={style.bubbleTooltip}>{bubble.visual}</div>
											<div className={style.bubbleTooltip}>{bubble.toolTip}</div>
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
          <Range
            customClass={'customRangeSlider'}
            minValue={0}
            maxValue={100}
            input={{ onChange: () => this.updateSlider() }}
            handleStyle={handleStyle}
            trackStyle={trackStyle}
            railStyle={railStyle}
            min={0}
            max={100}
            dotStyle={dotStyle}
            step={10}
            dots={true}
            marks={{
              0: 0,
              10: 10,
              20: 20,
              30: 30,
              40: 40,
              50: 50,
              60: 60,
              70: 70,
              80: 80,
              90: 90,
              100: 100,
            }}
            customTicksUnvisible
          />
        </div>
      </div>
    )
  }
}
