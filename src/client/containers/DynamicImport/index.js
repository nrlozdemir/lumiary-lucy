import React, { Component } from 'react'
import Navbar from 'Components/Navbar/index'
import 'Scss/fonts.scss'
import 'Scss/_misc/_icons.scss'

class DynamicImport extends Component {
  _isMounted = false
  state = {
    component: null,
  }
  componentDidMount() {
    this._isMounted = true
    this.props.load().then((component) => {
      if (this._isMounted) {
        this.setState(() => ({
          component: component.default ? component.default : component,
        }))
      }
    })
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render() {
    const { removeNavbar, children, match, routeConfig } = this.props
    const { component } = this.state
    return (
      <React.Fragment>
        {!removeNavbar ? (
          <Navbar match={match} routeConfig={routeConfig} />
        ) : null}
        {children(component)}
      </React.Fragment>
    )
  }
}

export default DynamicImport
