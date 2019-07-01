import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { actions, makeSelectQuickview } from 'Reducers/quickview'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'
import { toSlug, socialIconSelector, selectFiltersToType } from 'Utils'
import cx from 'classnames'
import AssetLayer from 'Components/AssetLayer'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import SingleVideoCard from 'Components/SingleVideoCard'
import ProgressBar from 'Components/ProgressBar'
import { textEdit } from 'Utils/text'
import ModuleSelectFilters from 'Components/ModuleSelectFilters'
import { isEqual } from 'lodash'
import style from './style.scss'
import RouterLoading from 'Components/RouterLoading'
import ToolTip from 'Components/ToolTip'

import { ThemeContext } from 'ThemeContext/themeContext'

const moduleKey = 'Quickview'

export class Main extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      platforms: [
        {
          name: 'facebook',
          filter: {
            type: 'metric',
            selectKey: 'QV-facebook-metric',
            placeHolder: 'Facebook',
          },
        },
        { 
          name: 'instagram',
          filter: {
            type: 'metric',
            selectKey: 'QV-instagram-metric',
            placeHolder: 'Instagram',
          },
        },
        { 
          name: 'twitter',
          filter: {
            type: 'metric',
            selectKey: 'QV-twitter-metric',
            placeHolder: 'Twitter',
          },
        },
        { 
          name: 'youtube',
          filter: {
            type: 'metric',
            selectKey: 'QV-youtube-metric',
            placeHolder: 'YouTube',
          },
        },
      ],
    }
  }

  componentDidUpdate(prevProps) {
    const { selectFilters: prevSelectFilters } = prevProps
    const { getQuickviewItemsRequest, selectFilters } = this.props

    if (
      !!prevSelectFilters &&
      !!selectFilters &&
      !isEqual(
        prevSelectFilters.values[moduleKey],
        selectFilters.values[moduleKey]
      )
    ) {
      const selectFilterValues = selectFilters.values[moduleKey]

      const valuesToType = selectFiltersToType(selectFilterValues)

      this.handleFilterChange(valuesToType)
    }
  }

  handleFilterChange = (data, platform = 'facebook') => {
    const { match, getQuickviewItemsRequest } = this.props
    const selectedMetric = match.params.metric || 'views'
    const selectedDateRange = match.params.dateRange || 'week'

    getQuickviewItemsRequest({
      platform: match.params.platform || 'facebook',
      data: {
        metric: selectedMetric,
        dateRange: selectedDateRange
      }
    })
  }

  render() {
    const { platforms } = this.state
    const {
      match,
      quickview: {
        loading = false,
        selectedPlatform: { platformsValues, differencesValues },
      },
      push,
      infoText,
    } = this.props

    const selectedPlatform = match.params.platform || 'facebook'
    const selectedMetric = match.params.metric || 'views'
    const selectedDateRange = match.params.dateRange || 'week'

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <React.Fragment>
            <div className="grid-container col-12">
              <div className="grid-collapse mt-50">
                <div className={style.navigation}>
                  <div className={style.navItem}>
                    {platforms.map((platform, idx) => {
                      const isSelected = selectedPlatform === platform.name
                      return !!platform.filter && isSelected || true ? (
                        <div
                          key={idx}
                          className={cx(
                            style.navItem_btn,
                            {
                              [style.selected]: isSelected
                            },
                            {
                              [colors.themeType === 'dark'
                              ? style.dark
                              : style.light]: true
                            }
                          )}
                          
                          // style={{
                          //   background: isSelected
                          //     ? colors.tabActiveBackground
                          //     : colors.tabBackground,
                          //   color: colors.textColor,
                          //   borderColor: colors.tabBorder,
                          // }}
                        >
                          <i
                            className={cx(
                              socialIconSelector(platform.name),
                              style.activeIcon
                            )}
                          />
                          <ModuleSelectFilters
                            isActive={isSelected}
                            type={platform.filter.type}
                            moduleKey={moduleKey}
                            selectKey={platform.filter.selectKey}
                            placeHolder={platform.filter.placeHolder}
                            defaultValue={selectedMetric}
                            onChange={(options = {}) => {
                              const { value } = options

                              if(value){
                                push(`/quickview/${toSlug(platform.name)}/${value}/${selectedDateRange}`)
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <NavLink
                          key={idx}
                          className={style.navItem_btn}
                          activeStyle={{
                            background: colors.tabActiveBackground,
                          }}
                          // style={{
                          //   background: colors.tabBackground,
                          //   color: colors.textColor,
                          //   borderColor: colors.tabBorder,
                          // }}
                          to={`/quickview/${toSlug(platform.name)}`}
                        >
                          <i className={socialIconSelector(platform.name)} />
                        </NavLink>
                      )
                    })}
                    <div
                      className={cx(
                        style.navItem_btn,
                        {
                          [colors.themeType === style.dark
                          ? style.dark
                          : style.light]: true
                        }
                      )}
                      
                      // style={{
                      //   background: colors.tabBackground,
                      //   color: colors.textColor,
                      //   borderColor: colors.tabBorder,
                      // }}
                    >
                      <ModuleSelectFilters
                        type={'dateRange'}
                        moduleKey={moduleKey}
                        selectKey={'QV-date'}
                        placeHolder={'Date'}
                        defaultValue={selectedDateRange}
                        onChange={(options = {}) => {
                          const { value } = options

                          if(value){
                            push(`/quickview/${selectedPlatform}/${selectedMetric}/${value}`)
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={cx(
                    style.cardWrapper,
                    {
                      [colors.themeType === 'dark'
                      ? style.dark
                      : style.light]: true
                    }
                  )}
                  // style={{
                  //   background: colors.moduleBackground,
                  //   color: colors.textColor,
                  //   boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
                  // }}
                >
                  {
                    (loading)
                      ? (<RouterLoading />)
                      : (
                        <div
                          className={style.content}
                          // style={{ background: colors.bodyBackground }}
                        >
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
                                  className={style.cardBlock}
                                  // style={{
                                  //   background:
                                  //     i === 1
                                  //       ? colors.tabActiveBackground
                                  //       : colors.moduleBackground,
                                  // }}
                                >
                                  {/* HEADER */}
                                  <div className={style.card}>
                                    <h1>
                                      {i == 0
                                        ? 'Underperforming Videos'
                                        : 'Over Performing Videos'}
                                      {infoText && <i
                                        className={cx('icon icon-Information', style.moduleInfo)}
                                        onMouseEnter={() => changeInfoStatus()}
                                        onMouseLeave={() => changeInfoStatus()}
                                        style={{ color: themes.textColor }}
                                      >
                                        <ToolTip show={infoShow}>
                                          {infoText}
                                        </ToolTip>
                                      </i>}
                                    </h1>
                                    {/* VIDEO */}
                                    <div className={style.assetContainer}>
                                      <AssetLayer
                                        leftSocialIcon={socialIcon}
                                        title={title.substring(0, 32)}
                                        rightValue={cvScore}
                                        width={'100%'}
                                        height={286}
                                      >
                                        <div className={style.video}>
                                          <SingleVideoCard
                                            {...el}
                                            muted={false}
                                            options={{ size: 'auto' }}
                                          />
                                        </div>
                                        <div className={style.percentageWrapper}>
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
                                    {/* PROPERTY VALUES */}
                                    <div className={style.items}>
                                      {el.infos.map((item, index) => {
                                        const hasDifference =
                                          ['duration', 'pacing'].indexOf(
                                            item.title.toLowerCase()
                                          ) !== -1

                                        const difference = (!hasDifference) ? false : differencesValues[item.slug] || 'N/A'
                                        const noData = !item.value

                                        return (
                                          <div
                                            key={`info_${i}-${index}`}
                                            className={cx(
                                              style.itemWrapper,
                                            )}
                                            // style={{
                                            //   borderColor:
                                            //     i === 0
                                            //       ? colors.chartStadiumBarBorder
                                            //       : colors.bodyBackground,
                                            // }}
                                          >
                                            {noData && <p className={style.noData}>No Data Available</p>}
                                            <div 
                                              className={cx(
                                                style.infoItem,
                                                {
                                                  [style.noDataWrapper]: noData
                                                }
                                              )}
                                              // style={{
                                              //   opacity: (noData) ? 0.1 : 1,
                                              // }}
                                            >
                                              {difference && i === 1 && false && (
                                                <div
                                                  className={
                                                    style.infoItem_diffBubble
                                                  }
                                                  // style={{
                                                  //   borderColor:
                                                  //     colors.tabActiveBackground,
                                                  //   background: colors.bodyBackground,
                                                  //   color: colors.labelColor
                                                  // }}
                                                >
                                                  <span>{difference}%</span>
                                                  <span>Difference</span>
                                                </div>
                                              )}
                                              <p
                                                className={cx(
                                                  'font-secondary-second',
                                                  style.sectionBadge
                                                )}
                                              >
                                                <span
                                                  // style={{
                                                  //   background:
                                                  //     i === 0
                                                  //       ? colors.labelBackground
                                                  //       : colors.bodyBackground,
                                                  //   color: colors.labelColor,
                                                  //   boxShadow: `0 1px 2px 0 ${
                                                  //     colors.labelShadow
                                                  //   }`,
                                                  // }}
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
                                                customBarClass={cx(
                                                  style.progressBar,
                                                  {
                                                    [style[
                                                      `progressBar--${
                                                        colors.themeType === 'dark'
                                                          ? 'dark'
                                                          : 'light'
                                                      }`
                                                    ]]: i === 1,
                                                  }
                                                )}
                                                customPercentageClass={cx(
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
                                        )
                                      })}
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      )
                  }
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
  selectFilters: makeSelectSelectFilters(),
  quickview: makeSelectQuickview(),
})

const mapDispatchToProps = (dispatch) => {
  return {
    push: (url) => dispatch(push(url)),
    ...bindActionCreators(actions, dispatch),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Main)
