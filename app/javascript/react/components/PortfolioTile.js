import React, { Component } from 'react';
import HoldingRow from '../components/HoldingRow'


class PortfolioTile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.deleteHolding = this.deleteHolding.bind(this);

  }

  componentDidMount() {
    fetch(`https://api.iextrading.com/1.0/market/batch?`)
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
      debugger;
      this.setState({

      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteHolding(holdingId){
    console.log("Deleting holding: " + holdingId)
  }

  render(){
      let holdings = this.props.holdings.map(holding => {
        let handleDeleteHolding = () => {
          this.deleteHolding(holding.id)
        }
        return (
          <HoldingRow
          deleteHolding={handleDeleteHolding}
          key={holding.id}
          id={holding.id}
          quantity={holding.quantity}
          ticker={holding.ticker}
          costBasis={holding.cost_basis}
          />
        )
      })
    return (
    <div>
      <h4>{this.props.name} &nbsp; ({this.props.value})</h4>
      <table>
        <thead>
          <tr><th> Stock </th><th> Quantity </th><th> Cost Basis </th><th> Current Value </th><th> Profit/Loss </th><th> Remove </th></tr>
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
