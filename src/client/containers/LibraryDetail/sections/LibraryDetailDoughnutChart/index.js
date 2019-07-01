import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isEqual } from 'lodash'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import DoughnutCard from './DoughnutCard'
import {
  makeSelectInfoData,
  makeSelectInfoShowSection,
  makeSelectDoughnutData,
} from 'Reducers/libraryDetail'
import RouterLoading from 'Components/RouterLoading'
import Info from './Info'

class LibraryDetailDoughnutChart extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      doughnutData: { data, loading },
      infoData: { loading: doughnutInfoLoading },
    } = this.props

    const {
      doughnutData: { data: nextData, loading: nextLoading },
      infoData: { loading: doughnutInfoNextLoading },
    } = nextProps

    return (
      !isEqual(JSON.stringify(data), JSON.stringify(nextData)) ||
      loading !== nextLoading ||
      doughnutInfoLoading !== doughnutInfoNextLoading
    )
  }

  render() {
    const {
      doughnutData: { data: doughnutData, loading: doughnutLoading },
      showInfo,
      videoId,
      infoData: { loading: doughnutInfoLoading },
    } = this.props

    const sectionToShow = (!!showInfo && showInfo.title) || false

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className="grid-container col-12 mt-48"
            style={{
              backgroundColor: colors.moduleBackground,
              boxShadow: `0px 2px 6px 0px ${colors.moduleShadow}`,
              color: colors.textColor,
            }}
          >
            <div className={style.radialChartsContainer}>
              {!!doughnutData &&
                !doughnutLoading &&
                doughnutData.map(
                  (
                    {
                      key,
                      title,
                      doughnutChartValues,
                      max: { label, percentage },
                    },
                    i
                  ) => {
                    const cardProps = {
                      title,
                      videoId,
                      identifier: key,
                      maxLabel: label,
                    }
                    return (
                      <React.Fragment key={i}>
                        {!sectionToShow && (
                          <DoughnutCard
                            chartData={doughnutChartValues}
                            maxPercentage={percentage}
                            {...cardProps}
                          />
                        )}
                        {!!sectionToShow && sectionToShow === title && (
                          <Info {...cardProps} loading={doughnutInfoLoading} />
                        )}
                      </React.Fragment>
                    )
                  }
                )}
              {doughnutLoading && (
                <div className={style.radialChartsContainer_loading}>
                  <RouterLoading />
                </div>
              )}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  showInfo: makeSelectInfoShowSection(),
  doughnutData: makeSelectDoughnutData(),
  infoData: makeSelectInfoData(),
})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(LibraryDetailDoughnutChart)
