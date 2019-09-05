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
  titleStyle += 'color: #fff;'

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
  bodyStyle += 'color: #fff;'

  let el = ''
  el += '<div class="chartjs-tooltip-title" style="' + titleStyle + '">'
  el += `${percentageBeautifier(props.value)} Score  |  ${props.label} Pacing`
  el += '</div><div style="' + bodyStyle + '" class="chartjs-tooltip-body">'
  el += `On ${props.labelLong}, your CV score<br> D by E% from the<br> previous day.`
  el += '</div>'

  return el
}

const modifyTooltip = function(props) {
  console.log('modify tooltip props: ', props)
  return {
    enabled: false,
    custom: function(tooltipModel) {
      //console.log('tooltipModel', tooltipModel)
      if (!!tooltipModel.dataPoints) {
        console.log(tooltipModel.dataPoints[0])
      }

      const datasetIndex =
        (!!tooltipModel &&
          !!tooltipModel.dataPoints &&
          !!tooltipModel.dataPoints[0] &&
          tooltipModel.dataPoints[0].hasOwnProperty('datasetIndex') &&
          tooltipModel.dataPoints[0].datasetIndex) << 0

      const index =
        (!!tooltipModel &&
          !!tooltipModel.dataPoints &&
          !!tooltipModel.dataPoints[0] &&
          tooltipModel.dataPoints[0].hasOwnProperty('index') &&
          tooltipModel.dataPoints[0].index) << 0
      console.log('++', index, datasetIndex)
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
        !!datasetIndex &&
        !!props.data.datasets[datasetIndex] &&
        !!props.data.datasets[datasetIndex].data &&
        !!props.data.datasets[datasetIndex].data[index] &&
        props.data.datasets[datasetIndex].data[index]

      const defaults = {
        maxWidth: 240,
        headerFontSize: 14,
        bodyFontSize: 12,
        fontFamily: 'ClanOTBold',
        background: '#505050',
        textColor: '#ffffff',

        // caret styles
        caretWidth: 8,
        caretHeight: 8,
        caretPadding: 10,
        caretColor: '#505050',

        // tolerance 'px' inside for tooltip position
        tolerance: 60,
      }

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
            label: label,
            value: value,
            labelLong: labelLong,
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
      tooltipEl.style.backgroundColor = defaults.background // 'rgb(226, 54, 54)'

      tooltipEl.style.padding = '0px'
      tooltipEl.style.borderRadius = '5px'
      tooltipEl.style.pointerEvents = 'none'

      // Caret Styling
      caretEl.style.opacity = 1

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
      tooltipEl.style.color = '#ffffff'
      tooltipEl.style.textAlign = 'center'

      let caretStyles = arrowDown

      caretStyles.left = caretLeft + 'px'
      caretStyles.top = caretTop + 'px'
      caretStyles.width = 0
      caretStyles.height = 0
      caretStyles.position = 'absolute'

      for (let i in caretStyles) {
        caretEl.style[i] = caretStyles[i]
      }
      // caretEl.style = caretStyles
    },
  }
}

export { modifyTooltip }
