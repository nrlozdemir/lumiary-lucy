import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import XCircle from 'Components/Icons/XCircle'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'
import SelectFilters from 'Components/ModuleSelectFilters'
import { actions, makeSelectInfoShowSection } from 'Reducers/libraryDetail'
import { isEqual } from 'lodash'
import { selectFiltersToType } from 'Utils'

class Header extends React.Component {
  componentDidUpdate(prevProps) {
    const { filters: prevFilters } = prevProps
    const {
      toggleInfoSection,
      filters,
      videoId,
      title,
      identifier,
      maxLabel,
      moduleKey
    } = this.props

    if (
      !!filters &&
      !!prevFilters &&
      !isEqual(prevFilters.values[moduleKey], filters.values[moduleKey])
    ) {
      const filterValues = filters.values[moduleKey]

      const valuesToType = selectFiltersToType(filterValues)

      toggleInfoSection({
        ...valuesToType,
        title,
        videoId,
        property: identifier,
        label: maxLabel,
      })
    }
  }

  render() {
    const { toggleInfoSection, sectionData, moduleKey } = this.props

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.doughnutPanelHeader}
            style={{
              background: colors.duskBackground,
              boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
            }}
          >
            <div onClick={() => toggleInfoSection(null)}>
              <div className={style.iconWrapper}>
                <XCircle />
                <p className={style.iconTitle}>
                  {sectionData.title} - {sectionData.label}
                </p>
              </div>
            </div>
            <div className={style.headerInfo}>
              <div />
              <div className={style.formWrapper}>
                <SelectFilters
                  moduleKey={moduleKey}
                  type="dateRange"
                  selectKey="date"
                  defaultValue="week"
                />
                <SelectFilters
                  moduleKey={moduleKey}
                  type="metric"
                  selectKey="metric"
                  defaultValue="likes"
                />
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  sectionData: makeSelectInfoShowSection(),
  filters: makeSelectSelectFilters(),
})

function mapDispatchToProps(dispatch) {
  return {
    toggleInfoSection: (show) => dispatch(actions.toggleInfoSection(show)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Header)
