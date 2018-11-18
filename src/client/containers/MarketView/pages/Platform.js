import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'Reducers/home'
import { actions as marketActions } from 'Reducers/marketview'
import SubNav from '../views/subNav'
import cx from 'classnames'
import style from '../styles.scss'
import LineChart from "./../../../components/Charts/LineChart";
import Card from "../../../components/Card";
import VideoTabs from "../../Library/Sections/videoTabs";
import ColorTone from "../../Library/Sections/colorTone";
import AgeRangeAndGender from "../../Library/Sections/ageRangeAndGender";
// import PropTypes from 'prop-types'

class Platform extends Component {
  render() {
    return (
      <div className={cx(style.marketView, style.platform)}>
        <SubNav/>

        <div className={style.container}>

					<div className="col-12 mt-10 pb-10">
						<div className="mb-25">
							<LineChart height="40px" />
						</div>

						<Card
							title="Lumiere Data"
							customHeaderClass="bg-charcoal-grey border-bt-dark color-white"
							customBodyClass="bg-charcoal-grey color-white"
						>
							<div className="col-12 mt-25">
								<VideoTabs />
							</div>
							<div className="col-12 mt-25">
								<div className="containerMargin">
									<ColorTone />
								</div>
							</div>
							<div className="col-12 mt-25 mb-25">
								<div className="containerMargin">
									<AgeRangeAndGender />
								</div>
							</div>
						</Card>
					</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(Object.assign({}, actions, marketActions), dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Platform)
