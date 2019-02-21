import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form';

import style from './style.scss'
import { actions } from 'Reducers/library'

import Button from 'Components/Form/Button'
import Input from 'Components/Form/Input'

class LibraryDetail extends React.Component {
	constructor(props) {
		super(props)
	}

	async onChangeText(e) {
		console.log('Event ', e.currentTarget);
		const { getFilteredVideos } = this.props
		await getFilteredVideos(e.target.value)
	}

	render() {
		const { setSidebarVisible } = this.props
		console.log(this.props);
		return (
			<div className={style.headerContainer}>
				<div>
					<form onSubmit={(e) => this.onChangeText(e)}>
					<Field
						name="libraryFilterInput"
						component={Input}
						onChange={e => this.onChangeText(e)}
						customClass={style.librarySearchInput}
						placeholder="Search a video…"
					/>
					</form>
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

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
	return {
		getFilteredVideos: filterText => dispatch(actions.filterVideos(filterText))
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
