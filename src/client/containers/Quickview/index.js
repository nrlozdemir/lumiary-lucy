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
import AssetLayer from 'Components/AssetLayer'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
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
        'youtube'
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
            <div className={style.navigation}>
              <div className={style.navItem}>
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
                {platformsValues && platformsValues.map((el, i) => {

                  const { cvScore, socialIcon, title, videoUrl, poster } = el.video

                  return(
                    <div key={i} className={classnames("col-6", style.cardBlock)}>
                      <div className={style.card}>
                        <h1 className={classnames(
                          { [style.rightVideoTitle]: i === 1 }
                          )}>
                          {i == 0
                            ? "Best Performing Videos"
                            : "Underperforming Videos"
                          }
                          <i className="icon icon-Information"></i>
                        </h1>
                        <div className={classnames(
                          style.assetContainer,
                          { [style.right]: i === 1 }
                          )}>
                          <AssetLayer
                            leftSocialIcon={socialIcon}
                            title={title}
                            rightValue={cvScore}
                            width={510}
                            height={286}
                          >
                            <div className={style.video}>
                              <SingleVideoCard {...el} muted={false} options={{size: "auto"}} />
                            </div>
                            <div className={style.percentageWrapper} style={{right: "80px"}}>
                              <PercentageBarGraph
                                backgroundColor="#303a5d"
                                customClass={style.libraryPercentageGraph}
                                id={`videolist-${i}`}
                                percentage={cvScore}
                                disableLabels={true}
                                color={i === 0 ? "#2fd7c4" : "#5292e5"}
                                lineCount={30}
                                height={19}
                                width={67}
                                xSmall
                              />
                            </div>
                          </AssetLayer>
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
                  )
                })}
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
