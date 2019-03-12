import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from "redux"
import { createStructuredSelector } from "reselect";

import style from './style.scss'

import { actions, makeSelectLibrary } from 'Reducers/library'
import AsyncSearch from 'Components/Form/AsyncSearch'
import Button from 'Components/Form/Button'
import { searchTermInText } from 'Utils'

class LibraryHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      AsyncSearchValue: "",
      videos: this.props.library.vidoes,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.library.videos !== this.props.library.videos) {
      this.setState({
        videos: this.props.library.videos
      })
    }
  }

  async onLoadOptions(inputValue, callback) {
    try {
      const { videos } = this.state
      if (videos && videos.length > 0 && inputValue) {
        console.log(videos)
        callback(
          videos
            .filter(({ title }) => searchTermInText(title, inputValue, true))
            .map(({ id, title }) => ({ value: String(id), label: title }))
        )
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  async onChangeSearch(option, changeFilter, filters) {
    await changeFilter({
      ...filters,
      Search: {
        value: option ? option.label : option,
        new: option ? option.__isNew__ || false : false
      }
    })
    this.setState({
      AsyncSearchValue: option
    })
  }

  render() {
    const { setSidebarVisible, changeFilter, library: { filters, videos } } = this.props
    const { AsyncSearchValue } = this.state

    return (
      <div className={style.headerContainer}>
        <div>
          <AsyncSearch
            name="libraryFilterInput"
            loadOptions={this.onLoadOptions.bind(this)}
            placeholder="Search a video…"
            customClass={style.filterSelect}
            value={AsyncSearchValue}
            onChange={(option) => this.onChangeSearch(option, changeFilter, filters)}
          />
        </div>
        <div>
          <h1 className="alpha color-white text-center font-primary text-bold">
            Library
          </h1>
        </div>
        <div>
          <Button
            onClick={() => setSidebarVisible(true)}
            customClass="float-right font-secondary-first text-bold"
            buttonText="Filter Videos"
            iconRight="icon-Filter"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary()
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(LibraryHeader)
