import React from 'react'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import DoughnutChart from 'Components/Charts/DoughnutChart'
const DoughnutCard = ({ data }) => {
  if (!data) {
    return null
  }
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div className="col-4">
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
                <h1 className={style.cardTitle}>{data.title}</h1>
                <div
                  className={style.subtitle}
                  style={{
                    background: colors.labelBackground,
                    color: colors.labelColor,
                    boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                  }}
                >
                  <p className="font-secondary-second font-size-12 text-center">
                    {data.secondTitle}
                  </p>
                </div>
                <div className={style.doughnutChartContainer}>
                  <DoughnutChart
                    width={150}
                    height={150}
                    displayDataLabels={false}
                    cutoutPercentage={50}
                    data={{
                      labels: ['Red', 'Green', 'Blue', 'Yellow'],
                      datasets: [
                        {
                          data: [...data.average],
                          borderColor: '#373F5B',
                          backgroundColor: [
                            colors.textColor,
                            colors.textColor,
                            colors.textColor,

                            '#2FD7C4',
                          ],
                          hoverBackgroundColor: [
                            colors.textColor,
                            colors.textColor,
                            colors.textColor,

                            '#2FD7C4',
                          ],
                        },
                      ],
                    }}
                  />
                  <p>
                    <span className={style.textBold}>
                      {data.average[data.average.length - 1]}%{' '}
                    </span>
                    of your library
                    <br /> is shot in
                    <span className={style.textBold}>
                      {' '}
                      {data.secondTitle}
                      {data.description}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}
export default DoughnutCard
