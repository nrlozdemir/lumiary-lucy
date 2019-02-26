import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { createStructuredSelector } from "reselect";

import style from './style.scss'

import { actions, makeSelectLibrary } from 'Reducers/library'
import AsyncSearch from 'Components/Form/AsyncSearch'
import Button from 'Components/Form/Button'

class LibraryDetail extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selectValue: ''
		}

	}

	async onLoadOptions(inputValue, callback) {
		console.log('Event ', inputValue)
		try {
			const { getFilteredTitles, library } = this.props
			await getFilteredTitles(inputValue)
			if(library.filteredTextList.length){
				console.log("data", library.filteredTextList);
				callback(library.filteredTextList)
			}
		}catch (e) {
			console.log('error', e)
		}
	}

	render() {
		const { setSidebarVisible, library } = this.props
		console.log(this.props);
		return (
			<div className={style.headerContainer}>
				<div>
					<Field
						name="libraryFilterInput"
						component={AsyncSearch}
						loadOptions={this.onLoadOptions.bind(this)}
						onChange={(e) => console.log(e)}
						placeholder="Search a video…"
						customClass={style.filterSelect}
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

const mapDispatchToProps = dispatch => {
	return {
		getFilteredVideos: filterText => dispatch(actions.filterVideos(filterText)),
		getFilteredTitles: filterText => dispatch(actions.filterTextList(filterText))
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(
	reduxForm({
		form: 'LibraryHeaderForm'
	}),
	withConnect)(LibraryDetail)
