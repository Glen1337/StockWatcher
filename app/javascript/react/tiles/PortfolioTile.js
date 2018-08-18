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
    if (holdings.length > 0){
      let tickersToGet = holdings.map(holding => holding.ticker).join(',');
      console.log("fetching IEX data for Portfolio: " + tickersToGet)
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
  }

  deleteHolding(holdingId){
    event.preventDefault();
    let filteredArray = this.state.holdings.filter(holding => holding.id !== holdingId)
    this.setState({holdings: filteredArray});
    let formPayload = {
      holding_id: holdingId,
      // send price too
      current_price: this.state.current_prices[this.state.holdings.filter(obj => {return obj.id === holdingId})[0].ticker]["quote"].delayedPrice
    };
    // send  current price with delete so we know how much money was made
    fetch(`/api/v1/stock_holdings/${holdingId}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      body: JSON.stringify(formPayload),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
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
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
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
            note={holding.notes}
            createdAt={holding.date}
          />
        )}, this)

    return (
      <div>
        <div className="row wrapper" style={{margin: '0px'}}>
          {/*}<div className="row">
            <div className= "text-center large-12 medium-12 small-12 columns">
              <h2>{this.state.name}</h2>
            </div>
          </div>*/}
          <div className="row data-equalizer">
            <div className="text-right small-3 large-3 medium-3 columns data-equalizer-watch">
            <h2>{this.state.name}</h2>
            </div>
            <div className="text-center small-6 large-6 medium-6 columns data-equalizer-watch">
              <h4>
                Current value: ${NumOutput(currentPortfolioValue)} &nbsp;
                Original value: ${NumOutput(originalPortfolioValue)}&nbsp;&nbsp;
              </h4>
            </div>
            <div className="text-left small-3 large-3 medium-3 columns data-equalizer-watch">
              <button className="button tiny" onClick={this.props.deleteClick}>Delete Portfolio</button>
            </div>
          </div>
          <div className="row">
            <table style={{margin: 'auto'}}>
              <thead>
                <tr><th> Stock </th><th> Quantity </th><th> Cost Basis </th><th> Current Price </th><th> Profit/Loss </th><th> Profit/Loss per share </th><th> % Gain/Loss </th><th>Original Value</th><th>Current Value</th><th> Notes </th><th> Bought on </th><th> Remove </th></tr>
              </thead>
              <tbody>{holdings}</tbody>
            </table>
          </div>
        </div><br /><br /><br /><br />
      </div>
    )
  }
}

export default PortfolioTile;
