import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectFlipCards } from 'Reducers/panoptic'
import FlipCard from 'Components/PanopticFlipCards'
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
const selected = days[new Date().getDay()]
const selectedPrev = days[new Date().getDay() - 1]

class PanopticFlipCards extends React.Component {
  componentDidMount() {
    this.props.getFlipCardsData()
  }

  render() {
    console.log('###', this.props.flipCardsData)
    const {
      data: { views, likes, comments, shares },
      loading,
      error,
    } = this.props.flipCardsData
    return (
      <div className="col-12-gutter-20">
        <div className={styles.flipWrapper}>
          {views && (
            <FlipCard
              title="Views"
              data={views}
              selected={selected}
              selectedPrev={selectedPrev}
            />
          )}
          {likes && (
            <FlipCard
              title="Likes"
              data={likes}
              selected={selected}
              selectedPrev={selectedPrev}
            />
          )}
          {comments && (
            <FlipCard
              title="Comments"
              data={comments}
              selected={selected}
              selectedPrev={selectedPrev}
            />
          )}
          {shares && (
            <FlipCard
              title="Shares"
              data={shares}
              selected={selected}
              selectedPrev={selectedPrev}
            />
          )}
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

export default compose(withConnect)(PanopticFlipCards)
