import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectLibraryDetailColorTemperature,
} from 'Reducers/libraryDetail'
import ColorTemperatureModule from 'Components/Modules/ColorTemperatureModule'

//import style from './style.scss'
class LibraryDetailColorTemperature extends React.Component {
  callBack = (data) => {
    const { dateRange } = data
    const { getColorTempRequest, videoId } = this.props
    if (videoId) {
      getColorTempRequest({ videoId, daterange: dateRange })
    }
  }

  render() {
    const {
      libraryDetailColorTemperatureData: { data, loading, error },
    } = this.props

    return (
      <ColorTemperatureModule
        moduleKey="LibraryDetail/ColorTemperature"
        data={data}
        title="Color Temperature / Sentiment Comparison"
        action={this.callBack}
        noStaticTexts={true}
        legend={[
          { label: 'This Video', color: 'coral-pink' },
          { label: 'Library Average', color: 'cool-blue' },
          { label: 'Industry', color: 'lighter-purple' },
        ]}
        filters={[
          {
            type: 'dateRange',
            selectKey: 'ACT-wds',
            placeHolder: 'Date',
            defaultValue: 'week',
          },
        ]}
        isEmpty={!loading && !data}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  libraryDetailColorTemperatureData: makeSelectLibraryDetailColorTemperature(),
})

const mapDispatchToProps = (dispatch) => ({
  getColorTempRequest: (id) => dispatch(actions.getColorTempRequest(id)),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

LibraryDetailColorTemperature.propTypes = {
  videoId: PropTypes.string,
}

export default compose(withConnect)(LibraryDetailColorTemperature)
