import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'Components/Form/Select'
import { createStructuredSelector } from 'reselect'
import { actions, makeSelectSelectFilters } from 'Reducers/selectFilters'

/**
 * Represents a Select Filters.
 *
 * (Types are:  engagement, platform, aspectRatio, resolution,
 * 		frameRate, duration, pacing, videoFormat, property,
 * 		audienceAge, audienceGender, talentAge, talentGender,
 * 		colorTemperature, dateRange
 *
 * @constructor
 * @param {selectKey} selectKey - The Uniqe Key of the Select.
 * @param {placeHolder} placeHolder - The Placeholder of the Select.
 * @param {selectClasses} selectClasses - The Custom Class of the Select.
 * @param {type} type - The type of the Select.
 * @param {any} defaultValue - The default value
 * )
 */
class ModuleSelectFilters extends React.Component {
  componentDidMount() {
    this.onChange(undefined)
  }

  onChange = (val) => {
    const { selectKey, type, moduleKey, onChange = () => {} } = this.props
    const filterObj = {
      [moduleKey]: {
        [selectKey]: {
          value: val,
          type: type,
        },
      },
    }
    this.props.changeFilter(filterObj)
    onChange(val)
  }

  removeFilterValue = () => {
    const { selectKey } = this.props
    this.props.removeFilter(selectKey)
  }

  componentWillUnmount() {
    this.props.removeAllFilters()
  }

  render() {
    const {
      type,
      defaultValue,
      selectFilters: { options, values, defaults },
      selectClasses,
      selectKey,
      placeHolder,
      moduleKey,
      themes,
      isActive,
      onChange,
    } = this.props

    const selectedOption =
      values && values[moduleKey] && values[moduleKey][selectKey]

    const _defaultValue = defaultValue || defaults[type]

    const value =
      selectedOption && selectedOption.value
        ? selectedOption.value
        : options &&
          options[type] &&
          [
            ...(type === 'platformEngagement'
              ? !!options[type] &&
                !!options[type].length &&
                !!options[type][0].options &&
                !!options[type][0].options.length &&
                options[type][0].options
              : options[type]),
          ].find(({ value: v }) => v === _defaultValue)

    const onChangeFunc = onChange ? onChange : this.onChange

    return (
      <React.Fragment>
        <Select
          name={`select${type}`}
          customClass={selectClasses || 'custom-select'}
          placeholder={placeHolder}
          value={
            isActive || type === 'dateRange' || isActive === undefined
              ? value
              : ''
          }
          onChange={(option) => onChangeFunc(option)}
          options={options[type]}
          isActive={isActive}
        />
      </React.Fragment>
    )
  }
}

ModuleSelectFilters.propTypes = {
  type: PropTypes.string,
  selectKey: PropTypes.string,
  selectFilters: PropTypes.object,
  changeFilter: PropTypes.func,
  dispatch: PropTypes.func,
  moduleKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  isActive: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
  selectFilters: makeSelectSelectFilters(),
})

function mapDispatchToProps(dispatch) {
  return {
    changeFilter: (e) => dispatch(actions.changeFilter(e)),
    removeFilter: (e) => dispatch(actions.removeFilter(e)),
    removeAllFilters: () => dispatch(actions.removeAllFilters()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ModuleSelectFilters)
