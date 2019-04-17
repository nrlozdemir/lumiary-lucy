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

  replaceBoldElement(text) {
    const regex = new RegExp(/<b>(.*?)<\/b>/g)

    if( ! regex.test(text)){
      return text
    }

    const matched = text.match(regex)

    const values = matched.map(val => val.replace(/<\/?b>/g, ''))
    if ( ! values.length){
      return text
    }

    return (<React.Fragment>
      {text.split(regex).reduce((prev, current, i) => {
        if( ! i) {
          return [current]
        }
        return prev.concat(
          values.includes(current)
          ? <strong key={i + current}>{current}</strong>
          : current
        );
      }, [])}
    </React.Fragment>)
  }

  textEdit(text, item) {
    text = text.replace('{value}', item.value)
    text = text.replace('{title}', item.title)
    text = text.replace('{percentage}', item.percentage)
    text = this.replaceBoldElement(text)

    return text
  }

  render() {
    const { platforms, selectedQuickviewId } = this.state
    const {
      quickview: {
        selectedPlatform: { id, platformsValues },
      },
    } = this.props

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
                                {this.textEdit(item.text, item)}
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

export default compose(withConnect)(Detail)
