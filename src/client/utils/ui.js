export function scrollTo(element, duration = 1000) {
  const elementRect = element.getBoundingClientRect()
  const doc = document.documentElement
  const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
  const start = top
  const change = elementRect.top
  const increment = 20
  let currentTime = 0

  const animateScroll = () => {
    currentTime += increment

    const val = Math.easeInOutQuad(currentTime, top, change, duration)

    window.scrollTo(0, val)

    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  }

  animateScroll()
}

Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

export const roundRect = (ctx, x, y, width, height, r) => {
  const radius = r
  ctx.beginPath()
  // ctx.shadowColor = 'rgba(0, 0, 0, 0.15)'
  // ctx.shadowBlur = 3
  // ctx.shadowOffsetX = 1
  // ctx.shadowOffsetY = 2
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
  ctx.fill()
  // ctx.shadowBlur = 0
  // ctx.shadowOffsetX = 0
  // ctx.shadowOffsetY = 0
}
