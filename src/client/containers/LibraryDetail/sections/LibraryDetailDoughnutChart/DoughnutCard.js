import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import DownArrowCircle from 'Components/Icons/DownArrowCircle'
import { actions } from 'Reducers/libraryDetail'
import { hexToRgb } from 'Utils'

class DoughnutCard extends React.Component {
  render() {
    const {
      identifier,
      title,
      maxLabel,
      duration,
      maxPercentage,
      toggleInfoSection,
      chartData,
      videoId,
    } = this.props
    
    let backgroundColor = chartData && chartData.datasets
      ? chartData.datasets[0].backgroundColor
      : []
    const data = chartData && chartData.datasets && chartData.datasets[0].data
    let newData = []
    const primaryColor = '#2FD7C4'
    // const secondaryColor = '#505050'

    //reorder colors so that unique color will be the first item
    backgroundColor = backgroundColor.reduce((accumulator, currentColor, index) => {
      if(currentColor === primaryColor) {
        newData = [data[index], ...newData]
        return [currentColor, ...accumulator]
      }
      newData = [ ...newData, data[index] ]
      return [ ...accumulator, currentColor ]
    }, [])

    if (backgroundColor && backgroundColor.length > 2) {
      backgroundColor = backgroundColor.map((color, index) => {
        let opacity = 100
        if (index > 1) {
          opacity = opacity - ((index - 1) * 15)
        }
        opacity = (opacity / 100).toFixed(2)
        const { r, g, b } = hexToRgb(color)
        const newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`     
        return newColor
      })
    }
    const newChartData = {
      ...chartData,
      datasets: [{
        ...chartData.datasets,
        data: newData,
        backgroundColor
      }],
    }

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
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
              <h1 className={style.cardTitle}>{title}</h1>
              <div
                className={style.subtitle}
                style={{
                  background: colors.labelBackground,
                  color: colors.labelColor,
                  boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                }}
              >
                <p className="font-secondary-second font-size-12 text-center">
                  {!!duration ? duration : maxLabel}
                </p>
              </div>
              <div className={style.doughnutChartContainer}>
                <DoughnutChart
                  width={150}
                  height={150}
                  displayDataLabels={false}
                  cutoutPercentage={50}
                  data={newChartData}
                />
                <p>
                  <span className={style.textBold}>{maxPercentage}% </span>
                  of your library
                  <br /> is shot in
                  <span className={style.textBold}> {maxLabel}</span>
                </p>
              </div>
            </div>
            <a
              className={style.doughnutChartFooter}
              onClick={() =>
                toggleInfoSection({
                  title,
                  label: maxLabel,
                })
              }
              style={{
                backgroundColor: colors.modalButtonBackground,
                color: colors.textColor,
              }}
            >
              View Metrics
              <DownArrowCircle className={style.icon} size={24} />
            </a>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({})

function mapDispatchToProps(dispatch) {
  return {
    toggleInfoSection: (show) => dispatch(actions.toggleInfoSection(show)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(DoughnutCard)
