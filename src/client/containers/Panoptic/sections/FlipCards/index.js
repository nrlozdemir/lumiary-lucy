import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectFlipCards  } from 'Reducers/panoptic'
import FlipCard from 'Components/PanopticFlipCards'
import styles from './style.scss'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const selected = days[new Date().getDay()]
const selectedPrev = days[new Date().getDay() - 1]

class PanopticFlipCards extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      "views": {
        "bar": {
          "width": 8,
          "maxHeight": 36,
          "labelCharLength": 1,
          "zeroFill": 1
        },
        "stat": [
          {
            "score": 20,
            "label": "Sunday"
          },
          {
            "score": 50,
            "label": "Monday"
          },
          {
            "score": 80,
            "label": "Tuesday"
          },
          {
            "score": 40,
            "label": "Wednesday"
          },
          {
            "score": 70,
            "label": "Thursday"
          },
          {
            "score": 50,
            "label": "Friday"
          },
          {
            "score": 30,
            "label": "Saturday"
          },
        ]
      },
      "likes": {
        "bar": {
          "width": 8,
          "maxHeight": 36,
          "labelCharLength": 1,
          "zeroFill": 1
        },
        "stat": [
          {
            "score": 80,
            "label": "Sunday"
          },
          {
            "score": 60,
            "label": "Monday"
          },
          {
            "score": 50,
            "label": "Tuesday"
          },
          {
            "score": 26,
            "label": "Wednesday"
          },
          {
            "score": 60,
            "label": "Thursday"
          },
          {
            "score": 48,
            "label": "Friday"
          },
          {
            "score": 54,
            "label": "Saturday"
          },
        ]
      },
      "comments": {
        "bar": {
          "width": 8,
          "maxHeight": 36,
          "labelCharLength": 1,
          "zeroFill": 1
        },
        "stat": [
          {
            "score": 24,
            "label": "Sunday"
          },
          {
            "score": 48,
            "label": "Monday"
          },
          {
            "score": 60,
            "label": "Tuesday"
          },
          {
            "score": 74,
            "label": "Wednesday"
          },
          {
            "score": 26,
            "label": "Thursday"
          },
          {
            "score": 48,
            "label": "Friday"
          },
          {
            "score": 54,
            "label": "Saturday"
          },
        ]
      },
      "shares": {
        "bar": {
          "width": 8,
          "maxHeight": 36,
          "labelCharLength": 1,
          "zeroFill": 1
        },
        "stat": [
          {
            "score": 40,
            "label": "Sunday"
          },
          {
            "score": 10,
            "label": "Monday"
          },
          {
            "score": 20,
            "label": "Tuesday"
          },
          {
            "score": 40,
            "label": "Wednesday"
          },
          {
            "score": 60,
            "label": "Thursday"
          },
          {
            "score": 80,
            "label": "Friday"
          },
          {
            "score": 100,
            "label": "Saturday"
          },
        ]
      }
    }
	}

	render() {

		console.log("***");
		console.log(this.props);

		return (
			<div className="col-12-gutter-20">
				<div className={styles.flipWrapper}>
					<FlipCard
						title="Views"
						data={this.state.views}
						selected={selected}
						selectedPrev={selectedPrev}
					/>
					<FlipCard
						title="Likes"
						data={this.state.likes}
						selected={selected}
						selectedPrev={selectedPrev}
					/>
					<FlipCard
						title="Comments"
						data={this.state.comments}
						selected={selected}
						selectedPrev={selectedPrev}
					/>
					<FlipCard
						title="Shares"
						data={this.state.shares}
						selected={selected}
						selectedPrev={selectedPrev}
					/>
				</div>
			</div>
		);
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
