/**
 *
 * Quickview
 *
 */

import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectQuickview } from 'Reducers/quickview'
import { toSlug } from 'Utils/index'
import VideoCard from 'Components/VideoCard'
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
    console.log(this.props)
    return (
      <React.Fragment>
        <div className="grid-container col-12">
          <div className="grid-collapse mt-50">
            <div className={style.bar}>
              <Link className={style.back} to="/quickview">
                <i className="icon-Left-Arrow-Circle" /> Overview
              </Link>
              <div className={style.barList}>
                {platforms.map((platform, index) => (
                  <NavLink
                    key={index}
                    activeClassName={style.active}
                    to={`/quickview/${selectedQuickviewId}/${toSlug(platform)}`}
                  >
                    {platform}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className={style.content}>
              {platformsValues.map((el, i) => (
                <div key={i} className="col-6">
                  <div className={style.card}>
                    <VideoCard {...el.video} />
                    <div className={style.items}>
                      {el.infos.map((item, index) => (
                        <div key={index} className={style.infoItem}>
                          <div>{item.title}</div>
                          <div>{item.value}</div>
                          {item.difference && (
                            <div className={style.differenceCircle}>
                              <div>
                                <div>{item.difference}%</div>
                                Difference
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
