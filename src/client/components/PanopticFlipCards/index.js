import React from 'react'
import classnames from 'classnames'
import styles from './style.scss'
import PureBarChart from 'Components/Charts/Panoptic/PureBarChart'

const PanopticFlipCards = (props) => {
  const { stat } = props.data
  const selected = props.selected
  const selectedPrev = props.selectedPrev
  const statSelected = Object.values(stat).filter(
    (word) => word.label === selected
  )
  const statSelectedPrev = Object.values(stat).filter(
    (word) => word.label === selectedPrev
  )
  const statDifference = statSelected[0].score - statSelectedPrev[0].score
  const statDifferenceValue =
    (statDifference < 0 ? statDifference * -1 : statDifference) + '%'

  let statArrowClassName, statClassName, backText
  if (statDifference === 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowRight)
    statClassName = classnames(styles.stats, styles.noChange)
    backText = `${props.title} didn't changed today from yesterday`
  } else if (statDifference > 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowUp)
    statClassName = classnames(styles.stats, styles.increase)
    backText = `${props.title} increased today from yesterday, from ${
      statSelectedPrev[0].score
    }k to ${statSelected[0].score}k`
  } else if (statDifference < 0) {
    statArrowClassName = classnames(styles.arrow, styles.arrowDown)
    statClassName = classnames(styles.stats, styles.decrease)
    backText = `${props.title} decreased today from yesterday, from ${
      statSelectedPrev[0].score
    }k to ${statSelected[0].score}k`
  }

  return (
    <div className={classnames(styles.flipContainer, 'col-3 ml-0')}>
      <div className={styles.flipper}>
        <div className={styles.front}>
          <div className={statClassName}>
            <div className={styles.content}>
              <p className={styles.headline}>{props.title}</p>
              <div className={styles.changes}>
                <div className={styles.circle}>
                  <i className={statArrowClassName} />
                </div>
                <p className={styles.label}>{statDifferenceValue}</p>
              </div>
            </div>
            <div className={styles.bars}>
              <PureBarChart
                data={props.data}
                selected={props.selected}
                barStyle={styles.barStyle}
                barSelectedStyle={styles.barSelectedStyle}
              />
            </div>
          </div>
        </div>
        <div className={styles.back}>
          <p className={styles.text}>{backText}</p>
        </div>
      </div>
    </div>
  )
}

export default PanopticFlipCards
