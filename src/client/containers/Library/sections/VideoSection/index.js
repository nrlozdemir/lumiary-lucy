import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectAuthProfile } from 'Reducers/auth'
import { actions, makeSelectLibrary } from 'Reducers/library'
import VideoCardList from 'Components/VideoCardList'
import { ThemeContext } from 'ThemeContext/themeContext'
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
      library: { data, loading },
    } = this.props

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div className={style.videoContainer}>
            <VideoCardList data={data.videos} brandId={brand.uuid} />
            {!loading && !data.videos.length && (
              <div
                className={style.videoContainer_noContent}
                style={{ color: colors.textColor }}
              >
                No Data Available
              </div>
            )}
          </div>
        )}
      </ThemeContext.Consumer>
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
