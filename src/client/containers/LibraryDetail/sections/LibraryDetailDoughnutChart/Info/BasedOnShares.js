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
import cx from 'classnames'

class BasedOnShares extends React.Component {
  render() {
    const { modalData, sectionData, title, filters, moduleKey, loading } = this.props

    const filterTitle =
      (!!filters &&
        !!filters.values &&
        !!filters.values[moduleKey] &&
        !!filters.values[moduleKey].metric &&
        !!filters.values[moduleKey].metric.value &&
        filters.values[moduleKey].metric.value.label) ||
      'Views'

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
                  realVideoPropertyAverage: modalData.realVideoPropertyAverage,
                  bottomText: 'of your library is shot in',
                  avg: modalData.libraryPropertyAverage,
                  realLibraryPropertyAverage: modalData.realLibraryPropertyAverage,
                  percent: modalData.propertyLibraryPercentChange,
                  fps: sectionData.label,
                }}
                colors={colors}
              />
            ) : (
              <React.Fragment>
                <h1 className={style.panelHeader}>{topTitle}</h1>
                <div
                  className={cx(style.emptyData, {
                    [style['emptyData--loading']]: loading,
                  })}
                >
                  {!loading ? 'No Data Available' : ''}
                </div>
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
