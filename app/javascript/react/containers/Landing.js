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
    let message;
    if (typeof(window.currentUser) == 'undefined'){
      message = 'Start by logging in or signing up first.'
    }else{
      message = 'Start by researching a stock'
    }
    return(
      <div className="landing">
        <div className="left row">
        <br />
          <BackButton />
        </div>
        <div className="row">
          <div className= "small-8 medium-8 large-8 columns small-centered medium-centered large-centered">
            <h1 className="padded-multiline">
            <br/><br/>
              <span><b>Welcome to StockWatcher</b></span>
            </h1>
            {/*}<h1><b>Welcome to StockWatcher</b></h1>*/}
            <h1 className="padded-multiline">&nbsp;&nbsp;&nbsp;<span>{message}</span></h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
