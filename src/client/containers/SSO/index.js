'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import qs from 'qs'


import { actions } from 'Reducers/auth'

// Styles
//import style from './styles.scss'

// Components

class SSO extends React.PureComponent {

  componentDidMount() {
   const {location, loginSsoRequest} = this.props

   const { sso }  = qs.parse(location.search, {
    ignoreQueryPrefix: true
  })
 
    if (sso) {
      loginSsoRequest(sso)
    } 
  }

  render() {
    return null
  }
}

SSO.propTypes = {
  auth: PropTypes.object.isRequired,
}

SSO.defaultProps = {
  auth: null,
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ ...actions }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SSO)
