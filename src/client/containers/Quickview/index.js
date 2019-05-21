import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectQuickview } from 'Reducers/quickview'
import { toSlug, socialIconSelector } from 'Utils/index'
import classnames from 'classnames'
import AssetLayer from 'Components/AssetLayer'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import SingleVideoCard from 'Components/SingleVideoCard'
import ProgressBar from 'Components/ProgressBar'
import { textEdit } from 'Utils/text'
import style from './style.scss'

import { ThemeContext } from 'ThemeContext/themeContext'

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
      ],
    }
  }

  componentDidMount() {
    if (typeof this.props.match.params.platform === 'undefined') {
      this.props.getQuickviewItemsRequest('all-platforms')
    } else {
      this.props.getQuickviewItemsRequest(this.props.match.params.platform)
    }
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps
    const { match, getQuickviewItemsRequest } = this.props

    if (prevMatch.params.platform !== match.params.platform) {
      if (typeof match.params.platform === 'undefined') {
        getQuickviewItemsRequest('all-platforms')
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
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <React.Fragment>
            <div className="grid-container col-12">
              <div className="grid-collapse mt-50">
                <div className={style.navigation}>
                  <div className={style.navItem}>
                    {platforms.map((platform, index) => (
                      <NavLink
                        key={index}
                        activeStyle={{
                          background: colors.tabActiveBackground,
                        }}
                        style={{
                          background: colors.tabBackground,
                          color: colors.textColor,
                          borderColor: colors.tabBorder,
                        }}
                        to={`/quickview/${toSlug(platform)}`}
                      >
                        {index === 0 ? (
                          platform.replace('-', ' ')
                        ) : (
                          <i className={socialIconSelector(platform)} />
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
                <div
                  className={style.cardWrapper}
                  style={{
                    background: colors.moduleBackground,
                    color: colors.textColor,
                    boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
                  }}
                >
                  <div className={style.content}>
                    {platformsValues &&
                      platformsValues.map((el, i) => {
                        const {
                          cvScore,
                          socialIcon,
                          title,
                          videoUrl,
                          poster,
                        } = el.video

                        return (
                          <div
                            key={i}
                            className={classnames('col-6', style.cardBlock)}
                          >
                            <div className={style.card}>
                              <h1
                                className={classnames({
                                  [style.rightVideoTitle]: i === 1,
                                })}
                              >
                                {i == 0
                                  ? 'Best Performing Videos'
                                  : 'Underperforming Videos'}
                                <i
                                  className="icon icon-Information"
                                  style={{ color: colors.textColor }}
                                />
                              </h1>
                              <div
                                className={classnames(style.assetContainer, {
                                  [style.right]: i === 1,
                                })}
                              >
                                <AssetLayer
                                  leftSocialIcon={socialIcon}
                                  title={title}
                                  rightValue={cvScore}
                                  width={510}
                                  height={286}
                                >
                                  <div className={style.video}>
                                    <SingleVideoCard
                                      {...el}
                                      muted={false}
                                      options={{ size: 'auto' }}
                                    />
                                  </div>
                                  <div
                                    className={style.percentageWrapper}
                                    style={{ right: '80px' }}
                                  >
                                    <PercentageBarGraph
                                      key={Math.random()}
                                      percentage={cvScore}
                                      width={80}
                                      height={20}
                                      barWidth={2}
                                      barSpaceWidth={1}
                                      disableLabels
                                      color={i === 0 ? 'green' : 'blue'}
                                    />
                                  </div>
                                </AssetLayer>
                              </div>
                              <div className={style.items}>
                                {el.infos.map((item, index) => (
                                  <div
                                    key={index}
                                    className={style.itemWrapper}
                                    style={{
                                      borderColor: colors.chartStadiumBarBorder,
                                    }}
                                  >
                                    <div className={style.infoItem}>
                                      <p
                                        className={classnames(
                                          'font-secondary-second',
                                          style.sectionBadge
                                        )}
                                      >
                                        <span
                                          style={{
                                            background: colors.labelBackground,
                                            color: colors.labelColor,
                                            boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                                          }}
                                        >
                                          {item.title}
                                        </span>
                                      </p>
                                      <div
                                        className={style.itemValue}
                                        data-id={i}
                                      >
                                        {item.value}
                                      </div>
                                      <div className={style.progressText}>
                                        <span className={style.rightTitle}>
                                          {item.percentage}%
                                        </span>
                                      </div>
                                      <ProgressBar
                                        width={item.percentage}
                                        customBarClass={style.progressBar}
                                        customPercentageClass={classnames(
                                          style.percentageBlue,
                                          {
                                            [style.percentagePink]: i == 1,
                                          }
                                        )}
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
        )}
      </ThemeContext.Consumer>
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
