export function scrollTo(element, duration= 1000) {
  const elementRect = element.getBoundingClientRect()
  const doc       = document.documentElement
  const top       = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
  const start     = top
  const change    = elementRect.top
  const increment = 20
  let currentTime = 0

  const animateScroll = (() => {
    currentTime += increment

    const val = Math.easeInOutQuad(currentTime, top, change, duration)

    window.scrollTo(0, val)

    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  })

    animateScroll()
}

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2
    if (t < 1) {
      return c/2*t*t + b
    }
    t--
    return -c/2 * (t*(t-2) - 1) + b
  };
