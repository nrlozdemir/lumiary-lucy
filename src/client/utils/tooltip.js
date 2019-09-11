import React from 'react'
import { percentageBeautifier } from 'Utils/datasets'
import { metricSuffix, ucfirst } from 'Utils'

const getGlobalStyle = (custom = { title: {}, body: {} }, domStyle = false) => {
  const title = {
    'font-family': 'ClanOT',
    'font-size': '14px',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'font-weight': 'bold',
    'letter-spacing': 'normal',
    'line-height': '1.43',
    margin: '16px 16px 8px 16px',
    ...custom.title,
  }

  const body = {
    'font-family': 'ClanOT',
    'font-size': '12px',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'font-weight': 'bold',
    'letter-spacing': 'normal',
    'line-height': '1.67',
    margin: '8px 16px 16px 16px',
    'padding-top': '8px',
    'border-top': '1px solid #e8ecf0',
    ...custom.body,
  }

  let titleStyle
  let bodyStyle

  if (domStyle === true) {
    titleStyle = {}
    bodyStyle = {}
  } else {
    titleStyle = ''
    bodyStyle = ''
  }

  Object.keys(title).map((s, i) => {
    const value = title[s]
    if (domStyle === false) {
      titleStyle += `${s}:${value};`
    } else {
      const pos = s.split('-')
      if (!!pos) {
        s = `${pos[0]}${ucfirst(pos[1])}`
        s = s.replace('-', '')
      }
      titleStyle[s] = value
    }
  })

  Object.keys(body).map((s, i) => {
    const value = body[s]
    if (domStyle === false) {
      bodyStyle += `${s}:${value};`
    } else {
      const pos = s.split('-')
      if (!!pos) {
        s = `${pos[0]}${ucfirst(pos[1])}`
        s = s.replace('-', '')
      }
      bodyStyle[s] = value
    }
  })

  return {
    title: !!titleStyle && titleStyle,
    body: !!bodyStyle && bodyStyle,
  }
}

const LineChartTemplate = function(props) {
  const style = getGlobalStyle()

  let el = ''
  el += '<div class="chartjs-tooltip-title" style="' + style.title + '">'
  el += `${percentageBeautifier(props.value)} Score  |  ${props.label} Pacing`
  el += '</div><div class="chartjs-tooltip-body" style="' + style.body + '">'
  el += `On ${props.labelLong}, your CV score <br> `
  if (!isNaN(props.difference) && props.difference > 0) {
    el += `increased by ${props.difference}% from the <br> previous day.`
  } else if (!isNaN(props.difference) && props.difference < 0) {
    el += `decreased by ${props.difference}% from the <br> previous day.`
  } else {
    el += `did not change from the <br> previous day.`
  }
  el += '</div>'

  return el
}

const VideoReleasesBarChartTemplate = function(props) {
  const style = getGlobalStyle({ title: { margin: '8px 16px' } })

  let el = ''
  el += '<div class="chartjs-tooltip-title" style="' + style.title + '">'
  el += `${props.value}`
  el += '</div>'
  el += '</div>'

  return el
}

const CircleChartTemplate = (props) => {
  const style = getGlobalStyle({}, true)

  const pStyle = {
    margin: '0px',
    padding: '0px',
    fontFamily: 'ClanOT',
    fontSize: '12px',
    lineHeight: '1.67',
  }

  return (
    <React.Fragment>
      <div className="chartjs-tooltip-title" style={style.title}>
        {percentageBeautifier(props.value)} Score{'  '}|{'  '}
        {props.platform} Average
      </div>
      <div className="chartjs-tooltip-body" style={style.body}>
        <p style={pStyle}>
          On {props.labelLong}, your average {props.platform}
        </p>
        <p style={pStyle}>video had a {props.average} content vitality</p>
        <p style={pStyle}>score</p>
      </div>
    </React.Fragment>
  )
}

const DoughnutChartTemplate = function(props) {
  const style = getGlobalStyle()

  let el = ''
  el += '<div class="chartjs-tooltip-title" style="' + style.title + '">'
  el += `${percentageBeautifier(props.value)}%  |  ${!!props.itemLabel &&
    props.itemLabel}`
  el += '</div><div class="chartjs-tooltip-body" style="' + style.body + '">'
  el += `${percentageBeautifier(props.value)}% of your library<br> `
  el += `represents video with ${(!!props.label &&
    'aeiou'.indexOf(props.label[0].toLowerCase()) !== -1 &&
    'an') ||
    'a'}<br> `
  el += `${!!props.label && props.label.toLowerCase()} of ${!!props.itemLabel &&
    props.itemLabel}`
  el += '</div>'

  return el
}

