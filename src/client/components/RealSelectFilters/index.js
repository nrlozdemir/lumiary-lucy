





import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions, makeSelectSelectFilters } from "Reducers/selectFilters"
import Select from 'Components/Form/Select'


class RealSelectFilters extends React.Component {

  onChange = (val) => {
    const { selectKey, type } = this.props;
    const filterObj = {
      [selectKey]: {
        value: val,
        type: type
      }
    }
    this.props.changeFilter(filterObj)
  }

  componentWillUnmount(){
    this.props.removeFilter()
  }


  render(){
    const { type, selectFilters: { options, values }, selectClasses, selectKey, placeHolder } = this.props
    return(
      <Select
        name={`select${type}`}
        customClass={selectClasses || 'custom-select'}
        placeholder={placeHolder}
        value={values[selectKey] && values[selectKey].value}
        onChange={(option) => this.onChange(option)}
        options={options[type]}
      />
    )
  }
}

RealSelectFilters.propTypes = {
  type: PropTypes.string,
  selectKey: PropTypes.string,
  selectFilters: PropTypes.object,
  changeFilter: PropTypes.func,
  dispatch: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
  selectFilters: makeSelectSelectFilters()
})

function mapDispatchToProps(dispatch) {
  return {
    changeFilter: e => dispatch(actions.changeFilter(e)),
    removeFilter: () => dispatch(actions.removeFilter())
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(RealSelectFilters)
