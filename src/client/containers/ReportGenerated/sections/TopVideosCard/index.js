import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectReportsTopVideosCard,
} from 'Reducers/generatedReport'

import { randomKey } from 'Utils/index'
import StackedBarChart from 'Components/Charts/StackedBarChart'
import Module from 'Components/Module'
import { ThemeContext } from 'ThemeContext/themeContext'
import RouterLoading from 'Components/RouterLoading'

class TopVideosCard extends React.Component {
  getTopVideosCard(data) {
    const { getTopVideosCardRequest, reportId } = this.props
    getTopVideosCardRequest({ ...data, reportId })
  }

  datasetKeyProvider() {
    return randomKey(5)
  }

  render() {
    const {
      topVideosCard: { data, loading },
    } = this.props

    let stackedChartData = data || {}
    if (data && !loading) {
      const labels = ['Facebook', 'Instagram', 'Twitter', 'YouTube']
      const backgroundColors = ['#2FD7C4', '#8562F3', '#5292E5', '#acb0be']

      stackedChartData.labels = ['360p', '480p', '720p', '1080p', '4k']
      stackedChartData.datasets.map((el, i) => {
        stackedChartData.datasets[i].label = labels[i]
        stackedChartData.datasets[i].backgroundColor = backgroundColors[i]
      })
    }

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <Module
            moduleKey={'Reports/TopVideosCard'}
            title={'Top Videos Over Time By Competitor'}
            action={this.getTopVideosCard.bind(this)}
            filters={[
              {
                type: 'property',
                selectKey: 'resolutionOption',
                placeHolder: 'Resolution',
              },
            ]}
            references={[
              {
                className: 'bg-cool-blue',
                text: 'Facebook',
              },
              {
                className: 'bg-lighter-purple',
                text: 'Instagram',
              },
              {
                className: 'bg-coral-pink',
                text: 'Twitter',
              },
              {
                className: 'bg-cool-grey',
                text: 'YouTube',
              },
            ]}
          >
            {!data && loading ? (
              <RouterLoading />
            ) : (
              <StackedBarChart
                height={200}
                barData={stackedChartData}
                datasetKeyProvider={this.datasetKeyProvider()}
              />
            )}
          </Module>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  topVideosCard: makeSelectReportsTopVideosCard(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopVideosCard)
