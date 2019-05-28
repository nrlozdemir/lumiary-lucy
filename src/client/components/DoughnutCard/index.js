import React from 'react'
import style from './style.scss'
import DoughnutChart from 'Components/Charts/DoughnutChart'
const DoughnutCard = ({ sectionItem, index, colors }) => {
  const dataset = sectionItem.datasets[0]
  const topItemIndex = dataset.data.indexOf(Math.max(...dataset.data))

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
              {sectionItem.labels[topItemIndex]
                .split('-')
                .map((c) => capitalizeFirstLetter(c))
                .join('-')}
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
              data={sectionItem}
            />
            <p>
              <span className={style.textBold}>
                {dataset.data[topItemIndex]}%{' '}
              </span>
              of top videos
              <br /> are shot in{' '}
              <span className={style.textBold}>
                {sectionItem.labels[topItemIndex]
                  .split('-')
                  .map((c) => capitalizeFirstLetter(c))
                  .join('-')}{' '}
                {dataset.label}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DoughnutCard
