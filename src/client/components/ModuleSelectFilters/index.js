import React from 'react'
import moment from 'moment'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'Components/Form/Select'
import Datepicker from 'Components/Datepicker'
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
    const { selectKey, type, moduleKey } = this.props
    const filterObj = {
      [moduleKey]: {
        [selectKey]: {
          value: val,
          type: type,
        },
      },
    }
    this.props.changeFilter(filterObj)
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
    } = this.props

    const selectedOption =
      values && values[moduleKey] && values[moduleKey][selectKey]

    const _defaultValue = defaultValue || defaults[type]

    const value =
      selectedOption && selectedOption.value
        ? selectedOption.value
        : options && options[type].find(({ value: v }) => v === _defaultValue)

    return (
      <React.Fragment>
        <Select
          name={`select${type}`}
          customClass={selectClasses || 'custom-select'}
          placeholder={placeHolder}
          value={value}
          onChange={(option) => this.onChange(option)}
          options={options[type]}
        />
        {type === 'dateRange' &&
          selectedOption &&
          selectedOption.value &&
          selectedOption.value.value === 'custom' && (
            <Datepicker
              type={'range'}
              apply={(value) => {
                const val = {
                  value: {
                    startDate: value.startDate,
                    endDate: value.endDate,
                  },
                  label:
                    moment(value.startDate).format('DD/MM/YYYY') +
                    ' - ' +
                    moment(value.endDate).format('DD/MM/YYYY'),
                }
                this.onChange(val)
              }}
              back={() => this.removeFilterValue()}
            />
          )}
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
