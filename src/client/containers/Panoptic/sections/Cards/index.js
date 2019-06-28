import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectFlipCards } from 'Reducers/panoptic'
import classnames from 'classnames'
import FlipCard from 'Components/FlipCard'
import CustomBarChart from 'Components/Charts/CustomBarChart'
import styles from './style.scss'
import { ucfirst, metricSuffix } from 'Utils'
import { ThemeContext } from 'ThemeContext/themeContext'

const getWeekDays = (locale) => {
  let days = []
  let currentDate = new Date()
  
  for(let i = 0; i < 7; i++)
  {       
    days.push(currentDate.toLocaleDateString(locale, { 
      weekday: 'long' 
    }))
    currentDate.setDate(currentDate.getDate() - 1)      
  }
  return days
}

const days = getWeekDays('en-US').reverse()

function parseData(props) {
  const { data, title } = props
  const stats = data.data.map((el, i) => ({ label: days[i], score: el }))
  const selected = days[new Date().getDay()]
  const selectedPrev =
    days[
      ((day) => new Date(day.setDate(day.getDate() - 1)).getDay())(new Date())
    ]
  const statSelected = Object.values(stats).filter(
    (day) => stats && day.label === selected
  )
  const statSelectedPrev = Object.values(stats).filter(
    (day) => stats && day.label === selectedPrev
  )
  const todayScore = statSelected[0].score
  const previousDayScore = statSelectedPrev[0].score
  const statDifference = data.percentage

  let statArrowClassName, statClassName, backText

  if (data.percentage == 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowRight)
    statClassName = classnames(styles.stats, styles.noChange)
    backText = `${title} didn't changed today from yesterday`
  } else if (data.percentage > 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowUp)
    statClassName = classnames(styles.stats, styles.increase)
    backText = `${title} increased ${
      data.percentage
    }% today from yesterday, from ${metricSuffix(previousDayScore)} to ${metricSuffix(todayScore)}`
  } else if (data.percentage < 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowDown)
    statClassName = classnames(styles.stats, styles.decrease)
    backText = `${title} decreased ${
      data.percentage
    }% today from yesterday, from ${metricSuffix(previousDayScore)} to ${metricSuffix(todayScore)}`
  }

  return {
    statClassName,
    statArrowClassName,
    selected,
    statDifference,
    backText,
    stats,
  }
}

const Front = (props) => {
  const { title, data } = props
  const {
    stats,
    statClassName,
    statArrowClassName,
    statDifferenceValue,
    selected,
    statDifference,
  } = parseData(props)

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div className={styles.frontContainer}>
          {data && data.isEmpty && (
            <div
              className={styles.noContent}
              style={{ backgroundColor: colors.moduleBackgroundOpacity }}
            >
              <p>No Data Available</p>
            </div>
          )}
          <div className={statClassName}>
            <div className={styles.content}>
              <p className={styles.headline}>{title}</p>
              <div className={styles.changes}>
                <div className={styles.circle}>
                  <i className={statArrowClassName} />
                </div>
                <p className={styles.label}>{statDifference}%</p>
              </div>
            </div>
            <CustomBarChart
              data={stats}
              selected={selected}
              difference={statDifference}
            />
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

const Back = (props) => {
  const { backText } = parseData(props)
  return <p className={styles.backText}>{backText}</p>
}

class Cards extends React.Component {
  componentDidMount() {
    this.props.getFlipCardsData()
  }

  render() {
    const {
      flipCardsData: { data, loading },
    } = this.props
    const wholeSegmentsWithOrder = ['view', 'like', 'comment', 'share']

    return (
      <div className="grid-container col-12 mt-72 mb-72">
        <div className={styles.flipWrapper}>
          {wholeSegmentsWithOrder.map((item, idx) => (
            <FlipCard
              key={`flipCard_${idx}`}
              width={282}
              height={114}
              isEmpty={data && data[item] && data[item].isEmpty}
              loading={loading}
            >
              {data && data[item] && (
                <Front
                  data={data[item]}
                  title={`${ucfirst(item)}s`}
                />
              )}
              {data && data[item] && (
                <Back
                  data={data[item]}
                  title={`${ucfirst(item)}s`}
                />
              )}
            </FlipCard>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  flipCardsData: makeSelectFlipCards(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Cards)
