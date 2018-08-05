import PortfolioContainer from './PortfolioContainer'
import StockContainer from './StockContainer'
import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

class App extends Component {

  render() {

    return (
      <Router history={browserHistory}>
        <Route path='/'>
          <IndexRoute component={PortfolioContainer} />
          <Route path='/portfolios' component={PortfolioContainer} />
          <Route path='/stock' component={StockContainer} />
        </Route>
      </Router>
    )
  }
}

export default App;

// <Route path='/trails/:id' component={TrailShowContainer} />
// <Route path ='/users/:id' component={UserShowContainer} />
//
//
//
//
//
//
// // This file did not exist pre-part 3
// import LauncherShow from '../components/LauncherShow'
// import LauncherList from '../components/LauncherList'
// import React from 'react';
// import FAQContainer from './FAQContainer'
// import { Router, browserHistory, Route, IndexRoute } from 'react-router';
//
// const App = props => {
//
//   return(
//     <div className='page'>
//     <Router history={browserHistory}>
//       <Route path='/' component={FAQContainer}/>
//       <Route path='/launchers' component={LauncherList}/>
//       <Route path='/launcher/:id' component={LauncherShow}/>
//     </Router>
//     </div>
//   )
// }
//
// export default App;
//
//
// import React, { Component } from 'react'
// import { Router, Route, IndexRoute, browserHistory } from 'react-router'
// import TrailsIndexContainer from './containers/TrailsIndexContainer'
// import TrailTile from './components/TrailTile'
// import TrailShowContainer from './containers/TrailShowContainer'
// import UserShowContainer from './containers/UserShowContainer'
//
// class App extends Component {
//
//   render() {
//     return (
//       <Router history={browserHistory}>
//         <Route path='/'>
//           <IndexRoute component={TrailsIndexContainer} />
//           <Route path='/trails' component={TrailsIndexContainer} />
//           <Route path='/trails/:id' component={TrailShowContainer} />
//           <Route path ='/users/:id' component={UserShowContainer} />
//         </Route>
//       </Router>
//     )
//   }
// }
//
// export default App;
