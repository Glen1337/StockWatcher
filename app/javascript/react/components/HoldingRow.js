import React, { Component } from 'react';


class HoldingRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_value: null
    }

  }

  render(){

    return (
    <tr>
      <td>{this.props.ticker}</td>
      <td>{this.props.quantity}</td>
      <td>{this.props.costBasis}</td>
      <td></td>
      <td></td>
      <td><button onClick={this.props.deleteHolding}>Delete</button></td>
    </tr>
    )
  }
}

export default HoldingRow;
