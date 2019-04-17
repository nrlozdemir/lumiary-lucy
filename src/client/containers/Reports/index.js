import React, { Component } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import Main from './views/Main'
import CompareBrand from './views/CompareBrand'

class Reports extends Component {
  render() {
    return (
      <Switch>
        <Route path="/reports" exact component={Main} />
        <Route path="/reports/:id" component={CompareBrand} />
      </Switch>
    )
  }
}

export default Reports
