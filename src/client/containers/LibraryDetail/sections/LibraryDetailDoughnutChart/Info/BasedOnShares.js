import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import PointerCard from 'Components/PointerCard'
import {
  makeSelectInfoShowSection,
  makeSelectInfoModalData,
} from 'Reducers/libraryDetail'

class BasedOnShares extends React.Component {
  render() {
		const { modalData, sectionData } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
					modalData && sectionData &&
          <div
            className={style.panelChart}
            style={{ borderColor: colors.moduleBorder }}
          >
            <PointerCard
              data={{
                topTitle: 'Based on Shares',
                pointerData: modalData.videoPropertyAverage,
                bottomText: 'of your library is shot in',
                avg: modalData.libraryPropertyAverage,
                percent: modalData.propertyLibraryPercentChange,
                fps: sectionData.label,
              }}
              colors={colors}
            />
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  sectionData: makeSelectInfoShowSection(),
  modalData: makeSelectInfoModalData(),
})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(BasedOnShares)
