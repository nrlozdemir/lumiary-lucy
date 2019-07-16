import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectAuthProfile } from 'Reducers/auth'
import { actions, makeSelectLibrary } from 'Reducers/library'
import VideoCardList from 'Components/VideoCardList'
import style from '../../style.scss'

class VideoSection extends React.Component {
  componentDidMount() {
    const {
      library: { data },
      getVideos,
    } = this.props
    
    if (!!data && !!data.videos && !data.videos.length) {
      getVideos()
    }
  }

  render() {
    const {
      profile: { brand },
      library: { data },
    } = this.props

    return (
      <div className={style.videoContainer}>
        <VideoCardList data={data.videos} brandId={brand.uuid} />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
  profile: makeSelectAuthProfile(),
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
