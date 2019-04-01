import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions, makeSelectSelectFilters } from 'Reducers/selectFilters'
import _ from 'lodash'
import cx from 'classnames'
import style from './style.scss'
import HeaderModule from './header'

export class Module extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate(prevProps) {
    if (
      !_.isEqual(
        prevProps.selectFilters.values[prevProps.moduleKey],
        this.props.selectFilters.values[this.props.moduleKey]
      )
    ) {
      this.props.action(
        this.props.selectFilters.values[this.props.moduleKey],
        this.props.moduleKey
      )
    }
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

Module.propTypes = {
  action: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  {}
)(Module)
