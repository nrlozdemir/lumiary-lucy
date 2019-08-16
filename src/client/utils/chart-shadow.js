/*!
 * chartjs-plugin-style v0.5.0
 * https://nagix.github.io/chartjs-plugin-style
 * (c) 2019 Akihiko Kusanagi
 * Released under the MIT license
 */
;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('chart.js')))
    : typeof define === 'function' && define.amd
    ? define(['chart.js'], factory)
    : ((global = global || self), (global.ChartStyle = factory(global.Chart)))
})(this, function(Chart) {
  'use strict'

  Chart = Chart && Chart.hasOwnProperty('default') ? Chart['default'] : Chart

  var helpers = Chart.helpers
  var optionsHelpers = helpers.options || {}

  var optionsHelpers$1 = helpers.extend(optionsHelpers, {
    resolve:
      optionsHelpers.resolve ||
      function(inputs, context, index) {
        var i, ilen, value

        for (i = 0, ilen = inputs.length; i < ilen; ++i) {
          value = inputs[i]
          if (value === undefined) {
            continue
          }
          if (context !== undefined && typeof value === 'function') {
            value = value(context)
          }
          if (index !== undefined && helpers.isArray(value)) {
            value = value[index]
          }
          if (value !== undefined) {
            return value
          }
        }
      },
  })

  var helpers$1 = Chart.helpers

  var resolve = optionsHelpers$1.resolve

  var OFFSET = 1000000

  function isColorOption(key) {
    return key.indexOf('Color') !== -1
  }

  var styleHelpers = {
    styleKeys: [
      'shadowOffsetX',
      'shadowOffsetY',
      'shadowBlur',
      'shadowColor',
      'bevelWidth',
      'bevelHighlightColor',
      'bevelShadowColor',
      'innerGlowWidth',
      'innerGlowColor',
      'outerGlowWidth',
      'outerGlowColor',
      'backgroundOverlayColor',
      'backgroundOverlayMode',
    ],

    lineStyleKeys: [
      'shadowOffsetX',
      'shadowOffsetY',
      'shadowBlur',
      'shadowColor',
      'outerGlowWidth',
      'outerGlowColor',
    ],

    pointStyleKeys: [
      'pointShadowOffsetX',
      'pointShadowOffsetY',
      'pointShadowBlur',
      'pointShadowColor',
      'pointBevelWidth',
      'pointBevelHighlightColor',
      'pointBevelShadowColor',
      'pointInnerGlowWidth',
      'pointInnerGlowColor',
      'pointOuterGlowWidth',
      'pointOuterGlowColor',
      'pointBackgroundOverlayColor',
      'pointBackgroundOverlayMode',
    ],

    hoverStyleKeys: [
      'hoverShadowOffsetX',
      'hoverShadowOffsetY',
      'hoverShadowBlur',
      'hoverShadowColor',
      'hoverBevelWidth',
      'hoverBevelHighlightColor',
      'hoverBevelShadowColor',
      'hoverInnerGlowWidth',
      'hoverInnerGlowColor',
      'hoverOuterGlowWidth',
      'hoverOuterGlowColor',
      'hoverBackgroundOverlayColor',
      'hoverBackgroundOverlayMode',
    ],

    pointHoverStyleKeys: [
      'pointHoverShadowOffsetX',
      'pointHoverShadowOffsetY',
      'pointHoverShadowBlur',
      'pointHoverShadowColor',
      'pointHoverBevelWidth',
      'pointHoverBevelHighlightColor',
      'pointHoverBevelShadowColor',
      'pointHoverInnerGlowWidth',
      'pointHoverInnerGlowColor',
      'pointHoverOuterGlowWidth',
      'pointHoverOuterGlowColor',
      'pointHoverBackgroundOverlayColor',
      'pointHoverBackgroundOverlayMode',
    ],

    drawBackground: function(view, drawCallback) {
      var borderWidth = view.borderWidth

      view.borderWidth = 0
      drawCallback()
      view.borderWidth = borderWidth
    },

    drawBorder: function(view, drawCallback) {
      var backgroundColor = view.backgroundColor

      if (view.borderWidth) {
        view.backgroundColor = 'rgba(0, 0, 0, 0)'
        drawCallback()
        view.backgroundColor = backgroundColor
      }
    },

    drawShadow: function(chart, options, drawCallback, backmost) {
      var ctx = chart.ctx
      var pixelRatio = chart.currentDevicePixelRatio

      ctx.save()

      ctx.shadowOffsetX = (options.shadowOffsetX + OFFSET) * pixelRatio
      ctx.shadowOffsetY = options.shadowOffsetY * pixelRatio
      ctx.shadowBlur = options.shadowBlur * pixelRatio
      ctx.shadowColor = options.shadowColor
      if (backmost) {
        ctx.globalCompositeOperation = 'destination-over'
      }
      ctx.translate(-OFFSET, 0)

      drawCallback()

      ctx.restore()
    },

    setPath: function(ctx, drawCallback) {
      ctx.save()
      ctx.beginPath()
      ctx.clip()
      drawCallback()
      ctx.restore()
    },

    drawBevel: function(chart, options, drawCallback) {
      var ctx = chart.ctx
      var pixelRatio = chart.currentDevicePixelRatio
      var shadowWidthFactor = (pixelRatio * 5) / 6
      var width = options.bevelWidth * shadowWidthFactor
      var borderWidth = options.borderWidth
      var parsedBorderWidth = options.parsedBorderWidth
      var shadowOffset, offset

      if (!width) {
        return
      }

      if (!this.opaque(options.borderColor)) {
        shadowOffset = { top: width, left: width, bottom: width, right: width }
      } else if (parsedBorderWidth) {
        shadowOffset = {
          top: width + parsedBorderWidth.top * pixelRatio,
          left: width + parsedBorderWidth.left * pixelRatio,
          bottom: width + parsedBorderWidth.bottom * pixelRatio,
          right: width + parsedBorderWidth.right * pixelRatio,
        }
      } else {
        offset = width + ((borderWidth > 0 ? borderWidth : 0) * pixelRatio) / 2
        shadowOffset = {
          top: offset,
          left: offset,
          bottom: offset,
          right: offset,
        }
      }

      ctx.save()

      this.setPath(ctx, drawCallback)
      ctx.clip()

      ctx.translate(-OFFSET, 0)
      this.setPath(ctx, drawCallback)
      ctx.rect(0, 0, chart.width, chart.height)

      ctx.fillStyle = 'black'
      ctx.shadowOffsetX = OFFSET * pixelRatio - shadowOffset.right
      ctx.shadowOffsetY = -shadowOffset.bottom
      ctx.shadowBlur = width
      ctx.shadowColor = options.bevelShadowColor
      if (!(navigator && navigator.userAgent.match('Windows.+Firefox'))) {
        ctx.globalCompositeOperation = 'source-atop'
      }
      ctx.fill('evenodd')

      ctx.shadowOffsetX = OFFSET * pixelRatio + shadowOffset.left
      ctx.shadowOffsetY = shadowOffset.top
      ctx.shadowColor = options.bevelHighlightColor
      ctx.fill('evenodd')

      ctx.restore()
    },

    drawGlow: function(chart, options, drawCallback, isOuter) {
      var ctx = chart.ctx
      var width = isOuter ? options.outerGlowWidth : options.innerGlowWidth
      var borderWidth = options.borderWidth
      var pixelRatio = chart.currentDevicePixelRatio

      if (!width) {
        return
      }

      ctx.save()

      this.setPath(ctx, drawCallback)
      if (isOuter) {
        ctx.rect(0, 0, chart.width, chart.height)
      }
      ctx.clip('evenodd')

      ctx.translate(-OFFSET, 0)
      this.setPath(ctx, drawCallback)
      if (!isOuter) {
        ctx.rect(0, 0, chart.width, chart.height)
      }

      ctx.lineWidth = borderWidth
      ctx.strokeStyle = 'black'
      ctx.fillStyle = 'black'
      ctx.shadowOffsetX = OFFSET * pixelRatio
      ctx.shadowBlur = width * pixelRatio
      ctx.shadowColor = isOuter
        ? options.outerGlowColor
        : options.innerGlowColor
      ctx.fill('evenodd')
      if (borderWidth) {
        ctx.stroke()
      }

      ctx.restore()
    },

    drawInnerGlow: function(chart, options, drawCallback) {
      this.drawGlow(chart, options, drawCallback)
    },

    drawOuterGlow: function(chart, options, drawCallback) {
      this.drawGlow(chart, options, drawCallback, true)
    },

    drawBackgroundOverlay: function(chart, options, drawCallback) {
      var ctx = chart.ctx
      var color = options.backgroundOverlayColor

      if (!color) {
        return
      }

      ctx.save()
      this.setPath(ctx, drawCallback)
      ctx.fillStyle = color
      ctx.globalCompositeOperation = options.backgroundOverlayMode
      ctx.fill()
      ctx.restore()
    },

    opaque: function(color) {
      return helpers$1.color(color).alpha() > 0
    },

    getHoverColor: function(color) {
      return color !== undefined ? helpers$1.getHoverColor(color) : color
    },

    mergeStyle: function(target, source) {
      if (target === undefined || source === undefined) {
        return
      }
      this.styleKeys.forEach(function(key) {
        target[key] = source[key]
      })
      return target
    },

    setHoverStyle: function(target, source) {
      var keys = this.styleKeys
      var hoverKeys = this.hoverStyleKeys
      var i, ilen

      if (target === undefined || source === undefined) {
        return
      }
      for (i = 0, ilen = keys.length; i < ilen; ++i) {
        target[keys[i]] = source[hoverKeys[i]]
      }
      return target
    },

    saveStyle: function(element) {
      var model = element._model
      var previousStyle = element.$previousStyle

      if (previousStyle) {
        this.mergeStyle(previousStyle, model)
      }
    },

    resolveStyle: function(controller, element, index, options) {
      var me = this
      var chart = controller.chart
      var dataset = chart.data.datasets[controller.index]
      var custom = element.custom || {}
      var keys = me.styleKeys
      var hoverKeys = me.hoverStyleKeys
      var values = {}
      var i, ilen, key, value

      var context = {
        chart: chart,
        dataIndex: index,
        dataset: dataset,
        datasetIndex: element._datasetIndex,
      }

      for (i = 0, ilen = keys.length; i < ilen; ++i) {
        key = keys[i]
        values[key] = value = resolve(
          [custom[key], dataset[key], options[key]],
          context,
          index
        )

        key = hoverKeys[i]
        values[key] = resolve(
          [
            custom[key],
            dataset[key],
            options[key],
            isColorOption(key) ? me.getHoverColor(value) : value,
          ],
          context,
          index
        )
      }

      return values
    },

    resolveLineStyle: function(controller, element, options) {
      var chart = controller.chart
      var dataset = chart.data.datasets[controller.index]
      var custom = element.custom || {}
      var keys = this.lineStyleKeys
      var values = {}
      var i, ilen, key

      var context = {
        chart: chart,
        dataset: dataset,
        datasetIndex: element._datasetIndex,
      }

      for (i = 0, ilen = keys.length; i < ilen; ++i) {
        key = keys[i]
        values[key] = resolve(
          [custom[key], dataset[key], options[key]],
          context
        )
      }

      return values
    },

    resolvePointStyle: function(controller, element, index, options) {
      var me = this
      var chart = controller.chart
      var dataset = chart.data.datasets[controller.index]
      var custom = element.custom || {}
      var keys = me.styleKeys
      var hoverKeys = me.hoverStyleKeys
      var pointKeys = me.pointStyleKeys
      var pointHoverKeys = me.pointHoverStyleKeys
      var values = {}
      var i, ilen, key, value

      var context = {
        chart: chart,
        dataIndex: index,
        dataset: dataset,
        datasetIndex: element._datasetIndex,
      }

      for (i = 0, ilen = keys.length; i < ilen; ++i) {
        key = keys[i]
        values[key] = value = resolve(
          [custom[key], dataset[pointKeys[i]], dataset[key], options[key]],
          context,
          index
        )

        key = hoverKeys[i]
        values[key] = resolve(
          [
            custom[key],
            dataset[pointHoverKeys[i]],
            options[key],
            isColorOption(key) ? me.getHoverColor(value) : value,
          ],
          context,
          index
        )
      }

      return values
    },
  }

  var helpers$2 = Chart.helpers

  var Arc = Chart.elements.Arc

  var StyleArc = Arc.extend({
    draw: function() {
      var me = this
      var args = arguments
      var chart = me._chart
      var vm = me._view

      var drawCallback = function() {
        Arc.prototype.draw.apply(me, args)
      }

      styleHelpers.drawShadow(chart, vm, drawCallback, true)

      if (styleHelpers.opaque(vm.backgroundColor)) {
        styleHelpers.drawBackground(vm, drawCallback)
        styleHelpers.drawBackgroundOverlay(chart, vm, drawCallback)
        styleHelpers.drawBevel(
          chart,
          vm.borderAlign === 'inner'
            ? helpers$2.extend({}, vm, {
                borderWidth: vm.borderWidth * 2,
              })
            : vm,
          drawCallback
        )
      }

      styleHelpers.drawInnerGlow(chart, vm, drawCallback)
      styleHelpers.drawOuterGlow(chart, vm, drawCallback)

      styleHelpers.drawBorder(vm, drawCallback)
    },
  })

  var defaults = Chart.defaults
  var helpers$3 = Chart.helpers

  var extend = helpers$3.extend
  var resolve$1 = optionsHelpers$1.resolve

  defaults.doughnut.legend.labels.generateLabels = defaults.pie.legend.labels.generateLabels = function(
    chart
  ) {
    var data = chart.data
    if (data.labels.length && data.datasets.length) {
      return data.labels.map(function(label, i) {
        var meta = chart.getDatasetMeta(0)
        var ds = data.datasets[0]
        var arc = meta.data[i] || {}
        var custom = arc.custom || {}
        var arcOpts = chart.options.elements.arc
        var fill = resolve$1(
          [custom.backgroundColor, ds.backgroundColor, arcOpts.backgroundColor],
          undefined,
          i
        )
        var stroke = resolve$1(
          [custom.borderColor, ds.borderColor, arcOpts.borderColor],
          undefined,
          i
        )
        var bw = resolve$1(
          [custom.borderWidth, ds.borderWidth, arcOpts.borderWidth],
          undefined,
          i
        )

        return extend(
          {
            text: label,
            fillStyle: fill,
            strokeStyle: stroke,
            lineWidth: bw,
            hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

            index: i,
          },
          styleHelpers.resolveStyle(meta.controller, arc, i, arcOpts)
        )
      })
    }
    return []
  }

  var DoughnutController = Chart.controllers.doughnut

  var StyleDoughnutController = DoughnutController.extend({
    dataElementType: StyleArc,

    updateElement: function(arc, index) {
      var me = this
      var options = styleHelpers.resolveStyle(
        me,
        arc,
        index,
        me.chart.options.elements.arc
      )
      var model = {}

      Object.defineProperty(arc, '_model', {
        configurable: true,
        get: function() {
          return model
        },
        set: function(value) {
          extend(model, value, options)
        },
      })

      DoughnutController.prototype.updateElement.apply(me, arguments)

      delete arc._model
      arc._model = model
      arc._styleOptions = options
    },

    setHoverStyle: function(element) {
      var me = this

      DoughnutController.prototype.setHoverStyle.apply(me, arguments)
      styleHelpers.saveStyle(element)
      styleHelpers.setHoverStyle(element._model, element._styleOptions)
    },

    removeHoverStyle: function(element) {
      var me = this

      if (!element.$previousStyle) {
        styleHelpers.mergeStyle(element._model, element._styleOptions)
      }

      DoughnutController.prototype.removeHoverStyle.apply(me, arguments)
    },
  })

  var helpers$4 = Chart.helpers
  var plugins = Chart.plugins

  var styleControllers = {
    doughnut: StyleDoughnutController,
    pie: StyleDoughnutController,
  }

  function buildOrUpdateControllers() {
    var me = this
    var newControllers = []

    helpers$4.each(
      me.data.datasets,
      function(dataset, datasetIndex) {
        var meta = me.getDatasetMeta(datasetIndex)
        var type = !!me && dataset.type || me.config.type

        if (!!me && meta.type && meta.type !== type) {
          me.destroyDatasetMeta(datasetIndex)
          meta = me.getDatasetMeta(datasetIndex)
        }
        meta.type = !!type && type

        if (meta.controller) {
          meta.controller.updateIndex(datasetIndex)
          meta.controller.linkScales()
        } else {
          var ControllerClass = styleControllers[meta.type]
          if (ControllerClass === undefined) {
            throw new Error('"' + meta.type + '" is not a chart type.')
          }

          meta.controller = new ControllerClass(me, datasetIndex)
          newControllers.push(meta.controller)
        }
      },
      me
    )

    return newControllers
  }

  var descriptors = plugins.descriptors

  plugins.descriptors = function(chart) {
    var style = chart._style

    if (style) {
      var cache =
        chart.$plugins ||
        chart._plugins ||
        (chart.$plugins = chart._plugins = {})
      if (cache.id === this._cacheId) {
        return cache.descriptors
      }

      var p = this._plugins
      var result

      this._plugins = p.map(function(plugin) {
        return plugin
      })
    }

    result = descriptors.apply(this, arguments)

    if (style) {
      this._plugins = p
    }

    return result
  }

  var StylePlugin = {
    id: 'style',

    beforeInit: function(chart) {
      Object.keys(styleControllers).map((c, i) => {
        if (chart.config.type === c) {
          chart._style = {}

          chart.buildOrUpdateControllers = buildOrUpdateControllers

          delete chart.$plugins
          delete chart._plugins
          plugins.descriptors(chart)
        }
      })
    },
  }

  Chart.plugins.register(StylePlugin)

  return StylePlugin
})