const VerticalStackedBarChartTemplate = function(props) {
  const style = getGlobalStyle()

  let el = ''
  el += '<div class="chartjs-tooltip-title" style="' + style.title + '">'
  el += `${percentageBeautifier(props.value)}%  |  ${!!props.label &&
    props.label}`
  el += '</div><div class="chartjs-tooltip-body" style="' + style.body + '">'
  el += `${percentageBeautifier(props.value)}% of your library<br> `
  el += `represents video with ${(!!props.propertyValue &&
    'aeiou'.indexOf(props.propertyValue[0].toLowerCase()) !== -1 &&
    'an') ||
    'a'}<br> `
  el += `${!!props.propertyValue &&
    props.propertyValue.toLowerCase()} of ${!!props.label &&
    props.label.toLowerCase()}`
  el += '</div>'

  return el
}

const HorizontalStackedBarChartTemplate = function(props) {
  const style = getGlobalStyle()

  let el = ''
  el += '<div class="chartjs-tooltip-title" style="' + style.title + '">'
  el += `${percentageBeautifier(props.value)}%  |  ${!!props.propertyTitle &&
    props.propertyTitle} Pacing`
  el += '</div><div class="chartjs-tooltip-body" style="' + style.body + '">'
  el += `${percentageBeautifier(props.value)}% of your library<br> `
  el += `represents video with a pacing<br> `
  el += `of ${!!props.propertyTitle && props.propertyTitle.toLowerCase()}`
  el += '</div>'

  return el
}

const RadarChartTemplate = function(props) {
  const style = getGlobalStyle()

  let el = ''
  el += '<div class="chartjs-tooltip-title" style="' + style.title + '">'
  el += `${percentageBeautifier(props.value)}% ${!!props.metric &&
    props.metric}  |  ${!!props.itemLabel &&
    !!props.itemLabel.name &&
    ucfirst(props.itemLabel.name)}`
  el += '</div><div class="chartjs-tooltip-body" style="' + style.body + '">'
  el += `On ${!!props.platform && props.platform}, ${percentageBeautifier(
    props.value
  )}% of<br> your library<br> `
  el += `represents video<br> that are  ${!!props.itemLabel &&
    !!props.itemLabel.name &&
    props.itemLabel.name.toLowerCase()} `
  el += '</div>'

  return el
}

const HorizontalBarChartTemplate = function(props) {
  const style = getGlobalStyle({}, true)

  const pStyle = {
    margin: '0px',
    padding: '0px',
    fontFamily: 'ClanOT',
    fontSize: '12px',
    lineHeight: '1.67',
  }

  return (
    <React.Fragment>
      <div className="chartjs-tooltip-title" style={style.title}>
        {percentageBeautifier(props.value)}%{'  '}{props.property} {props.metric}
      </div>
      <div className="chartjs-tooltip-body" style={style.body}>
        <p style={pStyle}>
				{percentageBeautifier(props.value)}% of {props.gender} prefer
        </p>
        <p style={pStyle}>videos that are {props.property}</p>
        <p style={pStyle}>{props.metric}</p>
      </div>
    </React.Fragment>
  )
}

