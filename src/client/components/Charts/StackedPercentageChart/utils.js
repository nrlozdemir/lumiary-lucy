export const drawLine = (
  ctx,
  lines,
  findYMaxIndex,
  barWidth,
  barSpaceWidth,
  height,
  gradient,
  status
) => {
  const indices = Object.values(lines)

  if (status === 'prev') {
    indices.filter((r, i) => i <= findYMaxIndex).reverse()
  } else {
    indices.filter((r, i) => i > findYMaxIndex)
  }

  let indicesList = {}
  Object.values(indices).map((el, i) => {
    indicesList[i] = {
      currentX: el.currentVLine.x,
      previousX: el.previousVLine.x,
      currentY: el.currentVLine.y,
      previousY: el.previousVLine.y,
    }
    return true
  })

  const indexesPush = (c, el, y) => ({
    x: c.toFixed(0),
    y,
    currentX: el.currentX,
    currentY: el.currentY,
    previousX: el.previousX,
    previousY: el.previousY,
  })

  let indexes = []

  Object.values(indicesList).map((el) => {
    let aspectRatio =
      (el.previousY - el.currentY) / (el.currentX - el.previousX)

    ;[...Array(Math.round(el.currentX - el.previousX))].map((v, i, arr) => {
      const c = status === 'prev' ? el.currentX - i : el.previousX + i

      indexes.push(
        indexesPush(
          c,
          el,
          status === 'prev'
            ? el.currentY + i * aspectRatio
            : el.previousY - i * aspectRatio
        )
      )
    })
    return true
  })

  indexes.map((el) => {
    if (
      el.x % (barWidth + barSpaceWidth) > barSpaceWidth &&
      el.x % (barWidth + barSpaceWidth) <= barWidth + barSpaceWidth
    ) {
      ctx.moveTo(el.x, height + el.y)
      ctx.lineTo(el.x, el.y)
      ctx.lineWidth = 1
      ctx.strokeStyle = gradient
      ctx.stroke()
    }
    return true
  })
}

export const drawBackgroundLine = (
  ctx,
  vm,
  globalOptionLineElements,
  globalDefaults,
  valueOrDefault
) => {
  ctx.save()
  ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle

  if (ctx.setLineDash) {
    ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash)
  }

  ctx.lineDashOffset = valueOrDefault(
    vm.borderDashOffset,
    globalOptionLineElements.borderDashOffset
  )
  ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle
  ctx.lineWidth = valueOrDefault(
    vm.borderWidth,
    globalOptionLineElements.borderWidth
  )
  ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor
}

export const calcLinePoints = (ctx, points, helpers, spanGaps) => {
  const l = points.reduce((object, current, index) => {
    const { skip, x, y } = current._view
    const previous = helpers.previousItem(points, index)

    if (index === 0 && !skip) {
      ctx.moveTo(x, y)
      return object
    } else if (!skip && !spanGaps) {
      ctx.moveTo(x, y)
    } else {
      helpers.canvas.lineTo(ctx, previous._view, current._view)
    }

    object[index] = {
      previousVLine: {
        ...previous._view,
      },
      currentVLine: {
        ...current._view,
      },
    }
    return object
  }, {})

  delete l[points.length - 1]

  return l
}
