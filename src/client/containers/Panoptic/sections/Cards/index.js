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
import ToolTip from 'Components/ToolTip'

const getWeekDays = (locale) => {
  let days = []
  let currentDate = new Date()

  for (let i = 0; i < 7; i++) {
    days.push(
      currentDate.toLocaleDateString(locale, {
        weekday: 'long',
      })
    )
    currentDate.setDate(currentDate.getDate() - 1)
  }
  return days
}

const days = getWeekDays('en-US').reverse()

function parseData(props) {
  const { data, title, originalData } = props
  const stats = data.data.map((el, i) => ({ label: days[i], score: el }))
  const selected = days[days.length - 1]
  // const selectedPrev = days[days.length - 2]
  // const statSelected = Object.values(stats).filter(
  //   (day) => stats && day.label === selected
  // )
  // const statSelectedPrev = Object.values(stats).filter(
  //   (day) => stats && day.label === selectedPrev
  // )
  // const todayScore = statSelected[0].score
  // const previousDayScore = statSelectedPrev[0].score
  // const statDifference = data.percentage

  let statArrowClassName, statClassName, tooltipText

  if (data.percentage == 0) {
    const titleLowerCase = title.charAt(0).toLowerCase() + title.slice(1)
    statArrowClassName = classnames(styles.arrow, styles.arrowRight)
    statClassName = classnames(styles.stats, styles.noChange)
    tooltipText = `No change in ${titleLowerCase} in the last 24 hours`
  } else {
    const changeWording = statDifference > 0 ? 'increased' : 'decreased'
    const arrowStyle = statDifference > 0 ? styles.arrowUp : styles.arrowDown
    const statStyle = statDifference > 0 ? styles.increase : styles.decrease
    const formattedPercent = parseInt(statDifference)
      .toFixed(1)
      .toLocaleString()

    statArrowClassName = classnames(styles.arrow, arrowStyle)
    statClassName = classnames(styles.stats, statStyle)
    tooltipText = `${title} ${changeWording} ${formattedPercent}% from yesterday`
  }

  return {
    statClassName,
    statArrowClassName,
    selected,
    statDifference,
    tooltipText,
    stats,
  }
}

const Front = (props) => {
  const { title, data, originalData = {}, metric = '' } = props
  const {
    stats,
    statClassName,
    statArrowClassName,
    selected,
    statDifference,
    tooltipText,
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
              <div className={styles.headline}>
                <span>{title}</span>
                <React.Fragment>
                  <i
                    className={classnames(
                      'icon icon-Information',
                      styles.moduleInfo
                    )}
                    data-tip={tooltipText}
                    data-for={`panoptic-flipcards-${title}`}
                  />
                  <ToolTip
                    effect="solid"
                    smallTooltip
                    id={`panoptic-flipcards-${title}`}
                  />
                </React.Fragment>
              </div>
              <div className={styles.changes}>
                <div className={styles.circle}>
                  <i className={statArrowClassName} />
                </div>
                <p className={styles.label}>
                  {`${statDifference < 0 ? '-' : ''}${metricSuffix(
                    Math.abs(statDifference)
                  )}`}
                  %
                </p>
              </div>
            </div>
            <CustomBarChart
              metric={metric}
              originalData={originalData}
              data={stats}
              selected={selected}
              difference={statDifference}
              text={tooltipText}
            />
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

class Cards extends React.Component {
  componentDidMount() {
    this.props.getFlipCardsData()
  }

  render() {
    const {
      flipCardsData: { data, loading, originalData = {} },
    } = this.props

    const wholeSegmentsWithOrder = ['view', 'like', 'comment', 'share']

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div className="grid-container col-12 mt-72 mb-72">
            <div className={styles.flipWrapper}>
              {wholeSegmentsWithOrder.map((item, idx) => (
                <FlipCard
                  noflip
                  key={`flipCard_${idx}`}
                  width={282}
                  height={114}
                  isEmpty={data && data[item] && data[item].isEmpty}
                  loading={loading}
                >
                  {!loading &&
                    (data && data[item] ? (
                      <Front
                        metric={item}
                        originalData={originalData[item]}
                        data={data[item]}
                        title={`${ucfirst(item)}s`}
                      />
                    ) : (
                      <div
                        className={styles.noContent}
                        style={{
                          backgroundColor: colors.moduleBackgroundOpacity,
                        }}
                      >
                        <p>No Data Available</p>
                      </div>
                    ))}
                  <div />
                </FlipCard>
              ))}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
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
