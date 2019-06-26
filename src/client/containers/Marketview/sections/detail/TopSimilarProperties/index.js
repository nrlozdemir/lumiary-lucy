import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  selectMarketviewSimilarPropertiesView,
} from 'Reducers/marketview'
import TopSimilarPropertiesModule from 'Components/Modules/TopSimilarPropertiesModule'
import { withTheme } from 'ThemeContext/withTheme'

class TopSimilarProperties extends React.Component {
  getSimilarProperties = (data) => {
    const {
      container,
      getSimilarPropertiesRequest,
      themeContext: { colors },
    } = this.props

    getSimilarPropertiesRequest({ ...data, container })
  }

  render() {
    const {
      similarProperties: { data, loading, error },
      title,
      moduleKey,
      filters,
    } = this.props

    return (
      <TopSimilarPropertiesModule
        moduleKey={moduleKey}
        title={title}
        data={data}
        action={this.getSimilarProperties}
        presentWithDoughnut
        filters={filters}
        isError={error}
        isLoading={loading}
      />
    )
  }
}
TopSimilarProperties.propTypes = {}

const mapStateToProps = createStructuredSelector({
  similarProperties: selectMarketviewSimilarPropertiesView(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  withTheme
)(TopSimilarProperties)