const modifyTooltip = function(props, conf = {}) {
  //console.log('modify tooltip props: ', props)
  const { options = {} } = props
  return {
    enabled: false,
    custom: function(tooltipModel) {
      //console.log('tooltipModel', tooltipModel)
      //!!tooltipModel.dataPoints && console.log(tooltipModel.dataPoints[0])

      const datasetIndex =
        (!!tooltipModel &&
          !!tooltipModel.dataPoints &&
          !!tooltipModel.dataPoints[0] &&
          tooltipModel.dataPoints[0].hasOwnProperty('datasetIndex') &&
          tooltipModel.dataPoints[0].datasetIndex) ||
        0

      const index =
        (!!tooltipModel &&
          !!tooltipModel.dataPoints &&
          !!tooltipModel.dataPoints[0] &&
          tooltipModel.dataPoints[0].hasOwnProperty('index') &&
          tooltipModel.dataPoints[0].index) ||
        0

      const label =
        !!props.data &&
        !!props.data.datasets &&
        !isNaN(datasetIndex) &&
        props.data.datasets[datasetIndex].label

      const labelLong =
        !!props.data &&
        !!props.data.labelsLong &&
        !isNaN(index) &&
        props.data.labelsLong[index]

      let value =
        !!props.data &&
        !!props.data.datasets &&
        !isNaN(datasetIndex) &&
        !isNaN(index) &&
        !!props.data.datasets[datasetIndex] &&
        !!props.data.datasets[datasetIndex].data &&
        !!props.data.datasets[datasetIndex].data[index] &&
        props.data.datasets[datasetIndex].data[index]

      const previousIndex =
        index === 0
          ? !!props.data &&
            !!props.data.datasets &&
            !isNaN(datasetIndex) &&
            !isNaN(index) &&
            !!props.data.datasets[datasetIndex] &&
            !!props.data.datasets[datasetIndex].data &&
            Object.values(props.data.datasets[datasetIndex].data).length - 1
          : index - 1

      const previousValue =
        (!!props.data &&
          !!props.data.datasets &&
          !isNaN(datasetIndex) &&
          !isNaN(index) &&
          !isNaN(previousIndex) &&
          !!props.data.datasets[datasetIndex] &&
          !!props.data.datasets[datasetIndex].data &&
          !!props.data.datasets[datasetIndex].data[previousIndex] &&
          props.data.datasets[datasetIndex].data[previousIndex]) ||
        0

      const difference =
        !isNaN(value) &&
        !isNaN(previousValue) &&
        percentageBeautifier(value - previousValue)

      const itemLabel =
        !!props.data &&
        !!props.data.labels &&
        !isNaN(index) &&
        props.data.labels[index]

      const propertyValue =
        !!props.data && !!props.data.property && props.data.property

      const propertyTitle =
        !!props &&
        !!props.data &&
        !isNaN(datasetIndex) &&
        !!props.data.properties &&
        !!props.data.properties[datasetIndex] &&
        props.data.properties[datasetIndex]

      const metric = !!props && !!props.metric && props.metric

      const platform = !!props && !!props.platform && props.platform

      /*
      console.log('props:', props)
      console.log('datasetIndex:', datasetIndex)
      console.log('index:', index)
      console.log('previousIndex: ', previousIndex)
      console.log('value: ', value)
      console.log('previousValue: ', previousValue)
      console.log('difference: ', difference)
      console.log('itemLabel: ', itemLabel)
      console.log('propertyValue: ', propertyValue)
      console.log('propertyTitle: ', propertyTitle)
      console.log('metric: ', metric)
      console.log('platform: ', platform)
      */

      const defaults = {
        maxWidth: 240,
        headerFontSize: 14,
        bodyFontSize: 12,
        fontFamily: 'ClanOTBold',
        background: options.background || '#505050',
        textColor: options.textColor || '#ffffff',

        // caret styles
        caretWidth: 8,
        caretHeight: 8,
        caretPadding: 10,
        caretColor: options.caretColor || '#505050',

        // tolerance 'px' inside for tooltip position
        tolerance: 60,
        position: options.position || false,
      }
      //console.log('defaults', defaults)

      // Tooltip Element
      let tooltipEl = document.getElementById('chartjs-tooltip')

      // Caret Element
      let caretEl = document.getElementById('chart-caret')

      // Create element on first render
      if (!tooltipEl) {
        tooltipEl = document.createElement('div')
        tooltipEl.id = 'chartjs-tooltip'
        document.body.appendChild(tooltipEl)
      }

      if (!caretEl) {
        caretEl = document.createElement('div')
        caretEl.id = 'chart-caret'
        document.body.appendChild(caretEl)
      }

      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0
        caretEl.style.opacity = 0
        tooltipEl.style.display = 'none'
        caretEl.style.display = 'none'
        return
      }

      tooltipEl.style.zIndex = 1000

      // Set caret Position
      tooltipEl.classList.remove('above', 'below', 'no-transform')
      if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign)
      } else {
        tooltipEl.classList.add('no-transform')
      }

      function getBody(bodyItem) {
        return bodyItem.lines
      }

      // `this` will be the overall tooltip
      const position = this._chart.canvas.getBoundingClientRect()

      // Set Text
      if (tooltipModel.body) {
        if (
          !!props.template &&
          props.template === 'VideoReleasesBarChartTemplate'
        ) {
          const absValue = Math.abs(value)
          if ((position.height - 40) / 2 < tooltipModel.caretY) {
            value = `${metricSuffix(~~absValue)} ${props.metric}`
          } else {
            value = `${Math.round(absValue / props.videoNormalizer)}% Videos`
          }
        }

        const templates = {
          LineChartTemplate: LineChartTemplate({
            label: (!!label && label) || '',
            value: (!!value && value) || 0,
            labelLong: (!!labelLong && labelLong) || '',
            difference: !!difference && difference | 0,
          }),
          DoughnutChartTemplate: DoughnutChartTemplate({
            label: (!!label && label) || '',
            value: (!!value && value) || 0,
            labelLong: (!!labelLong && labelLong) || '',
            difference: !!difference && difference | 0,
            itemLabel: (!!itemLabel && itemLabel) || '',
          }),
          VerticalStackedBarChartTemplate: VerticalStackedBarChartTemplate({
            label: (!!label && label) || '',
            value: (!!value && value) || 0,
            labelLong: (!!labelLong && labelLong) || '',
            difference: !!difference && difference | 0,
            itemLabel: (!!itemLabel && itemLabel) || '',
            propertyValue: (!!propertyValue && propertyValue) || '',
          }),
          HorizontalStackedBarChartTemplate: HorizontalStackedBarChartTemplate({
            label: (!!label && label) || '',
            value: (!!value && value) || 0,
            labelLong: (!!labelLong && labelLong) || '',
            difference: !!difference && difference | 0,
            itemLabel: (!!itemLabel && itemLabel) || '',
            propertyTitle: (!!propertyTitle && propertyTitle) || '',
          }),
          VideoReleasesBarChartTemplate: VideoReleasesBarChartTemplate({
            value: value,
          }),
          RadarChartTemplate: RadarChartTemplate({
            label: (!!label && label) || '',
            value: (!!value && value) || 0,
            labelLong: (!!labelLong && labelLong) || '',
            difference: !!difference && difference | 0,
            itemLabel: (!!itemLabel && itemLabel) || '',
            metric: (!!metric && metric) || '',
            platform: (!!platform && platform) || '',
          }),
          HorizontalBarChartTemplate: HorizontalBarChartTemplate({
            label: (!!label && label) || '',
            value: (!!value && value) || 0,
            labelLong: (!!labelLong && labelLong) || '',
            difference: !!difference && difference | 0,
            itemLabel: (!!itemLabel && itemLabel) || '',
            metric: (!!metric && metric) || '',
            platform: (!!platform && platform) || '',
          }),
        }

        tooltipEl.innerHTML = templates[props.template]
      }

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1
      tooltipEl.style.position = 'absolute'
      tooltipEl.style.backgroundColor = defaults.background
      tooltipEl.style.color = defaults.textColor

      tooltipEl.style.padding = '0px'
      tooltipEl.style.borderRadius = '8px'
      tooltipEl.style.pointerEvents = 'none'
      tooltipEl.style.display = 'block'

      let caretLeft =
        position.left +
        window.pageXOffset +
        tooltipModel.caretX -
        defaults.caretWidth

      let caretTop =
        position.top +
        window.pageYOffset +
        tooltipModel.caretY -
        defaults.caretHeight -
        defaults.caretPadding

      let tooptipLeft =
        position.left +
        window.pageXOffset +
        tooltipModel.caretX -
        tooltipEl.clientWidth / 2

      let tooltipTop =
        position.top +
        window.pageYOffset +
        tooltipModel.caretY -
        tooltipEl.clientHeight -
        (defaults.caretHeight + defaults.caretPadding)

      if (defaults.position === 'auto') {
        caretEl.style = {}
        // caret positon calculate for left side
        if (
          position.left +
          defaults.tolerance +
          70 + // leftPadding for legend infromations
            window.pageXOffset >
          caretLeft
        ) {
          tooptipLeft = tooptipLeft + tooltipEl.clientWidth / 3
        }

        // caret positon calculate for right side
        if (position.width - (70 + defaults.tolerance) < tooltipModel.caretX) {
          tooptipLeft = tooptipLeft - tooltipEl.clientWidth / 3
        }
      }

      let arrowUp = {
        borderLeft: `${defaults.caretWidth}px solid transparent`,
        borderRight: `${defaults.caretWidth}px solid transparent`,
        borderBottom: `${defaults.caretHeight}px solid ${defaults.caretColor}`,
      }
      let arrowDown = {
        borderLeft: `${defaults.caretWidth}px solid transparent`,
        borderRight: `${defaults.caretWidth}px solid transparent`,
        borderTop: `${defaults.caretHeight}px solid ${defaults.caretColor}`,
      }

      let arrowLeft = {
        borderTop: `${defaults.caretWidth}px solid transparent`,
        borderBottom: `${defaults.caretWidth}px solid transparent`,
        borderRight: `${defaults.caretHeight}px solid ${defaults.caretColor}`,
      }
      let arrowRight = {
        borderTop: `${defaults.caretWidth}px solid transparent`,
        borderBottom: `${defaults.caretWidth}px solid transparent`,
        borderLeft: `${defaults.caretHeight}px solid ${defaults.caretColor}`,
      }

      let caretStyles = arrowDown
      // if Chart is VideoReleasesBarChartTemplate, tooltip and caret position
      if (
        !!props.template &&
        props.template === 'VideoReleasesBarChartTemplate'
      ) {
        caretEl.style = {}
        if ((position.height - 40) / 2 < tooltipModel.caretY) {
          caretStyles = arrowUp
          tooltipTop =
            position.top +
            window.pageYOffset +
            tooltipModel.caretY +
            defaults.caretHeight +
            defaults.caretPadding

          caretTop =
            position.top +
            window.pageYOffset +
            tooltipModel.caretY +
            defaults.caretPadding
        }
      }
      if (
        !!props.template &&
        props.template === 'VerticalStackedBarChartTemplate'
      ) {
        let barDataModel
        if (tooltipModel.dataPoints) {
          const { index, datasetIndex } = tooltipModel.dataPoints[0]
          const meta = this._chartInstance.getDatasetMeta(datasetIndex)
          barDataModel = meta.data[index]._model
          barDataModel.centerPoint = meta.data[index].getCenterPoint()
        }
        if (barDataModel) {
          caretStyles = arrowRight

          caretLeft =
            position.left +
            window.pageXOffset +
            barDataModel.centerPoint.x -
            defaults.caretPadding -
            barDataModel.width / 2

          caretTop =
            position.top +
            window.pageYOffset +
            barDataModel.centerPoint.y -
            defaults.caretHeight / 2

          tooltipTop =
            position.top +
            window.pageYOffset +
            barDataModel.centerPoint.y -
            tooltipEl.clientHeight / 2

          tooptipLeft =
            position.left +
            window.pageXOffset +
            1 +
            barDataModel.centerPoint.x -
            barDataModel.width / 2 -
            tooltipEl.clientWidth -
            defaults.caretPadding
        }
      }

      if (
        !!props.template &&
        props.template === 'HorizontalStackedBarChartTemplate'
      ) {
        let barDataModel
        if (tooltipModel.dataPoints) {
          const { index, datasetIndex } = tooltipModel.dataPoints[0]
          const meta = this._chartInstance.getDatasetMeta(datasetIndex)
          barDataModel = meta.data[index]._model
          barDataModel.barHeight = meta.data[index]._view.height
          barDataModel.centerPoint = meta.data[index].getCenterPoint()
        }
        if (barDataModel) {
          caretLeft =
            position.left +
            window.pageXOffset +
            barDataModel.centerPoint.x -
            defaults.caretWidth

          caretTop =
            position.top +
            window.pageYOffset +
            barDataModel.centerPoint.y -
            barDataModel.barHeight / 2 -
            defaults.caretPadding

          tooltipTop =
            position.top +
            window.pageYOffset +
            barDataModel.centerPoint.y -
            barDataModel.barHeight / 2 -
            defaults.caretPadding -
            tooltipEl.clientHeight

          tooptipLeft =
            position.left +
            window.pageXOffset +
            barDataModel.centerPoint.x -
            tooltipEl.clientWidth / 2
        }
      }

      tooltipEl.style.left = tooptipLeft + 'px'
      tooltipEl.style.top = tooltipTop + 'px'
      tooltipEl.style.textAlign = 'center'

      // Caret Styling
      caretEl.style.opacity = 1
      caretEl.style.display = 'block'
      caretEl.style.zIndex = 1000
      caretStyles.left = caretLeft + 'px'
      caretStyles.top = caretTop + 'px'
      caretStyles.width = 0
      caretStyles.height = 0
      caretStyles.position = 'absolute'
      caretStyles.zIndex = 1000

      for (let i in caretStyles) {
        caretEl.style[i] = caretStyles[i]
      }
      // caretEl.style = caretStyles
    },
    ...conf,
  }
}

export { modifyTooltip, CircleChartTemplate, HorizontalBarChartTemplate }
