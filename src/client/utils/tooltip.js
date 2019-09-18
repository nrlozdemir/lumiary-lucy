import React from 'react'
import { percentageBeautifier } from 'Utils/datasets'
import { metricSuffix, ucfirst } from 'Utils'
import ReactDOM from 'react-dom'

const getGlobalStyle = (custom = { title: {}, body: {} }) => {
  const title = {
    fontFamily: 'ClanOT',
    fontSize: '14px',
    fontStyle: 'normal',
    fontStretch: 'normal',
    fontWeight: 'bold',
    letterSpacing: 'normal',
    lineHeight: '1.43',
    margin: '16px 16px 8px 16px',
    ...custom.title,
  }

  const body = {
    fontFamily: 'ClanOT',
    fontSize: '12px',
    fontStyle: 'normal',
    fontStretch: 'normal',
    fontWeight: 'bold',
    letterSpacing: 'normal',
    lineHeight: '1.67',
    margin: '8px 16px 16px 16px',
    paddingTop: '8px',
    borderTop: '1px solid rgba(172, 176, 190, 0.5)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    ...custom.body,
  }

  return {
    title: title,
    body: body,
  }
}

const LineChartTemplate = function(props) {
  const style = getGlobalStyle()
  return (
    <div>
      <div className="chartjs-tooltip-title" style={style.title}>
        {!!props.multiData &&
          !!props.multiData.length &&
          props.multiData.map((data, i) => {
            return (
              <React.Fragment key={i}>
                <span>
                  {`${percentageBeautifier(
                    props.data.datasets[data.datasetIndex].data[data.index]
                  )} Score  |  ${
                    props.data.datasets[data.datasetIndex].label
                  } Pacing`}
                </span>
                {i !== props.multiData.length - 1 && <br />}
              </React.Fragment>
            )
          })}
        {!props.multiData &&
          `${percentageBeautifier(props.value)} Score  |  ${
            props.label
          } Pacing`}
      </div>
      <div className="chartjs-tooltip-body" style={style.body}>
        <span>{`On ${props.labelLong}, your CV score`}</span>
        {!isNaN(props.difference) && props.difference > 0 ? (
          <span>{`increased by ${props.difference}% from the `}</span>
        ) : !isNaN(props.difference) && props.difference < 0 ? (
          <span>{`decreased by ${props.difference}% from the `}</span>
        ) : (
          <span>did not change from the</span>
        )}
        <span>previous day</span>
      </div>
    </div>
  )
}

const VideoReleasesBarChartTemplate = function(props) {
  const style = getGlobalStyle({ title: { margin: '8px 16px' } })
  return (
    <div className="chartjs-tooltip-title" style={style.title}>
      {!!props.value && props.value}
    </div>
  )
}

const CircleChartTemplate = (props) => {
  const style = getGlobalStyle()

  const pStyle = {
    margin: '0px',
    padding: '0px',
    fontFamily: 'ClanOT',
    fontSize: '12px',
    lineHeight: '1.67',
  }

  return (
    <div>
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
    </div>
  )
}

const renderRepresentsVideoText = (props = {}, propVal = 'label') => {
  return `represents video with ${(!!props[propVal] &&
    'aeiou'.indexOf(props[propVal][0].toLowerCase()) !== -1 &&
    'an') ||
    'a'}`
}

const DoughnutChartTemplate = function(props) {
  const style = getGlobalStyle()

  return (
    <div>
      <div className="chartjs-tooltip-title" style={style.title}>
        {`${percentageBeautifier(props.value)}%  |  ${!!props.itemLabel &&
          props.itemLabel}`}
      </div>
      <div className="chartjs-tooltip-body" style={style.body}>
        <span>{`${percentageBeautifier(props.value)}% of your library`}</span>
        <span>{renderRepresentsVideoText(props)}</span>
        <span>{`${!!props.label &&
          props.label.toLowerCase()} of ${!!props.itemLabel &&
          props.itemLabel}`}</span>
      </div>
    </div>
  )
}

const VerticalStackedBarChartTemplate = function(props) {
  const style = getGlobalStyle()

  return (
    <div>
      <div className="chartjs-tooltip-title" style={style.title}>
        {`${percentageBeautifier(props.value)}%  |  ${!!props.label &&
          props.label}`}
      </div>
      <div className="chartjs-tooltip-body" style={style.body}>
        <span>{`${percentageBeautifier(props.value)}% of your library`}</span>
        <span>{renderRepresentsVideoText(props, 'propertyValue')}</span>
        <span>{`${!!props.propertyValue &&
          props.propertyValue.toLowerCase()} of ${!!props.label &&
          props.label.toLowerCase()}`}</span>
      </div>
    </div>
  )
}

const HorizontalStackedBarChartTemplate = function(props) {
  const style = getGlobalStyle()

  return (
    <div>
      <div className="chartjs-tooltip-title" style={style.title}>
        {`${percentageBeautifier(props.value)}%  |  ${!!props.propertyTitle &&
          props.propertyTitle} Pacing`}
      </div>
      <div className="chartjs-tooltip-body" style={style.body}>
        <span>{`${percentageBeautifier(props.value)}% of your library`}</span>
        <span>represents video with a pacing</span>
        <span>{`of ${!!props.propertyTitle &&
          props.propertyTitle.toLowerCase()}`}</span>
      </div>
    </div>
  )
}

