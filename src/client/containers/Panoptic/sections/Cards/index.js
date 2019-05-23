import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectFlipCards } from 'Reducers/panoptic'
import classnames from 'classnames'
import FlipCard from 'Components/FlipCard'
import CustomBarChart from 'Components/Charts/CustomBarChart'
import styles from './style.scss'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

function appendDays(data) {
  let extendScores = []
  data.map((el, i) => {
    extendScores.push({ label: days[i], score: el })
  })
  return extendScores
}

function parseData(props) {
  const { data, title } = props
  const stats = appendDays(data)
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
  const statDifference = todayScore - previousDayScore
  const statDifferenceValue =
    (statDifference < 0 ? statDifference * -1 : statDifference) + '%'

  let statArrowClassName, statClassName, backText

  if (statDifference === 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowRight)
    statClassName = classnames(styles.stats, styles.noChange)
    backText = `${title} didn't changed today from yesterday`
  } else if (statDifference > 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowUp)
    statClassName = classnames(styles.stats, styles.increase)

    const percentage = Math.round(
      ((todayScore - previousDayScore) / previousDayScore) * 100
    )
    backText = `${title} increased ${percentage}% today from yesterday, from ${previousDayScore}k to ${todayScore}k`
  } else if (statDifference < 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowDown)
    statClassName = classnames(styles.stats, styles.decrease)

    const percentage = Math.round(
      ((previousDayScore - todayScore) / previousDayScore) * 100
    )
    backText = `${title} decreased ${percentage}% today from yesterday, from ${previousDayScore}k to ${todayScore}k`
  }

  return {
    statClassName,
    statArrowClassName,
    statDifferenceValue,
    selected,
    statDifference,
    backText,
  }
}

const Front = (props) => {
  const { title, data } = props
  const stats = appendDays(data.data)
  console.log(props)
  return (
    <div className={statClassName}>
      <div className={styles.content}>
        <p className={styles.headline}>{title}</p>
        <div className={styles.changes}>
          <div className={styles.circle}>
            <i className={statArrowClassName} />
          </div>
          <p className={styles.label}>{statDifferenceValue}</p>
        </div>
      </div>
      <CustomBarChart
        data={stats}
        selected={selected}
        difference={statDifference}
      />
    </div>
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
      flipCardsData: {
        data: { view, like, comment, share },
      },
      loading,
      error,
    } = this.props
    return (
      <div className="grid-container col-12 mt-72 mb-72">
        <div className={styles.flipWrapper}>
          <FlipCard width={282} height={114}>
            {view && <Front data={view} title="Views" />}
            {view && <Back data={view} title="Views" />}
          </FlipCard>

          <FlipCard width={282} height={114}>
            {like && <Front data={like} title="Likes" />}
            {like && <Back data={like} title="Likes" />}
          </FlipCard>

          <FlipCard width={282} height={114}>
            {comment && <Front data={comment} title="Comments" />}
            {comment && <Back data={comment} title="Comments" />}
          </FlipCard>

          <FlipCard width={282} height={114}>
            {share && <Front data={share} title="Shares" />}
            {share && <Back data={share} title="Shares" />}
          </FlipCard>
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
