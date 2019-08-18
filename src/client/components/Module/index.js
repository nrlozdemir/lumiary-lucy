import React from 'react'
import { compose, bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'
import { makeSelectGlobalSection } from 'Reducers/app'
import _ from 'lodash'
import cx from 'classnames'
import style from './style.scss'
import HeaderModule from './header'
import { selectFiltersToType } from 'Utils'
import RouterLoading from 'Components/RouterLoading'
import { ThemeContext } from 'ThemeContext/themeContext'

export class Module extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoShow: false,
      modalShow: false,
    }
  }

  componentDidUpdate(prevProps) {
    const {
      action,
      moduleKey,
      actionOnProp,
      selectFilters,
      selectFilters: { defaults },
    } = this.props

    if (
      (!!action &&
        (!!prevProps.selectFilters &&
          !!selectFilters &&
          !_.isEqual(
            prevProps.selectFilters.values[prevProps.moduleKey],
            selectFilters.values[moduleKey]
          ))) ||
      !_.isEqual(actionOnProp, prevProps.actionOnProp)
    ) {
      const selectFilterValues = selectFilters.values[moduleKey]

      const valuesToType = selectFiltersToType(
        selectFilterValues,
        defaults.brand
      )

      action(valuesToType, moduleKey)
    }
  }

  changeInfoStatus = () => {
    this.setState({
      infoShow: !this.state.infoShow,
    })
  }

  setModalShow = (status) => {
    this.setState({
      modalShow: status,
    })
  }

  render() {
    const {
      moduleKey,
      children,
      references,
      bodyClass,
      isEmpty,
      containerClass,
      loading,
      customEmptyClasses,
    } = this.props

    const { infoShow, modalShow } = this.state

    const moduleContainer = cx(
      'shadow-1 grid-container col-12',
      style.moduleContainer,
      containerClass,
      {
        [style['moduleContainer--empty']]: isEmpty || loading,
      }
    )

    const referencesClass = cx('font-secondary-second', style.references, {
      [style['moduleContainerBody--empty']]: isEmpty || loading,
    })

    const moduleContainerBody = cx(style.moduleContainerBody, bodyClass, {
      [style['moduleContainerBody--empty']]: isEmpty || loading,
    })

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => {
          return (
            <div
              className={moduleContainer}
              style={{
                background: colors.moduleBackground,
                color: colors.textColor,
                boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
              }}
            >
              <div className={style.moduleContainerHeader}>
                <HeaderModule
                  {...this.props}
                  changeInfoStatus={this.changeInfoStatus}
                  infoShow={infoShow}
                  setModalShow={this.setModalShow}
                  modalShow={modalShow}
                  themes={colors}
                />
              </div>
              <div className={moduleContainerBody}>{children}</div>
              {references && (
                <div className={referencesClass}>
                  {references.map((ref, index) => (
                    <div className={style.referenceItem} key={index}>
                      {ref.className && <span className={ref.className} />}
                      {ref.color && (
                        <span style={{ backgroundColor: ref.color }} />
                      )}
                      {ref.text}
                    </div>
                  ))}
                </div>
              )}
              {isEmpty && !loading && (
                <div className={cx(style.moduleEmpty, customEmptyClasses)}>
                  No Data Available
                </div>
              )}
              {loading && (
                <div className={cx(style.moduleEmpty, customEmptyClasses)}>
                  <RouterLoading />
                </div>
              )}
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  selectFilters: makeSelectSelectFilters(),
  sections: makeSelectGlobalSection(),
})

Module.defaultProps = {
  action: () => {},
  isEmpty: false,
  loading: false,
}

Module.propTypes = {
  action: PropTypes.func.isRequired,
  bodyClass: PropTypes.string,
  containerClass: PropTypes.string,
  isEmpty: PropTypes.bool,
  customEmptyClasses: PropTypes.string,
  /* 
  sometimes we want the callback on a certain prop change 
  and not just on filter change
  */
  actionOnProp: PropTypes.any,
}

const withConnect = connect(
  mapStateToProps,
  null
)

export default compose(withConnect)(Module)
