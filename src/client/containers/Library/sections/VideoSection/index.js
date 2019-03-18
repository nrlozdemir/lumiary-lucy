import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { actions, makeSelectLibrary } from 'Reducers/library'

import VideoCardList from 'Components/VideoCardList'
import RouterLoading from 'Components/RouterLoading'

class VideoSection extends React.Component {
  componentDidMount() {
    this.props.getVideos()
  }

  render() {
    if (!this.props.library.videos || this.props.library.loading) {
      return <RouterLoading />
    }
    return (
      <div className="mt-50 d-flex flex-grap justify-space-between">
        <VideoCardList data={this.props.library.videos} />
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