const RadarChartTemplate = (props) => {
  const style = getGlobalStyle()

  return (
    <div>
      <div className="chartjs-tooltip-title" style={style.title}>
        {!!props.multiData &&
          !!props.multiData.length &&
          props.multiData.map((data, i) => {
            return (
              <React.Fragment key={i}>
                <span>
                  {`${percentageBeautifier(
                    props.data.labels[data.index].count
                  )}% ${!!props.metric && props.metric}  |  ${ucfirst(
                    props.data.labels[data.index].name
                  )}`}
                </span>
                {i !== props.multiData.length - 1 && <br />}
              </React.Fragment>
            )
          })}
        {!props.multiData &&
          `${percentageBeautifier(props.value)}% ${!!props.metric &&
            props.metric}  |  ${!!props.itemLabel &&
            !!props.itemLabel.name &&
            ucfirst(props.itemLabel.name)}`}
      </div>
      <div className="chartjs-tooltip-body" style={style.body}>
        <span>
          {`On ${!!props.platform && props.platform}, ${percentageBeautifier(
            props.value
          )}% of`}
        </span>
        <span>your library</span>
        <span>represents video</span>
        <span>
          {`
            that are
            ${!!props.itemLabel &&
              !!props.itemLabel.name &&
              props.itemLabel.name}
          `}
        </span>
      </div>
    </div>
  )
}

const HorizontalBarChartTemplate = function(props) {
  const style = getGlobalStyle()

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
        {percentageBeautifier(!!props.value && props.value)}%{'  '}
        {!!props.property && props.property} {!!props.metric && props.metric}
      </div>
      <div className="chartjs-tooltip-body" style={style.body}>
        <p style={pStyle}>
          {percentageBeautifier(!!props.value && props.value)}% of{' '}
          {!!props.gender && props.gender.toLowerCase()}
          {`s`} prefer
        </p>
        <p style={pStyle}>
          videos that are {!!props.property && props.property.toLowerCase()}
        </p>
        <p style={pStyle}>{!!props.metric && props.metric.toLowerCase()}</p>
      </div>
    </React.Fragment>
  )
}

const MarketviewPieChartTemplate = function(props) {
  const style = getGlobalStyle()

  return (
    <React.Fragment>
      <div className="chartjs-tooltip-title" style={style.title}>
        <span>
          {metricSuffix(props.value)} {ucfirst(props.metric)} |{' '}
          {props.itemLabel} {props.label}
        </span>
      </div>
      <div className="chartjs-tooltip-body" style={style.body}>
        <span>Competitor videos that are</span>
        <span>
          shot in {props.itemLabel} {props.label} received
        </span>
        <span>
          {metricSuffix(props.value)} {ucfirst(props.metric)}.
        </span>
      </div>
    </React.Fragment>
  )
}

const MarketviewVerticalStackedBarChartTemplate = function(props) {
  const style = getGlobalStyle()

  return (
    <div>
      <div className="chartjs-tooltip-title" style={style.title}>
        {`${!!props.value &&
          percentageBeautifier(props.value)}%  |  ${!!props.label &&
          props.label}`}
      </div>
      <div className="chartjs-tooltip-body" style={style.body}>
        <span>{!!props.label && props.label} received </span>
        <span>
          {!!props.value && percentageBeautifier(props.value)}% of all{' '}
          {!!props.metricValue && props.metricValue} on
        </span>
        <span>{!!props.platformLabel && props.platformLabel}.</span>
      </div>
    </div>
  )
}

const MarketviewDoughnutChartTemplate = function(props) {
  const style = getGlobalStyle()

  return (
    <div>
      <div className="chartjs-tooltip-title" style={style.title}>
        {`${percentageBeautifier(props.value)}%  |  ${!!props.itemLabel &&
          props.itemLabel}`}
      </div>
      <div className="chartjs-tooltip-body" style={style.body}>
        <span>{!!props.itemLabel && props.itemLabel} capture</span>
        <span>
          {!!props.value && percentageBeautifier(props.value)}% of all{' '}
          {!!props.metric && !!props.metric.value && props.metric.value} on
        </span>
        <span>
          {!!props.platform && !!props.platform.label && props.platform.label}.
        </span>
      </div>
    </div>
  )
}

