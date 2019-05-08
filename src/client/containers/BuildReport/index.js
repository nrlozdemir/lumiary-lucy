import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { makeSelectLibraryDetail } from 'Reducers/libraryDetail'
import { Link, Redirect } from 'react-router-dom'
import SvgLoading from 'Components/SvgLoading'
import style from './style.scss'

/* eslint-disable react/prefer-stateless-function */
export class BuildReport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 0,
      timerRef: null,
    }
  }

  componentDidMount() {
    const {
      match: {
        params: { videoId },
      },
    } = this.props
    const { percentage } = this.state
    if (percentage < 100) {
      const timerRef = setInterval(() => {
        this.setState((prevState) => {
          return { percentage: prevState.percentage + 5 }
        })
      }, 0.5)
      this.setState({
        timerRef,
      })
    }
  }

  render() {
    const { percentage, timerRef } = this.state
    const {
      match: {
        params: { videoId },
      },
    } = this.props
    if (percentage > 99) {
      clearInterval(timerRef)
      return <Redirect to={`/library/${videoId}`} />
    }

    return (
      <div className={style.wrapper}>
        <img
          src="https://picsum.photos/588/360?image=20"
          className={style.videoImg}
        />
        <div className={style.overlay + ' bg-dark-five'} />
        <div className={style.buildInfo}>
          <span className={style.buildInfoHeader}>Building Report</span>
          <SvgLoading r={16} R={170} pointCount={15} percentage={percentage} />
          <div className={style.backlink}>
            <Link to={`/library`}>Cancel</Link>
          </div>
        </div>
      </div>
    )
  }
}

BuildReport.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  libraryDetail: makeSelectLibraryDetail(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(BuildReport)
