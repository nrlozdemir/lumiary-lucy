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
 * @constructor
 * @param {selectKey} selectKey - The Uniqe Key of the Select.
 * @param {placeHolder} placeHolder - The Placeholder of the Select.
 * @param {selectClasses} selectClasses - The Custom Class of the Select.
 * @param {type} type - The type of the Select.
 * (Types are:  engagement, platform, aspectRatio, resolution,
 * 		frameRate, duration, pacing, videoFormat, videoProperty,
 * 		audienceAge, audienceGender, talentAge, talentGender,
 * 		colorTempature, timeRange
 * )
 */
class RealSelectFilters extends React.Component {
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
      selectFilters: { options, values },
      selectClasses,
      selectKey,
      placeHolder,
      moduleKey,
    } = this.props
    const selectedOption =
      values && values[moduleKey] && values[moduleKey][selectKey]
    return (
      <React.Fragment>
        <Select
          name={`select${type}`}
          customClass={selectClasses || 'custom-select'}
          placeholder={placeHolder}
          value={selectedOption && selectedOption.value}
          onChange={(option) => this.onChange(option)}
          options={options[type]}
        />
        {type === 'timeRange' &&
          selectedOption &&
          selectedOption.value &&
          selectedOption.value.value === 'custom' && (
            <Datepicker
              type={'range'}
              apply={(value) => {
                console.log(value)
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

RealSelectFilters.propTypes = {
  type: PropTypes.string,
  selectKey: PropTypes.string,
  selectFilters: PropTypes.object,
  changeFilter: PropTypes.func,
  dispatch: PropTypes.func,
  moduleKey: PropTypes.string.isRequired,
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

export default compose(withConnect)(RealSelectFilters)