const modifyTooltip = function(props, conf = {}) {
  const { options = {} } = props

  return {
    enabled: false,
    custom: function(tooltipModel) {
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

      const metricValue =
        !!props &&
        !!props.data &&
        !!props.data.metric &&
        !!props.data.metric.value &&
        props.data.metric.value
      const platformValue =
        !!props &&
        !!props.data &&
        !!props.data.platform &&
        !!props.data.platform.value &&
        props.data.platform.value
      const metricLabel =
        !!props &&
        !!props.data &&
        !!props.data.metric &&
        !!props.data.metric.label &&
        props.data.metric.label
      const platformLabel =
        !!props &&
        !!props.data &&
        !!props.data.platform &&
        !!props.data.platform.label &&
        props.data.platform.label

      const dataPoints =
        !!tooltipModel.dataPoints &&
        !!tooltipModel.dataPoints.length &&
        tooltipModel.dataPoints.length > 1 &&
        tooltipModel.dataPoints

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
        // tooltipEl.style.display = 'none'
        // caretEl.style.display = 'none'
        return
      }

      tooltipEl.style.transition = 'opacity 0.2s'
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
          LineChartTemplate: () =>
            LineChartTemplate({
              data: props.data,
              multiData: dataPoints,
              label: (!!label && label) || '',
              value: (!!value && value) || 0,
              labelLong: (!!labelLong && labelLong) || '',
              difference: !!difference && difference | 0,
            }),
          DoughnutChartTemplate: () =>
            DoughnutChartTemplate({
              label: (!!label && label) || '',
              value: (!!value && value) || 0,
              labelLong: (!!labelLong && labelLong) || '',
              difference: !!difference && difference | 0,
              itemLabel: (!!itemLabel && itemLabel) || '',
            }),
          VerticalStackedBarChartTemplate: () =>
            VerticalStackedBarChartTemplate({
              label: (!!label && label) || '',
              value: (!!value && value) || 0,
              labelLong: (!!labelLong && labelLong) || '',
              difference: !!difference && difference | 0,
              itemLabel: (!!itemLabel && itemLabel) || '',
              propertyValue: (!!propertyValue && propertyValue) || '',
            }),
          HorizontalStackedBarChartTemplate: () =>
            HorizontalStackedBarChartTemplate({
              label: (!!label && label) || '',
              value: (!!value && value) || 0,
              labelLong: (!!labelLong && labelLong) || '',
              difference: !!difference && difference | 0,
              itemLabel: (!!itemLabel && itemLabel) || '',
              propertyTitle: (!!propertyTitle && propertyTitle) || '',
            }),
          VideoReleasesBarChartTemplate: () =>
            VideoReleasesBarChartTemplate({
              value: value,
            }),
          RadarChartTemplate: () =>
            RadarChartTemplate({
              data: props.data,
              multiData: dataPoints,
              label: (!!label && label) || '',
              value: (!!value && value) || 0,
              labelLong: (!!labelLong && labelLong) || '',
              difference: !!difference && difference | 0,
              itemLabel: (!!itemLabel && itemLabel) || '',
              metric: (!!metric && metric) || '',
              platform: (!!platform && platform) || '',
            }),
          HorizontalBarChartTemplate: () =>
            HorizontalBarChartTemplate({
              label: (!!label && label) || '',
              value: (!!value && value) || 0,
              labelLong: (!!labelLong && labelLong) || '',
              difference: !!difference && difference | 0,
              itemLabel: (!!itemLabel && itemLabel) || '',
              metric: (!!metric && metric) || '',
              platform: (!!platform && platform) || '',
            }),

          MarketviewPieChartTemplate: () =>
            MarketviewPieChartTemplate({
              label: (!!label && label) || '',
              value: (!!value && value) || 0,
              itemLabel: (!!itemLabel && itemLabel) || '',
              metric: (!!metric && metric) || '',
            }),
          MarketviewVerticalStackedBarChartTemplate: () =>
            MarketviewVerticalStackedBarChartTemplate({
              label: (!!label && label) || '',
              value: (!!value && value) || 0,
              labelLong: (!!labelLong && labelLong) || '',
              difference: !!difference && difference | 0,
              itemLabel: (!!itemLabel && itemLabel) || '',
              propertyValue: (!!propertyValue && propertyValue) || '',
              metric: (!!metric && metric) || '',
              platform: (!!platform && platform) || '',
              metricValue: !!metricValue && metricValue,
              platformValue: !!platformValue && platformValue,
              metricLabel: !!metricLabel && metricLabel,
              platformLabel: !!platformLabel && platformLabel,
            }),

          MarketviewDoughnutChartTemplate: () =>
            MarketviewDoughnutChartTemplate({
              label: (!!label && label) || '',
              value: (!!value && value) || 0,
              labelLong: (!!labelLong && labelLong) || '',
              difference: !!difference && difference | 0,
              itemLabel: (!!itemLabel && itemLabel) || '',
              propertyValue: (!!propertyValue && propertyValue) || '',
              metric: (!!metric && metric) || '',
              platform: (!!platform && platform) || '',
              metricValue: !!metricValue && metricValue,
              platformValue: !!platformValue && platformValue,
              metricLabel: !!metricLabel && metricLabel,
              platformLabel: !!platformLabel && platformLabel,
            }),
        }

        const Template = templates[props.template]
        ReactDOM.render(<Template />, tooltipEl)
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
        (props.template === 'VerticalStackedBarChartTemplate' ||
          props.template === 'MarketviewVerticalStackedBarChartTemplate')
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

      caretEl.style = {}
      tooltipEl.style.left = tooptipLeft + 'px'
      tooltipEl.style.top = tooltipTop + 'px'
      tooltipEl.style.textAlign = 'center'

      // Caret Styling
      caretEl.style.transition = 'opacity 0.2s'
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
