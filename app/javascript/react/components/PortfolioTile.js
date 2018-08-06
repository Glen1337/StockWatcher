import React, { Component } from 'react';
import HoldingRow from '../components/HoldingRow'

class PortfolioTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      holdings: [],
      name: '',
      current_prices: {}
    }
    this.deleteHolding = this.deleteHolding.bind(this);
    this.getCurrentValues = this.getCurrentValues.bind(this);
  }

  componentDidMount() {
    console.log("ProlfileTile mounting")
    fetch(`/api/v1/portfolios/${this.props.id}`, {credentials: 'same-origin'})
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
      this.getCurrentValues(body.stock_holdings)
      this.setState({
        holdings: body.stock_holdings,
        name: body.name,
        id: body.id,
        value: body.value
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getCurrentValues(holdings){
    let tickersToGet = holdings.map(holding => holding.ticker).join(',');
    console.log("fetching IEX data for " + tickersToGet)
    fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickersToGet}&types=quote`)
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
        current_prices: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteHolding(holdingId){
    let filteredArray = this.state.holdings.filter(holding => holding.id !== holdingId)
    this.setState({holdings: filteredArray});
    // fetch to stock holding delete action method
  }

  render(){
    console.log("ProfileTile rendering");

      let currentPortfolioValue = 0;
      let originalPortfolioValue = 0;

      let holdings = this.state.holdings.map((holding) => {
        originalPortfolioValue += parseFloat(holding.cost_basis * holding.quantity)

        let currentPrice;
        if (this.state.current_prices[holding.ticker.toUpperCase()]){
          currentPrice = this.state.current_prices[holding.ticker.toUpperCase()].quote.delayedPrice
          currentPortfolioValue += currentPrice * holding.quantity;
        }

        let handleDeleteHolding = (event) => {
          event.preventDefault();
          this.deleteHolding(holding.id)
        }
        return (
          <HoldingRow
          currentPrice={currentPrice}
          deleteHolding={handleDeleteHolding}
          key={holding.id}
          id={holding.id}
          quantity={holding.quantity}
          ticker={holding.ticker}
          costBasis={holding.cost_basis}
          />
        )
      }, this)

    return (
    <div>
      <h4>{this.state.name}&nbsp;&nbsp;
        Current value: ${NumOutput(currentPortfolioValue)} &nbsp;
        Original value: ${NumOutput(originalPortfolioValue)}</h4>
      <table>
        <thead>
          <tr><th> Stock </th><th> Quantity </th><th> Cost Basis </th><th> Current Value </th><th> Profit/Loss </th><th> Profit/Loss per share</th><th> Remove </th></tr>
        </thead>
        <tbody>
          {holdings}
        </tbody>
      </table>
    </div>
    )
  }
}

export default PortfolioTile;