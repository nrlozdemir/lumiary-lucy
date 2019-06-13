import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions, makeSelectLibrary } from 'Reducers/library'
import LibraryHeader from './sections/LibraryHeader'
import Sidebar from './sidebar.js'
import VideoSection from './sections/VideoSection'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import Button from 'Components/Form/Button'

/* eslint-disable react/prefer-stateless-function */
export class Library extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarVisible: false,
      fixedHeader: true,
    }
  }

  setSidebarVisible(e) {
    this.setState({ sidebarVisible: e })
  }

  loadMoreVideo = () => {
    const {
      getVideos,
      library: {
        data: {
          pagination: { page },
        },
      },
    } = this.props
    getVideos({ page: parseInt(page) + 1 })
  }

  handleSubmit(e) {
    const {
      changeFilter,
      library: { filters },
    } = this.props
    changeFilter({
      ...e,
      ...(filters && filters.Search ? { Search: filters.Search } : {}),
    })
  }

  render() {
    const sideBarClass = classNames(style.overlay, {
      [style.overlayShow]: this.state.sidebarVisible,
    })
    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <React.Fragment>
            <div className="grid-container col-12">
              <LibraryHeader
                setSidebarVisible={this.setSidebarVisible.bind(this)}
              />
              <VideoSection />
              <Button
                buttonText="Load More"
                customClass={style.loadButton}
                onClick={this.loadMoreVideo}
              />
            </div>
            <div
              className={sideBarClass}
              onClick={() => this.setSidebarVisible(false)}
              style={{ backgroundColor: colors.bodyBackground, opacity: 0.4 }}
            />
            <Sidebar
              sidebarVisible={this.state.sidebarVisible}
              fixedHeader={this.state.fixedHeader}
              setSidebarVisible={(e) => this.setSidebarVisible(e)}
              onSubmit={(e) => this.handleSubmit(e)}
              colors={colors}
              changeFilter={this.props.changeFilter}
            />
          </React.Fragment>
        )}
      </ThemeContext.Consumer>
    )
  }
}

Library.propTypes = {
  library: PropTypes.object,
  getVideos: PropTypes.func,
  changeFilter: PropTypes.func,
  dispatch: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
})

function mapDispatchToProps(dispatch) {
  return {
    getVideos: (opt) => dispatch(actions.loadVideos(opt)),
    changeFilter: (e) => dispatch(actions.changeFilter(e)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Library)
