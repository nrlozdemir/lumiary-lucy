import React from 'react'
import { percentageBeautifier } from 'Utils/datasets'

const LineChartTemplate = function(props) {
  let titleStyle = 'margin: 16px 16px 8px 16px;'
  titleStyle += 'font-family: ClanOT;'
  titleStyle += 'font-size: 14px;'
  titleStyle += 'font-weight: bold;'
  titleStyle += 'font-style: normal;'
  titleStyle += 'font-stretch: normal;'
  titleStyle += 'line-height: 1.43;'
  titleStyle += 'letter-spacing: normal;'

  let bodyStyle = 'margin: 8px 16px 16px 16px;'
  bodyStyle += 'padding-top: 8px;'
  bodyStyle += 'border-top: 1px solid #e8ecf0;'
  bodyStyle += 'font-family: ClanOT;'
  bodyStyle += 'font-size: 12px;'
  bodyStyle += 'font-weight: bold;'
  bodyStyle += 'font-style: normal;'
  bodyStyle += 'font-stretch: normal;'
  bodyStyle += 'line-height: 1.67;'
  bodyStyle += 'letter-spacing: normal;'

  let el = ''
  el += '<div class="chartjs-tooltip-title" style="' + titleStyle + '">'
  el += `${percentageBeautifier(props.value)} Score  |  ${props.label} Pacing`
  el += '</div><div style="' + bodyStyle + '" class="chartjs-tooltip-body">'

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

const CircleChartTemplate = (props) => {
  const titleStyle = {
    margin: '16px 16px 8px 16px',
    fontFamily: 'ClanOT',
    fontSize: '14px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: '1.43',
    letterSpacing: 'normal',
  }

  const bodyStyle = {
    margin: '8px 16px 16px 16px',
    fontFamily: 'ClanOT',
    fontSize: '12px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: '1.67',
    letterSpacing: 'normal',
    paddingTop: '8px',
    borderTop: '1px solid #e8ecf0',
  }

  const pStyle = {
    margin: '0px',
    padding: '0px',
    fontFamily: 'ClanOT',
    fontSize: '12px',
    lineHeight: '1.67',
  }

  return (
    <React.Fragment>
      <div className="chartjs-tooltip-title" style={titleStyle}>
        {percentageBeautifier(props.value)} Score{'  '}|{'  '}
        {props.platform} Average
      </div>
      <div style={bodyStyle} className="chartjs-tooltip-body">
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
  console.log('DoughnutChartTemplate props', props)
  let titleStyle = 'margin: 16px 16px 8px 16px;'
  titleStyle += 'font-family: ClanOT;'
  titleStyle += 'font-size: 14px;'
  titleStyle += 'font-weight: bold;'
  titleStyle += 'font-style: normal;'
  titleStyle += 'font-stretch: normal;'
  titleStyle += 'line-height: 1.43;'
  titleStyle += 'letter-spacing: normal;'

  let bodyStyle = 'margin: 8px 16px 16px 16px;'
  bodyStyle += 'padding-top: 8px;'
  bodyStyle += 'border-top: 1px solid #e8ecf0;'
  bodyStyle += 'font-family: ClanOT;'
  bodyStyle += 'font-size: 12px;'
  bodyStyle += 'font-weight: bold;'
  bodyStyle += 'font-style: normal;'
  bodyStyle += 'font-stretch: normal;'
  bodyStyle += 'line-height: 1.67;'
  bodyStyle += 'letter-spacing: normal;'

  let el = ''
  el += '<div class="chartjs-tooltip-title" style="' + titleStyle + '">'
  el += `${percentageBeautifier(props.value)}%  |  ${!!props.itemLabel &&
    props.itemLabel}`
  el += '</div><div style="' + bodyStyle + '" class="chartjs-tooltip-body">'

  el += `${percentageBeautifier(props.value)}% of your library<br> `
  el += `represents video with ${(!!props.label &&
    'aeiou'.indexOf(props.label[0].toLowerCase()) !== -1 &&
    'an') ||
    'a'}<br> `
  el += `${!!props.label &&
    props.label.toLowerCase()} of <br> ${!!props.itemLabel && props.itemLabel}`
  el += '</div>'

  return el
}

const modifyTooltip = function(props) {
  console.log('modify tooltip props: ', props)
  const { options = {} } = props
  return {
    enabled: false,
    custom: function(tooltipModel) {
      //console.log('tooltipModel', tooltipModel)
      // !!tooltipModel.dataPoints && console.log(tooltipModel.dataPoints[0])

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

      const value =
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

      console.log('datasetIndex:', datasetIndex)
      console.log('index:', index)
      console.log('previousIndex: ', previousIndex)
      console.log('previousValue: ', previousValue)
      console.log('diff: ', difference)
      console.log('itemLabel: ', itemLabel)

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

      // Set Text
      if (tooltipModel.body) {
        const titleLines = tooltipModel.title || []
        const bodyLines = tooltipModel.body.map(getBody)
        let innerHtml = '<div class="chartjs-tooltip-title">'

        //console.log('titleLines:', titleLines)
        //console.log('bodyLines:', bodyLines)

        titleLines.forEach(function(title) {
          innerHtml +=
            '<p style="font-size:' +
            defaults.headerFontSize +
            '; font-family:' +
            defaults.fontFamily +
            ';' +
            '">' +
            title +
            '</p>'
        })

        innerHtml += '</div><div class="chartjs-tooltip-body">'

        bodyLines.forEach(function(body, i) {
          innerHtml +=
            '<p style="font-size:' +
            defaults.bodyFontSize +
            '; font-family:' +
            defaults.fontFamily +
            ';' +
            '">' +
            body +
            '</p>'
        })

        innerHtml += '</div>'

        tooltipEl.innerHTML = innerHtml

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
        }

        tooltipEl.innerHTML = templates[props.template]
      }

      // `this` will be the overall tooltip
      const position = this._chart.canvas.getBoundingClientRect()

      // console.log('==>', position, tooltipModel)

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1
      tooltipEl.style.position = 'absolute'
      tooltipEl.style.backgroundColor = defaults.background
      tooltipEl.style.color = defaults.textColor

      tooltipEl.style.padding = '0px'
      tooltipEl.style.borderRadius = '8px'
      tooltipEl.style.pointerEvents = 'none'
      tooltipEl.style.display = 'block'

      // Caret Styling
      caretEl.style.opacity = 1
      caretEl.style.display = 'block'

      let caretLeft =
        position.left +
        window.pageXOffset +
        tooltipModel.caretX -
        defaults.caretWidth

      /*
      console.log(
        '!!!',
        position.right,
        window.pageXOffset,
        tooltipModel.caretX,
        defaults.caretWidth
      )
      */

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

      // caret positon calculate for left side
      if (
        position.left +
        defaults.tolerance +
        70 + // leftPadding for legend infromations
          window.pageXOffset >
        caretLeft
      ) {
        // console.log('left')
        tooptipLeft = tooptipLeft + tooltipEl.clientWidth / 3
      }

      // caret positon calculate for right side
      if (position.width - (70 + defaults.tolerance) < tooltipModel.caretX) {
        // console.log('right')
        tooptipLeft = tooptipLeft - tooltipEl.clientWidth / 3
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

      tooltipEl.style.left = tooptipLeft + 'px'

      tooltipEl.style.top = tooltipTop + 'px'
      tooltipEl.style.textAlign = 'center'

      let caretStyles = arrowDown

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
  }
}

export { modifyTooltip, CircleChartTemplate, DoughnutChartTemplate }
