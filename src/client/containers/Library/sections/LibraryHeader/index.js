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
      AsyncSearchValue: ""
    }
  }

  async onLoadOptions(inputValue, callback) {
    try {
      const { library } = this.props
      if (library.videos && library.videos.length > 0 && inputValue) {
        callback(
          library.videos
            .filter(({ title }) => searchTermInText(title, inputValue, true))
            .map(({ id, title }) => ({ value: String(id), label: title }))
        )
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  render() {
    const { setSidebarVisible, changeFilter, library: { filters } } = this.props
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
            onChange={async (option) => {
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
            }}
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
