import React from 'react'
import style from './style.scss'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import { metricSuffix } from 'Utils'
const DoughnutCard = ({ data, index, colors, isEmpty }) => {
  const dataset = data.datasets[0]
  const checkObjectOrValue = dataset.data.map((item) =>
    !!item.value ? item.value : item
  )
  const topItemIndex = checkObjectOrValue.indexOf(
    Math.max(...checkObjectOrValue)
  )
  
  const topItemData = dataset.data[topItemIndex] || {}

  let customData = {
    ...data,
    datasets: [
      {
        ...data.datasets[0],
        data: data.datasets[0].data.map((item) =>
          !!item.value ? item.value : item
        ),
      },
    ],
  }
  customData.datasets[0].backgroundColor = customData.datasets[0].backgroundColor.map(
    (item, idx) => {
      return idx === topItemIndex ? '#2FD7C4' : colors.textColor
    }
  )
  return (
    <div className={style.radialChartsContainer}>
      <div
        className={style.radialChart}
        style={{ borderColor: colors.moduleBorder }}
      >
        <div
          className={style.doughnutChartContainerHover}
          style={{
            backgroundColor: colors.moduleBackground,
            boxShadow: `0px 2px 6px 0px ${colors.moduleShadow}`,
            color: colors.textColor,
          }}
        />
        {!isEmpty && (
          <div className={style.cardInner}>
            <h1 className={style.cardTitle}>
              #{index + 1} {dataset.label}
            </h1>

            <div
              className={style.subtitle}
              style={{
                background: colors.labelBackground,
                color: colors.labelColor,
                boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
              }}
            >
              <p className="font-secondary-second font-size-12 text-center">
                {data.labels[topItemIndex]}
              </p>
            </div>
            <div className={style.doughnutChartContainer}>
              <DoughnutChart
                width={150}
                height={150}
                displayDataLabels={false}
                cutoutPercentage={50}
                customDoughnutContainer={style.customDoughnutContainer}
                customChartWrapper={style.customChartWrapper}
                customTooltips={{
                  callbacks: {
                    title: (tooltipItem, data) => {
                      return data.datasets[0].label
                    },
                    label: ({ index }, data) => {
                      return (
                        data.labels[index] +
                        ': ' +
                        metricSuffix(data.datasets[0].data[index])
                      )
                    },
                  },
                }}
                data={customData}
              />
              <p>
                <span className={style.textBold}>
                  {!!topItemData.proportionOfLibrary
                    ? topItemData.proportionOfLibrary
                    : ''}
                  %{' '}
                </span>
                of top videos
                <br /> are shot in{' '}
                <span className={style.textBold}>
                  {data.labels[topItemIndex]} {dataset.label}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default DoughnutCard
