import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Main from './views/Main'
import CompareBrand from './views/CompareBrand'
import ReportGenerated from '../ReportGenerated'

class Reports extends Component {
  render() {
    return (
      <Switch>
        <Route path="/reports" exact component={Main} />
        <Route path="/reports/brand-insight/:id" component={ReportGenerated} />
        <Route path="/reports/:type/:id" component={CompareBrand} />
      </Switch>
    )
  }
}

export default Reports
