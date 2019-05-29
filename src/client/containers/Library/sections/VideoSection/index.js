import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { actions, makeSelectLibrary } from 'Reducers/library'
import VideoCardList from 'Components/VideoCardList'
import RouterLoading from 'Components/RouterLoading'
import style from '../../style.scss'

class VideoSection extends React.Component {
  componentDidMount() {
    if (this.props.library.data.videos.length == 0) {
      this.props.getVideos()
    }
  }

  render() {
    if (!this.props.library.data || this.props.library.loading) {
      return <RouterLoading />
    }
    return (
      <div className={style.videoContainer}>
        <VideoCardList data={this.props.library.data.videos} />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
})

function mapDispatchToProps(dispatch) {
  return {
    getVideos: () => dispatch(actions.loadVideos()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(VideoSection)
