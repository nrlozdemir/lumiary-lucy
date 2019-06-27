import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Main from './views/Main'
import CompareBrand from './views/CompareBrand'
import PageBuilder from './views/PageBuilder'
import ReportGenerated from '../ReportGenerated'

class Reports extends Component {
  render() {
    return (
      <Switch>
        <Route path="/reports" exact component={Main} />
        <Route path="/reports/brand-insight/:id" component={ReportGenerated} />
        <Route path="/reports/brand-insight" component={ReportGenerated} />
        <Route
          path="/reports/predefined-reports/:id"
          component={PageBuilder}
        />
        <Route path="/reports/compare-brands/:id" component={CompareBrand} />
        <Route path="/reports/:type" component={CompareBrand} />
      </Switch>
    )
  }
}

export default Reports
