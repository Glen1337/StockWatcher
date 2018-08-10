import BackButton from '../components/BackButton'
import React from 'react';
import PortfolioTile from '../components/PortfolioTile'

class Landing extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {

    return(
      <div>
        <BackButton />
        <h1>Welcome to StockWatcher</h1>
      </div>
    )
  }
}

export default Landing;
