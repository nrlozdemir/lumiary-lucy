import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'Components/Form/Select'
import { createStructuredSelector } from 'reselect'
import { makeSelectAuthProfile } from 'Reducers/auth'
import { actions, makeSelectSelectFilters } from 'Reducers/selectFilters'

/**
 * Represents a Select Filters.
 *
 * (Types are:  engagement, platform, aspectRatio, resolution,
 *    frameRate, duration, pacing, videoFormat, property,
 *    audienceAge, audienceGender, talentAge, talentGender,
 *    colorTemperature, dateRange
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
    const {
      type,
      profile,
      defaultValue,
      setBrandFilters,
      selectFilters: { options },
    } = this.props

    this.onChange(defaultValue && defaultValue.value ? defaultValue : undefined)

    // fetches competitors and adds them to dropdown options for `brands` type
    if (
      type === 'brand' &&
      !!profile &&
      !!profile.brand &&
      !!profile.brand.competitors &&
      !!options &&
      !!options.brand &&
      profile.brand.competitors.length !== options.brand.length
    ) {
      if (!!profile.brand.competitors.length) {
        const brandOpts = profile.brand.competitors.map((b) => ({
          value: b.uuid,
          label: b.name,
        }))
        setBrandFilters({ brands: brandOpts, defaultBrand: brandOpts[0].value })
      } else {
        setBrandFilters({ brands: [], defaultBrand: '' })
      }
    }
  }

  onChange = (val) => {
    const {
      selectKey,
      type,
      moduleKey,
      changeFilter,
      onChange = () => {},
    } = this.props
    const filterObj = {
      [moduleKey]: {
        [selectKey]: {
          value: val,
          type: type,
        },
      },
    }
    changeFilter(filterObj)
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
      selectFilters: { options: defaultOptions, values, defaults },
      selectClasses,
      selectKey,
      placeHolder,
      moduleKey,
      themes,
      isActive,
      onChange,
      inModuleFilter,
      customOptions,
    } = this.props

    const options = customOptions
      ? {
          //...defaultOptions,
          [type]: customOptions,
        }
      : defaultOptions

    const selectedOption =
      values && values[moduleKey] && values[moduleKey][selectKey]

    const _defaultValue = defaultValue || defaults[type]

    const findEngagementOptions = () => {
      return options[type].reduce((acc, curr) => {
        curr.options.find((item) => {
          if (item.value === _defaultValue) {
            acc = item
          }
        })
        return acc
      }, {})
    }

    const value =
      selectedOption && selectedOption.value
        ? selectedOption.value
        : options &&
          options[type] &&
          !!options[type].length &&
          !!options[type][0].options &&
          !!options[type][0].options.length
        ? findEngagementOptions()
        : options[type].find(({ value: v }) => v === _defaultValue)

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
          inModuleFilter={inModuleFilter}
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
  customOptions: PropTypes.arrayOf(PropTypes.object),
}

const mapStateToProps = createStructuredSelector({
  selectFilters: makeSelectSelectFilters(),
  profile: makeSelectAuthProfile(),
})

function mapDispatchToProps(dispatch) {
  return {
    changeFilter: (e) => dispatch(actions.changeFilter(e)),
    removeFilter: (e) => dispatch(actions.removeFilter(e)),
    removeAllFilters: () => dispatch(actions.removeAllFilters()),
    setBrandFilters: (e) => dispatch(actions.setBrandFilters(e)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ModuleSelectFilters)
