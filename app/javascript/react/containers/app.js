import PortfolioContainer from './PortfolioContainer'
import StockContainer from './StockContainer'
import Landing from './Landing'
import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

class App extends Component {

  render() {

    return (
      <Router history={browserHistory}>
        <Route path='/'>
          <IndexRoute component={Landing} />
          <Route path='/portfolios' component={PortfolioContainer} />
          <Route path='/stock' component={StockContainer} />
        </Route>
      </Router>
    )
  }
}

export default App;
