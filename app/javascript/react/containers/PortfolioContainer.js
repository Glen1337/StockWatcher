import React from 'react';
import PortfolioTile from '../components/PortfolioTile'

class PortfolioContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      portfolios: []
    }
    //this bindings
  }

    componentDidMount() {
      fetch(`/api/v1/portfolios`, {credentials: 'same-origin'})
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          portfolios: body.portfolios
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  //methods
  render() {
    let portfolios = this.state.portfolios.map((portfolio) => {
      return (
        <PortfolioTile
          key={portfolio.id}
          id={portfolio.id}
          name={portfolio.name}
          value={portfolio.value}
          holdings={portfolio.stock_holdings}
        />
      )
    })
    return(
      <div>
        <h1>Portfolios</h1>
        {portfolios}
      </div>
    )
  }
}

export default PortfolioContainer;
