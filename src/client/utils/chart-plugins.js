export const createBackgroundFunc = ({
  chart: { ctx },
  chartArea,
  config: { options },
}) => {
  if (options.chartArea && options.chartArea.backgroundColor) {
    ctx.save()
    ctx.fillStyle = options.chartArea.backgroundColor
    ctx.fillRect(
      chartArea.left,
      chartArea.top,
      chartArea.right - chartArea.left,
      chartArea.bottom - chartArea.top
    )
    ctx.restore()
  }
}

export const strokeStyleFunc = ({
  chart: { ctx },
  chartArea,
  config: { options },
}) => {
  let configX = options.scales.xAxes
  ctx.save()
  ctx.strokeStyle = configX[0].gridLines.color
  ctx.lineWidth = configX[0].gridLines.lineWidth || 1

  ctx.beginPath()
  ctx.moveTo(chartArea.right, chartArea.top)
  ctx.lineTo(chartArea.right, chartArea.bottom)
  ctx.stroke()
  ctx.restore()
}

export const createMiddleTextFunc = (
  { chart: { ctx } },
  {
    textToUse,
    textColor,
    fillTextColor,
    fillTextFontSize,
    fillTextFontFamily,
    width,
    height,
  }
) => {
  const customFillText = textToUse.replace(/^\s+|\s+$/g, '')
  ctx.restore()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = fillTextColor || textColor
  ctx.font = 'bold ' + fillTextFontSize + ' ' + fillTextFontFamily
  ctx.fillText(customFillText, width / 2, height / 2)
  ctx.save()
}

export const beforeDrawFunc = (options = {}) => {
  const { createBackground, strokeStyle, createMiddleText } = options

  return {
    beforeDraw: function(chart) {
      if (createBackground) {
        createBackgroundFunc(chart)
      }
      if (strokeStyle) {
        strokeStyleFunc(chart)
      }
      if (createMiddleText) {
        createMiddleTextFunc(chart, createMiddleText)
      }
    },
  }
}
