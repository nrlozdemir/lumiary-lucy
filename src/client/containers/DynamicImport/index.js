import React, { Component } from "react"
import Navbar from "Components/Navbar/index";

class DynamicImport extends Component {
  _isMounted = false
  state = {
    component: null
  }
  componentDidMount() {
    this._isMounted = true
    this.props.load()
      .then((component) => {
        if (this._isMounted) {
          this.setState(() => ({
            component: component.default ? component.default : component
          }))
        }
      })
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render() {
    const { removeNavbar, children, match } = this.props;
    const { component } = this.state;
    return (
      <React.Fragment>
        {!removeNavbar ? <Navbar match={match} /> : null}
        {children(component)}
      </React.Fragment>
    )
  }
}

export default DynamicImport
