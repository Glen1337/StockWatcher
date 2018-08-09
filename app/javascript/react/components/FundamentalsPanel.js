import React from 'react';

class PortfolioContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      //portfolios: []
    }
    //this.addPortfolio = this.addPortfolio.bind(this);
  }


  render() {
    console.log("PortfolioContainer rendering")

    let portfolios = this.state.portfolios.map((portfolio) => {
      return (
        // <PortfolioTile
        //   key={portfolio.id}
        //   id={portfolio.id}
        //   name={portfolio.name}
        // />
      )
    })
    return(
      <div>
        <h1>Portfolios</h1>
        {portfolios}
        <h2>Create A New Portfolio</h2>
        <PortfolioFormContainer addPortfolio={this.addPortfolio} />
      </div>
    )
  }
}

export default FundamentalsPanel;
