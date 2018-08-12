import BackButton from '../components/BackButton'
import React from 'react';
import PortfolioTile from '../tiles/PortfolioTile'

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
        <div className="row">
          <div className= "small-8 medium-8 large-8 small-centered large-centered medium-centered columns">
            <br />
            <br />
            <br />
            <br />
            <h1>Welcome to StockWatcher</h1>
            <br />
            <h3>Start by researching a stock</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
