import React from 'react'
import classnames from 'classnames'
import HorizontalStackedBarChart from 'Components/Charts/HorizontalStackedBarChart'
import { barChartOptions } from './options'
import StadiumChart from 'Components/Charts/Panoptic/StadiumChart'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

const pacingCardContainer = classnames('shadow-1', style.pacingCardContainer)

const PacingCard = ({ barData }) => {

  barData.labels = ["Live Action", "Stop Motion", "Cinemagraph", "Animation"]

  const labels = ["Slowest", "Slow", "Medium", "Fast"]
  const backgroundColors = ["#2FD7C4", "#8562F3", "#5292E5", "#acb0be"]
  const borderColors = ["#2FD7C4", "#8562F3", "#5292E5", "#acb0be"]

  Object.values(barData.datasets).map((el, i) => {
    barData.datasets[i].label = labels[i]
    barData.datasets[i].backgroundColor = backgroundColors[i]
    barData.datasets[i].borderColor = borderColors[i]
    barData.datasets[i].borderWidth = 1
  })

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div
          className={pacingCardContainer}
          style={{
            backgroundColor: colors.moduleBackground,
            color: colors.textColor,
            boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
          }}
        >
          <div className={style.componentTitle}>
            <span>Pacing For Each Format by Performance</span>
          </div>
          <div className={style.pacingCardInner}>
            <div className={style.pacingCardInnerItem}>
              <HorizontalStackedBarChart
                width={500}
                height={340}
                barData={{
                  labels: barData.labels,
                  datasets: barData.datasets.map((data, index) => {
                    const indexValues = data.data.map((v, i) => {
                      return barData.datasets.map((d) => d.data[i])
                    })

                    return {
                      ...data,
                      data: data.data.map((value, i) => {
                        const totalValue = indexValues[i].reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue
                        )
                        return parseFloat(
                          (value / (totalValue / 100)).toFixed(2)
                        )
                      }),
                    }
                  }),
                }}
                options={barChartOptions}
              />
            </div>
            <div className={style.pacingCardInnerItem}>
              <StadiumChart
                data={[
                  { value: 90, color: '#2FD7C4', title: 'Slowest' },
                  { value: 90, color: '#8562F3', title: 'Slow' },
                  { value: 50, color: '#5292E5', title: 'Medium' },
                  { value: 100, color: '#ACB0BE', title: 'Fast' },
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default PacingCard
