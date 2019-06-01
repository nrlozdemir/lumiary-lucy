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
      themeContext: { colors },
    } = this.props
    this.props.getSimilarPropertiesRequest({
      date: data,
      themeColors: colors,
    })
  }

  render() {
    const { similarProperties } = this.props
    return (
      <TopSimilarPropertiesModule
        moduleKey="MarketView/TopSimilarPropertiesModule"
        data={similarProperties.data}
        title="Similar Properties Of Top Videos"
        action={this.getSimilarProperties}
        presentWithDoughnut
        filters={[
          {
            type: 'dateRange',
            selectKey: 'dateRange',
            placeHolder: 'dateRange',
          },
        ]}
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
