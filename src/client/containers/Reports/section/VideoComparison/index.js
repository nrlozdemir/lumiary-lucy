import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectReportsVideoComparison } from 'Reducers/reports'
import Module from 'Components/Module'
//import cx from 'classnames'
import ComparisonHorizontalBarChart from 'Components/ComparisonHorizontalBarChart'
import style from './style.scss'

class VideoComparison extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getVideoComparisonData(data)
  }
  render() {
    const {
      videoComparisonData: { data, loading, error },
		} = this.props
		let barData = data

		barData && data.map((b, i) => {
			barData[i].labels = ["", "", "", ""]
			barData[i].datasets.map((d, k) => {
				barData[i].datasets[k].backgroundColor = "#2FD7C4"
				if (i % 2 === 0) {
					barData[i].datasets[k].backgroundColor = "#5292E5"
				}
			})
		})

		console.log(barData)

    return (
      <Module
        moduleKey={'Reports/VideoComparison'}
        title="Video Format Distrubution Comparison"
        action={this.callBack}
        filters={[
          {
            type: 'timeRange',
            selectKey: 'RVC-swda',
            placeHolder: 'Date',
          },
        ]}
        legend={
          <div className={style.headerLabel}>
            <div
              className={
                'd-flex align-items-center justify-content-center ' +
                style.headerLabel
              }
            >
              <div className="d-flex align-items-center mr-32">
                <span className={style.redRound} />
                <p>Bleacher Report</p>
              </div>
              <div className="d-flex align-items-center mr-32">
                <span className={style.duskRound} />
                <p>Barstool Sports</p>
              </div>
            </div>
          </div>
        }
      >
        {data && data.length > 0 && (
          <ComparisonHorizontalBarChart data={barData} />
        )}
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  videoComparisonData: makeSelectReportsVideoComparison(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(VideoComparison)
