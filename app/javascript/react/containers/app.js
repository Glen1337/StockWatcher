import PortfolioContainer from './PortfolioContainer'
import StockContainer from './StockContainer'
import Landing from '../components/Landing'
import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import AboutPage from '../components/AboutPage'

class App extends Component {

  render() {

    return (
      <Router history={browserHistory}>
        <Route path='/'>
          <IndexRoute component={Landing} />
          <Route path='/about' component={AboutPage} />
          <Route path='/portfolios' component={PortfolioContainer} />
          <Route path='/stock_holdings' component={StockContainer} />
        </Route>
      </Router>
    )
  }
}

export default App;
