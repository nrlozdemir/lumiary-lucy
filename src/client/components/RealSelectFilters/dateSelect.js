
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions, makeSelectSelectFilters } from "Reducers/selectFilters"


class SelectFilters extends Component {

	onChange = (val) => {
		const { key, type } = this.props;
		const filterObj = {
			[key]: {
				value: val,
				type: type
			}
		}
		this.props.changeFilter(filterObj)
	}

	render(){
		const { type, selectFilters: { options, values } } = this.props
		console.log(selectFilters)
		return(
			<Select
				name={`select${type}`}
				customClass={selectClasses || 'custom-select'}
				placeholder={`Select ${type}`}
				value={values[key] && values[key].value}
				onChange={(option) => this.onChange(option)}
				options={options[type]}
			/>
		)
	}
}

SelectFilters.propTypes = {
  type: PropTypes.string,
	key: PropTypes.string,
	selectFilters: PropTypes.object,
  changeFilter: PropTypes.func,
  dispatch: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
  selectFilters: makeSelectSelectFilters()
})

function mapDispatchToProps(dispatch) {
  return {
    changeFilter: e => dispatch(actions.changeFilter(e))
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(SelectFilters)
