import React from 'react'
import Scrubber from 'Components/Sliders/Scrubber'
import { withTheme } from 'ThemeContext/withTheme'
import { mediaUrl } from 'Utils/globals'

const secondToTime = (timeInSeconds) => {
  let pad = (num, size) => {
      return ('000' + num).slice(size * -1)
    },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60)
    /*milliseconds = time.slice(-3)*/

  return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) // + ',' + pad(milliseconds, 3)
}

/*
const timeToSeconds = (timeString) => {
  let splittedTimeString = timeString.split(':')
  let seconds = 0
  let minutes = 1

  while (splittedTimeString.length > 0) {
    seconds += minutes * parseInt(splittedTimeString.pop(), 10)
    minutes *= 60
  }

  return seconds
}
*/

class SliderWithScrubber extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const {
      name,
      markers, 
      shots, 
      shotMargin, 
      minShotWidth, 
      maxShotWidth, 
      ticks, 
      viewportWidth, 
      viewportHeight, 
      viewportBackgroundColor,
      shotHeight, 
      shotHoverWidth, 
      shotHoverHeight,
      customClass,
      customStyle,
      scrubberIsDot,
      scrubberWidth,
      scrubberHeight,
      scrubberDotClassname,
      isEmpty
    } = this.props

    /*
    const {
      colors,
    } = this.props.themeContext
    */
  
    let tempMarks = []
    let marks = {}
    let shotsTotalWidth = 0
    let viewportDurations = {}
    let viewportLeftOver = {}
    let viewportTempShots = {}
    let viewportTempShotsTotalWidth = {}
    let viewportShots = []
    const viewportSize = viewportWidth - ((ticks + 1) * shotMargin)

    /*
    const durations = shots.map(
      d => (d.endTime - d.startTime).toFixed(4)
    )
    */
    const totalDuration = (shots && shots.length > 0) 
      ? (shots[shots.length - 1].endTime).toFixed(4)
      : 0
    const dividedDuration = totalDuration && 
      (Math.round(totalDuration / (ticks))).toFixed(4)

    //create marks
    if(markers) {
      for (let i = 0; i < ticks - 1; i++) {
        tempMarks.push(secondToTime(i * dividedDuration))
      }

      const lastMarker = totalDuration > 0 
        ? shots[shots.length - 1].endTime
        : 0 

      tempMarks.push(secondToTime(lastMarker))

      //rebuild custom-marks for styling
      tempMarks.map((mark, index) => {
        index = parseInt(index * 10)
        if (index === 0) {
          marks[index] = {
            style: {
              transform: 'translateX(0%)'
            },
            label: <p className="customDot">{mark}</p>,
            value: mark,
          }
        } else if (index === 100) {
          marks[index] = {
            style: {
              transform: 'translateX(-100%)'
            },
            label: <p className="customDot">{mark}</p>,
            value: mark,
          }
        } else {
          marks[index] = {
            style: {},
            label: <p className="customDot">{mark}</p>,
            value: mark,
          }
        }
      })
    }

    if (isEmpty !== true && shots && shots.length > 0) {
      //create viewports including max 11 items from shots, fit size to min and max
      const totalViewports = (shots.length / ticks).toFixed(2)
      for (let v = 0; v < totalViewports; v++) {
        viewportTempShots[v] = []
        viewportTempShotsTotalWidth[v] = 0
        viewportDurations[v] = 0
        viewportLeftOver[v] = 0
      }
      
      shots.map((el, i) => {
        const index = parseInt(Math.floor(i / ticks))
        el.duration = parseFloat(
          (el.endTime - el.startTime).toFixed(4)
        )
        viewportTempShots[index].push(el)
        viewportDurations[index] += el.duration
      })
      
      for (let v = 0; v < totalViewports; v++) {
        Object.values(viewportTempShots[v]).map((el, i) => {
          el.realWidth = parseFloat(
            ((viewportSize / 100) * (el.duration * 100 / viewportDurations[v])).toFixed(4)
          )
          el.width = parseFloat(
            ((viewportSize / 100) * (el.duration * 100 / viewportDurations[v])).toFixed(4)
          )
          el.max = 0
          el.diff = maxShotWidth - el.width
          if (el.width < minShotWidth) {
            viewportLeftOver[v] -= minShotWidth - el.width
            el.width = minShotWidth
            el.diff = maxShotWidth - minShotWidth
          }
          if (el.width > maxShotWidth) {
            viewportLeftOver[v] += el.width - maxShotWidth
            el.width = maxShotWidth
            el.diff = 0
            el.max = 1
          }
        })
      
        viewportTempShots[v].length === ticks &&
          Object.values(viewportTempShots[v]).map((el, i) => {
            const findDiff = parseFloat(
              ((viewportLeftOver[v] / 100) * (el.duration * 100 / viewportDurations[v])).toFixed(4)
            )
            if (viewportLeftOver[v] > 0) {
              if (el.width + findDiff > maxShotWidth) {
                el.width = maxShotWidth;
                viewportLeftOver[v] -= maxShotWidth - el.width
              } else {
                el.width += findDiff
                viewportLeftOver[v] -= findDiff
              }
            } else if (viewportLeftOver[v] < 0) {
              if (el.width - findDiff < minShotWidth) {
                el.width = minShotWidth;
                viewportLeftOver[v] += el.width - minShotWidth
              } else {
                el.width -= findDiff
                viewportLeftOver[v] += findDiff
              }
            }
          })
      
        if (viewportTempShots[v].length === ticks) {
          do {
            Object.values(viewportTempShots[v]).map((el, i) => {
              if (viewportLeftOver[v] > 0) {
                if (el.max !== 1 && el.diff > 0 && el.width !== maxShotWidth) {
                  el.width += 1
                  viewportLeftOver[v] -= 1
                }
              }
            })
          } while (viewportLeftOver[v] > 0)
        }
      
        viewportTempShotsTotalWidth[v] = Object.values(viewportTempShots[v]).reduce(
          (prev, next) => prev + parseFloat(next.width.toFixed(4)), 0
        )
      
        if (viewportTempShotsTotalWidth[v] > viewportSize) {
          const findTrimValue = parseFloat((viewportTempShotsTotalWidth[v] - viewportSize).toFixed(4))
      
          viewportTempShots[v].length === ticks && Object.values(viewportTempShots[v]).map((el, i) => {
            if (el.width > Math.floor(el.width) &&
              el.width - Math.floor(el.width) >= findTrimValue &&
              viewportTempShotsTotalWidth[v] !== viewportSize
            ) {
              el.width -= findTrimValue
              viewportTempShotsTotalWidth[v] -= findTrimValue
            }
          })
        } else if (viewportTempShotsTotalWidth[v] < viewportSize) {
          const findTrimValue = parseFloat((viewportSize - viewportTempShotsTotalWidth[v]).toFixed(4))
      
          viewportTempShots[v].length === ticks && Object.values(viewportTempShots[v]).map((el, i) => {
            if (viewportTempShotsTotalWidth[v] !== viewportSize) {
              el.width += findTrimValue
              viewportTempShotsTotalWidth[v] += findTrimValue
            }
          })
        }
      
        Object.values(viewportTempShots[v]).map((el, i) => {
          viewportShots.push(el)
        })
      }
      
      viewportShots && viewportShots.map((el, i) => {
        shotsTotalWidth += el.width + shotMargin
      })
    }

    return (
      <Scrubber
      horizontal
      arrows
      viewBordered
      verticalDisabled
      height={viewportHeight}
      viewportBackgroundColor={viewportBackgroundColor}
      width={viewportWidth + 1}
      marks={!!marks && marks}
      totalWidth={
        (isEmpty === true) 
          ? viewportWidth + 2 
          : shotsTotalWidth
      }
      scrubberIsDot={scrubberIsDot}
      scrubberWidth={scrubberWidth}
      scrubberHeight={scrubberHeight}
      scrubberDotClassname={scrubberDotClassname}
      isEmpty={isEmpty}
    >
      <div 
        className={customClass.sliderWrapper}
        style={{
          left: 0,
          width: (isEmpty === true) 
            ? viewportWidth + 2 
            : (shotsTotalWidth < viewportWidth) 
              ? (viewportWidth + 2) 
              : shotsTotalWidth,
        }}
      >
      
      {isEmpty !== true 
        && viewportShots 
        && viewportShots.map((shot, i) => {
          const frameShotUrl = (shot.frameUrls && shot.frameUrls[0]) 
            ? `${mediaUrl}/${shot.frameUrls[0]}`
            : ''
          
          return (<React.Fragment key={`${name}_shots_${i}`}>
            <div 
              className={customClass.image}
              onClick={() => { 
                !!this.props.clickEvent && 
                this.props.clickEvent(i) 
              }}
            >
              <div
                style={{
                  width: `${shot.width.toFixed(2)}px`,
                  borderColor: customStyle.imageWrapperBorderColor,
                }}
                className={customClass.imageWrapper}
              >
                <div
                  className={customClass.originalImage}
                  style={{
                    width: `${shot.width.toFixed(2)}px`,
                    height: `${shotHeight}px`,
                    backgroundColor: '#ccc',
                    backgroundImage: `url(${frameShotUrl})`,
                    backgroundSize: `${shotHoverWidth}px ${shotHoverHeight}px`,
                    borderColor: customStyle.originalImageBorderColor,
                  }}
                />
              </div>
              {!scrubberIsDot && (<img
                src={frameShotUrl}
                style={{ 
                  height: `${shotHeight}px`,
                }}
                className={customClass.imageHover}
              />)}
            </div>
          </React.Fragment>)
        }
        )}
      </div>
    </Scrubber>  
    )
  }
}

export default withTheme(SliderWithScrubber)