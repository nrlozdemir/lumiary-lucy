import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import PointerCard from 'Components/PointerCard'
import {
  makeSelectInfoShowSection,
  makeSelectInfoModalData,
} from 'Reducers/libraryDetail'

class BasedOnShares extends React.Component {
  render() {
    const { modalData, sectionData, title, filters, moduleKey } = this.props

    const filterTitle =
      (!!filters &&
        !!filters.values &&
        !!filters.values[moduleKey] &&
        !!filters.values[moduleKey].metric &&
        !!filters.values[moduleKey].metric.value &&
        filters.values[moduleKey].metric.value.label) ||
      'Likes'

    const topTitle = `Based on ${filterTitle}`

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.panelChart}
            style={{ borderColor: colors.moduleBorder }}
          >
            {modalData &&
            !!modalData.libraryPropertyAverage &&
            !!modalData.videoPropertyAverage &&
            sectionData ? (
              <PointerCard
                data={{
                  topTitle,
                  pointerData: modalData.videoPropertyAverage,
                  bottomText: 'of your library is shot in',
                  avg: modalData.libraryPropertyAverage,
                  percent: modalData.propertyLibraryPercentChange,
                  fps: sectionData.label,
                }}
                colors={colors}
              />
            ) : (
              <React.Fragment>
                <h1 className={style.panelHeader}>{topTitle}</h1>
                <div className={style.emptyData}>No Data Available</div>
              </React.Fragment>
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  sectionData: makeSelectInfoShowSection(),
  modalData: makeSelectInfoModalData(),
  filters: makeSelectSelectFilters(),
})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(BasedOnShares)
