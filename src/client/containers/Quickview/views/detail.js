/**
 *
 * Quickview
 *
 */

import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from "classnames";
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectQuickview } from 'Reducers/quickview'
import { toSlug, socialIconSelector } from 'Utils/index'
import SingleVideoCard from 'Components/SingleVideoCard'
import ProgressBar from 'Components/ProgressBar'
import style from './../style.scss'

export class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedQuickviewId: null,
      platforms: [
        'all platforms',
        'facebook',
        'instagram',
        'twitter',
        'youtube',
        'pinterest',
      ],
    }
  }

  componentDidMount() {
    this.setState({ selectedQuickviewId: this.props.match.params.id })
    this.props.getQuickviewPlatformSelectedRequest(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps
    const { match, getQuickviewPlatformSelectedRequest } = this.props

    if (prevMatch.params.id !== match.params.id) {
      this.setState({ selectedQuickviewId: match.params.id })
      getQuickviewPlatformSelectedRequest(match.params.id)
    }
  }

  render() {
    const { platforms, selectedQuickviewId } = this.state
    const {
      quickview: {
        selectedPlatform: { id, platformsValues },
      },
		} = this.props

		console.log(platformsValues);
    return (
      <React.Fragment>
        <div className="grid-container">
          <div className="grid-collapse mt-50">
            <div className={style.bar}>
              <div className={style.barList}>
                {platforms.map((platform, index) => (
                  <NavLink
                    key={index}
                    activeClassName={style.active}
                    to={`/quickview/${selectedQuickviewId}/${toSlug(platform)}`}
                  >
										{index === 0 ? (platform) : (<i className={socialIconSelector(platform)}></i>)}
                  </NavLink>
                ))}
              </div>
            </div>
						<div className={style.cardWrapper}>
							<div className={style.content}>
								{platformsValues.map((el, i) => (
									<div key={i} className={classnames("col-6", style.cardBlock)}>
										<div className={style.card}>
											<div className={style.video}>
												<SingleVideoCard {...el.video} muted={false} />
											</div>
											<div className={style.items}>
												{el.infos.map((item, index) => (
													<div className={style.itemWrapper}>
														<div key={index} className={style.infoItem}>
															<p className={classnames('font-secondary-second', style.sectionBadge)}>
																<span>{item.title}</span>
															</p>
															<div className={style.itemValue}>{item.value}</div>
															<ProgressBar
																width="25"
																customBarClass={style.progressBar}
																customPercentageClass={style.percentageBlue}
															/>
															<p className={style.infoText}>
																%40 of best performing industry videos area 0:25 sec in length
															</p>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Detail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  quickview: makeSelectQuickview(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Detail)
