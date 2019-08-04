import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import cx from 'classnames'
import LineChart from 'Components/Charts/LineChart'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
// import { lineChartOptions, lineChartData_DatasetOptions } from './options'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import { isDataSetEmpty } from 'Utils/datasets'
import { roundRect } from 'Utils/ui'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import { ucfirst } from 'Utils'

const percentageCol = cx('col-4-no-gutters', style.percentageCol)

const ContentVitalityScoreModule = ({
  data = {},
  authProfile = {},
  moduleKey,
  title,
  action,
  filters,
  legend,
  removeTooltip,
  removePointRadius,
  xAxesFlatten,
  flattenFirstSpace,
  flattenLastSpace,
  options,
  loading = false,
  chartYAxisMax = 100,
  platform,
  average,
  params,
  dataKeys: {
    leftLabel,
    rightLabel,
    middleLabel,
    leftKey,
    rightKey,
    middleKey,
  },
  audience = false,
}) => {

  if(!data) {
    return null
  }

  let formattedData

  if(data.other) {
    const temp_formattedData = Object.keys(data.other).reduce((accumulator, key) => {
      if(key === 'averageCvScore') {
        return accumulator
      }
  
      const item = {
        ...data[key],
        uuid: key
      }
  
      if (!!authProfile.brand && key === authProfile.brand.uuid) {
        item.name = authProfile.brand.name
      } else {
        authProfile.brand.competitors.forEach((competitor) => {
          if (key === competitor.uuid) {
            item.name = competitor.name
          }
        })
      }
  
      accumulator.push(item)
  
      return accumulator
    }, [])
  
    if(temp_formattedData.length !== 2) {
      return null
    }
  
    formattedData = {
      leftDataset: temp_formattedData[0],
      middleDataset: {
        ...data[middleKey || 'other'],
        name: middleLabel
          ? middleLabel
          : middleKey
          ? middleKey
          : 'Percent Difference',
      },
      rightDataset: temp_formattedData[1],
    }
  } else {
    formattedData =
    (!!data &&
      Object.keys(data).reduce(
        (accumulator, dataKey) => {
          switch (dataKey) {
            case middleKey:
            case 'other':
              accumulator.middleDataset = {
                ...data[middleKey || dataKey],
                name: middleLabel
                  ? middleLabel
                  : middleKey
                  ? middleKey
                  : 'Percent Difference',
              }
              break

            case leftKey:
              accumulator.leftDataset = {
                ...data[leftKey],
                name: leftLabel || leftKey,
              }
              break

            case rightKey:
              accumulator.rightDataset = {
                ...data[rightKey],
                name: rightLabel || rightKey,
              }
              break

            default:
              if (!!authProfile.brand && dataKey === authProfile.brand.uuid) {
                accumulator.leftDataset = {
                  ...data[dataKey],
                  name: authProfile.brand.name,
                }
              } else {
                authProfile.brand.competitors.forEach((competitor) => {
                  if (dataKey === competitor.uuid) {
                    accumulator.rightDataset = {
                      ...data[dataKey],
                      name: competitor.name,
                    }
                  }
                })
              }

              break
          }

          return accumulator
        },
        {
          leftDataset: {},
          middleDataset: {},
          rightDataset: {},
        }
      )) ||
    {}
  }


  const newDatasets = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    datasets: [
      {
        data:
          (formattedData.rightDataset &&
            formattedData.rightDataset.videoPercents) ||
          [],
      },
      {
        data:
          (formattedData.leftDataset &&
            formattedData.leftDataset.videoPercents) ||
          [],
      },
    ],
  }

  const names = Object.values(formattedData).map((ds) => ds.name || 'N/A')

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <Module
          moduleKey={moduleKey}
          title={title}
          action={action}
          filters={filters}
          legend={legend}
          loading={loading}
          isEmpty={!loading && isDataSetEmpty(newDatasets)}
        >
          <div
            className="col-12-no-gutters"
            style={{ colors: colors.textColor }}
          >
            <div
              data-vertical-title="Number Of Videos"
              className={style.vitalityContainer}
            >
              <LineChart
                chartType="lineStackedArea"
                width={1120}
                height={295}
                tickUnvisible
                backgroundColor={colors.chartBackground}
                dataSet={
                  loading
                    ? {}
                    : {
                        labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        datasets: [
                          {
                            data:
                              (formattedData.rightDataset &&
                                formattedData.rightDataset.videoPercents) ||
                              [],
                          },
                          {
                            data:
                              (formattedData.leftDataset &&
                                formattedData.leftDataset.videoPercents) ||
                              [],
                          },
                        ],
                      }
                }
                removeTooltip={removeTooltip}
                // removePointRadius={removePointRadius}
                // xAxesFlatten={xAxesFlatten}
                // flattenFirstSpace={flattenFirstSpace}
                // flattenLastSpace={flattenLastSpace}
                yAxesStepSize={500}
                yAxesMax={0}
                yAxesPercentage
                dynamicPercentage
                customLine
                options={{
                  ...options,
                  average: 50,
                  hover: {
                    mode: 'dataset',
                    intersect: false,
                    onHover: (a, c) => {
                      const max = Math.min.apply(
                        Math,
                        c.map(function(o) {
                          return o._model.y
                        })
                      )

                      const maxObject = c.find((o) => o._model.y === max)

                      const chart = maxObject && maxObject._chart
                      if (!maxObject) return null
                      const averagePoint =
                        ((chart.chartArea.right - chart.chartArea.left) / 100) *
                          chart.options.average +
                        48
                      chart.ctx.beginPath()
                      chart.ctx.setLineDash([8, 5])
                      const dashMarginTop = (30 * maxObject._model.y) / 285

                      if (averagePoint < maxObject._model.x) {
                        chart.ctx.moveTo(
                          averagePoint,
                          maxObject._model.y - dashMarginTop
                        )
                        chart.ctx.lineTo(
                          maxObject._model.x,
                          maxObject._model.y - dashMarginTop
                        )
                      } else {
                        chart.ctx.moveTo(
                          maxObject._model.x,
                          maxObject._model.y - dashMarginTop
                        )
                        chart.ctx.lineTo(
                          averagePoint,
                          maxObject._model.y - dashMarginTop
                        )
                      }
                      chart.ctx.moveTo(
                        maxObject._model.x,
                        maxObject._model.y - dashMarginTop
                      )
                      chart.ctx.lineTo(maxObject._model.x, maxObject._model.y)
                      chart.ctx.strokeStyle = '#505050'
                      chart.ctx.lineWidth = 2
                      chart.ctx.stroke()

                      chart.ctx.lineWidth = 4
                      chart.ctx.fillStyle = '#505050'
                      const rectWidth = 210
                      const rectHeight = 90

                      const rectX =
                        averagePoint < maxObject._model.x
                          ? maxObject._model.x + 20
                          : maxObject._model.x - rectWidth - 20
                      const rectY = maxObject._model.y - rectHeight / 2
                      roundRect(
                        chart.ctx,
                        rectX,
                        rectY,
                        rectWidth,
                        rectHeight,
                        5
                      )
                      chart.ctx.font = '12px ClanOT'
                      chart.ctx.textAlign = 'center'
                      chart.ctx.textBaseline = 'middle'
                      chart.ctx.fillStyle = '#fff'

                      const text = audience
                        ? `The average ${
                            maxObject._datasetIndex ? 'female' : 'male'
                          } scores 10\n points above your library\n average on facebook!`
                        : `${ucfirst(platform)}${
                            platform === 'all' ? ' Platforms' : ''
                          } Average | ${average}`

                      const lines = text.split('\n')

                      for (let i = 0; i < lines.length; i++)
                        chart.ctx.fillText(
                          lines[i],
                          rectX + rectWidth / 2,
                          rectY + i * 20 + 25
                        )

                      if (averagePoint < maxObject._model.x) {
                        chart.ctx.beginPath()
                        chart.ctx.lineTo(rectX + 3, rectY + rectHeight / 2 - 13)
                        chart.ctx.lineTo(rectX - 10, rectY + rectHeight / 2)
                        chart.ctx.lineTo(rectX + 3, rectY + rectHeight / 2 + 13)
                      } else {
                        chart.ctx.beginPath()
                        chart.ctx.lineTo(
                          rectX + rectWidth,
                          rectY + rectHeight / 2 - 10
                        )
                        chart.ctx.lineTo(
                          rectX + rectWidth + 10,
                          rectY + rectHeight / 2
                        )
                        chart.ctx.lineTo(
                          rectX + rectWidth,
                          rectY + rectHeight / 2 + 10
                        )
                      }
                      chart.ctx.fillStyle = '#505050'
                      chart.ctx.fill()
                    },
                  },
                }}
              />
            </div>

            <div className="row">
              {!loading && Object.keys(formattedData).map((key, idx) => {
                const { averageCvScore } = formattedData[key]

                const cvScore =
                  averageCvScore === 'NaN' || !averageCvScore
                    ? 0
                    : Math.floor(parseInt(averageCvScore))

                const bgColor =
                  idx === 0 ? '#5292e5' : idx === 1 ? '##8562f3' : '#2fd7c4'

                const titleText = formattedData[key].name
                const percentDifference = data.other && data.other[formattedData[key].uuid] ? Math.abs(data.other[formattedData[key].uuid]) : 'N/A'
                const diffWording = data.other && data.other[formattedData[key].uuid] ? data.other[formattedData[key].uuid] > 0 ? 'below' : 'above' : 'N/A' 

                return (
                  <div className={percentageCol} key={idx}>
                    <div
                      className={style.legend}
                      style={{
                        background: colors.labelBackground,
                        color: colors.labelColor,
                        boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                      }}
                    >
                      {names[idx]}
                    </div>
                    {idx !== 2 && (
                      <div
                        className={style.divider}
                        style={{
                          background: colors.moduleBorder,
                        }}
                      />
                    )}
                    {cvScore === 0 ? (
                      <div className={style.emptyData}>No Data Available</div>
                    ) : (
                      <React.Fragment>
                        <DoughnutChart
                          width={140}
                          height={140}
                          displayDataLabels={false}
                          cutoutPercentage={80}
                          datasetsBorderWidth={0}
                          removeTooltip
                          average={idx === 1 ? null : average}
                          cvScoreData={{
                            platform,
                          }}
                          layoutPadding={7}
                          data={{
                            datasets: [
                              {
                                borderColor: '#f3f6f9',
                                data: [cvScore, 100 - cvScore],
                                backgroundColor: [bgColor, '#acb0be'],
                                hoverBackgroundColor: [bgColor, '#acb0be'],
                              },
                            ],
                          }}
                        />
                        <div
                          className={style.centerText}
                          style={{
                            color: colors.labelColor,
                          }}
                        >
                          <div className={style.wrapper}>
                            <span
                              className={style.bigText}
                              style={{
                                color: colors.labelColor,
                              }}
                            >
                              {`${cvScore}${idx === 1 ? '%' : ''}`}
                            </span>
                            <span
                              className={style.littleText}
                              style={{
                                color: colors.labelColor,
                              }}
                            >
                              {idx === 1 ? 'Difference' : 'CV Score'}
                            </span>
                          </div>
                        </div>

                        <p
                          className={style.doughnutChartText}
                          style={{
                            color: colors.labelColor,
                          }}
                        >
                          {idx === 1 ? (
                            <span>
                              The difference between{' '}
                              {audience ? 'male' : names[0]}{' '}
                              {audience ? '' : 'videos'} and{' '}
                              {audience ? 'female' : names[2]}{' '}
                              {audience ? '' : 'video'} scores is{' '}
                              <b>{cvScore}%</b>
                            </span>
                          ) : (
                            <span>
                              {}
                              The average {titleText} video scores <b>{percentDifference}</b>{' '}
                              points <b>{diffWording}</b> your
                              library average on{' '}
                              {`${ucfirst(platform)}${
                                platform === 'all' ? ' Platforms' : ''
                              }`}
                            </span>
                          )}
                        </p>
                      </React.Fragment>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </Module>
      )}
    </ThemeContext.Consumer>
  )
}

ContentVitalityScoreModule.propTypes = {
  data: PropTypes.any.isRequired,
  moduleKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.object,
  filters: PropTypes.array,
  dataKeys: PropTypes.object,
}

ContentVitalityScoreModule.defaultProps = {
  dataKeys: {},
}

export default ContentVitalityScoreModule
