import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectFlipCards } from 'Reducers/panoptic'
import classnames from 'classnames'
import FlipCard from 'Components/FlipCard'
import PureBarChart from 'Components/Charts/Panoptic/PureBarChart'
import styles from './style.scss'

function parseData(vars){
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]

	const { stat } = vars.data
	const { title } = vars
  const selected = days[new Date().getDay()]
  const selectedPrev = days[
		(day => new Date(day.setDate(day.getDate()-1)).getDay())
		(new Date)
	]
	const statSelected = Object.values(stat).filter(
    (word) => word.label === selected
	)
	const statSelectedPrev = Object.values(stat).filter(
    (word) => word.label === selectedPrev
	)
	const todayScore = statSelected[0].score
	const previousDayScore = statSelectedPrev[0].score
  const statDifference = todayScore - previousDayScore
	const statDifferenceValue = (statDifference < 0
		? statDifference * -1
		: statDifference) + '%'

	let statArrowClassName, statClassName, backText

	if (statDifference === 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowRight)
    statClassName = classnames(styles.stats, styles.noChange)
    backText = `${title} didn't changed today from yesterday`
	} else if (statDifference > 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowUp)
    statClassName = classnames(styles.stats, styles.increase)
    backText = `${title} increased today from yesterday, from ${
			previousDayScore
		}k to ${todayScore}k`
	} else if (statDifference < 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowDown)
    statClassName = classnames(styles.stats, styles.decrease)
    backText = `${title} decreased today from yesterday, from ${
			previousDayScore
		}k to ${todayScore}k`
	}

	return {
		statClassName,
		statArrowClassName,
		statDifferenceValue,
		selected,
		statDifference,
		backText
	}
}

const Front = (props) => {
	const { title } = props
	const {
		statClassName,
		statArrowClassName,
		statDifferenceValue,
		selected,
		statDifference
	} = parseData(props)

	return (<div className={statClassName}>
		<div className={styles.content}>
			<p className={styles.headline}>{title}</p>
			<div className={styles.changes}>
				<div className={styles.circle}>
					<i className={statArrowClassName} />
				</div>
				<p className={styles.label}>{statDifferenceValue}</p>
			</div>
		</div>
		<PureBarChart
			data={props.data}
			selected={selected}
			difference={statDifference}
		/>
	</div>)
}

const Back = (props) => {
	const { backText } = parseData(props)
	return (<p className={styles.backText}>{backText}</p>)
}

class Cards extends React.Component {
  componentDidMount() {
    this.props.getFlipCardsData()
  }

  render() {
    const {
      data: { views, likes, comments, shares },
      loading,
      error,
		} = this.props.flipCardsData

    return (
      <div className="grid-container col-12">
        <div className={styles.flipWrapper}>
          <FlipCard>
						{views && <Front data={views} title="Views" />}
						{views && <Back data={views} title="Views" />}
					</FlipCard>

          <FlipCard>
						{likes && <Front data={likes} title="Likes" />}
						{likes && <Back data={likes} title="Likes" />}
					</FlipCard>

          <FlipCard>
						{comments && <Front data={comments} title="Comments" />}
						{comments && <Back data={comments} title="Comments" />}
					</FlipCard>

					<FlipCard>
						{shares && <Front data={shares} title="Shares" />}
						{shares && <Back data={shares} title="Shares" />}
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
