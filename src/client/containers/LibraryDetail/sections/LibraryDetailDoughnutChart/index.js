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
import { secondsToHHMMSS } from 'Utils'
import Info from './Info'

class LibraryDetailDoughnutChart extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      showInfo,
      infoData,
      doughnutData: { data, loading },
    } = this.props

    const {
      showInfo: nextShowInfo,
      infoData: nextInfoData,
      doughnutData: { data: nextData, loading: nextLoading },
    } = nextProps

    return (
      !isEqual(JSON.stringify(data), JSON.stringify(nextData)) ||
      !isEqual(JSON.stringify(infoData), JSON.stringify(nextInfoData)) ||
      loading !== nextLoading ||
      (!!showInfo || !!nextShowInfo)
    )
  }

  render() {
    const {
      showInfo,
      videoId,
      videoDuration,
      infoData: { loading: doughnutInfoLoading },
      doughnutData: { data: doughnutData, loading: doughnutLoading },
    } = this.props

    const sectionToShow = (!!showInfo && showInfo.title) || false

    console.log('doughnutData', doughnutData)
    
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
              {!doughnutLoading &&
                (!!doughnutData && !!doughnutData.length ? (
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
                        duration:
                          title === 'Duration'
                            ? secondsToHHMMSS(videoDuration)
                            : null,
                        maxLabel: label,
                        colors,
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
                            <Info
                              {...cardProps}
                              loading={doughnutInfoLoading}
                            />
                          )}
                        </React.Fragment>
                      )
                    }
                  )
                ) : (
                  <div className={style.radialChartsContainer_empty}>
                    <p>No Data Available</p>
                  </div>
                ))}
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

const withConnect = connect(
  mapStateToProps,
  null
)

export default compose(withConnect)(LibraryDetailDoughnutChart)
