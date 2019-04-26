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
import { textEdit } from 'Utils/text'
import style from './style.scss'

export class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      platforms: [
        'all-platforms',
        'facebook',
        'instagram',
        'twitter',
        'youtube',
        'pinterest',
      ],
    }
  }

  componentDidMount() {
    if(typeof this.props.match.params.platform === "undefined") {
      this.props.getQuickviewItemsRequest("all-platforms")
    } else {
      this.props.getQuickviewItemsRequest(this.props.match.params.platform)
    }
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps
    const { match, getQuickviewItemsRequest } = this.props

    if (prevMatch.params.platform !== match.params.platform) {
      if(typeof match.params.platform === "undefined") {
        getQuickviewItemsRequest("all-platforms")
      } else {
        getQuickviewItemsRequest(match.params.platform)
      }
    }
  }

  render() {
    const { platforms } = this.state
    const {
      quickview: {
        selectedPlatform: { platformsValues },
      },
    } = this.props

    return (
      <React.Fragment>
        <div className="grid-container col-12">
          <div className="grid-collapse mt-50">
            <div className={style.bar}>
              <div className={style.barList}>
                {platforms.map((platform, index) => (
                  <NavLink
                    key={index}
                    activeClassName={style.active}
                    to={`/quickview/${toSlug(platform)}`}
                  >
                    {index === 0
                    ? (platform.replace('-', ' '))
                    : (<i className={socialIconSelector(platform)}></i>)}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className={style.cardWrapper}>
              <div className={style.content}>
                {platformsValues.map((el, i) => (
                  <div key={i} className={classnames("col-6", style.cardBlock)}>
                    <div className={style.card}>
                      <h1>
                        {i == 0
                          ? "Best Performing Videos"
                          : "Underperforming Videos"
                        }
                        <i className="icon icon-Information"></i>
                      </h1>

                      <div className={style.video}>
                        <SingleVideoCard {...el.video} muted={false} />
                      </div>
                      <div className={style.items}>
                        {el.infos.map((item, index) => (
                          <div key={index} className={style.itemWrapper}>
                            <div className={style.infoItem}>
                              <p className={classnames('font-secondary-second', style.sectionBadge)}>
                                <span>{item.title}</span>
                              </p>
                              <div className={style.itemValue} data-id={i}>{item.value}</div>
                              <div className={style.progressText}>
                                <span className={style.rightTitle}>{item.percentage}%</span>
                              </div>
                              <ProgressBar
                                width={item.percentage}
                                customBarClass={style.progressBar}
                                customPercentageClass={classnames(style.percentageBlue, {
                                  [style.percentagePink]: (i == 1)
                                })}
                              />
                              <p className={style.infoText}>
                                {textEdit(item.text, item)}
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

Main.propTypes = {
  //dispatch: PropTypes.func.isRequired,
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

export default compose(withConnect)(Main)
