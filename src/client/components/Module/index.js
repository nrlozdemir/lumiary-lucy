import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions, makeSelectSelectFilters } from 'Reducers/selectFilters'
import cx from 'classnames'
import style from './style.scss'
import HeaderModule from './header'

import _ from 'lodash'

function isEquivalent(a, b) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a)
  var bProps = Object.getOwnPropertyNames(b)

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i]

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true
}

export class Module extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate(prevProps) {
    console.log('##', prevProps, this.props)
    if (
      !_.isEqual(
        prevProps.selectFilters.values[prevProps.moduleKey],
        this.props.selectFilters.values[this.props.moduleKey]
      )
    ) {
      console.log(
        'AYNI DEGIL',
        this.props.selectFilters.values[this.props.moduleKey]
      )
    }
    // let checkHasOwnData = this.props.filters.filter(
    //   (item) => this.props.selectFilters.values[item.selectKey]
    // )
    // if (checkHasOwnData) {
    //   let handleDataSet = this.props.filters.reduce((a, b) => {
    //     if (this.props.selectFilters.values[b.selectKey]) {
    //       a.push(this.props.selectFilters.values[b.selectKey])
    //     }
    //     return a
    //   }, [])
    //   this.props.action(handleDataSet)
    // }
  }

  render() {
    const moduleContainer = cx('shadow-1 col-12', style.moduleContainer)
    const { children, title, subTitle, legend, filters } = this.props
    return (
      <div className={moduleContainer}>
        <div className={style.moduleContainerHeader}>
          <HeaderModule {...this.props} />
        </div>
        <div className={style.moduleContainerBody}>{children}</div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  selectFilters: makeSelectSelectFilters(),
})

export default connect(
  mapStateToProps,
  {}
)(Module)
