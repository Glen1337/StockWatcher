import React, { Component } from 'react';

const HoldingRow = (props) => {

    let pl = props.currentPrice - props.costBasis
    let plTotal = pl * props.quantity

    return (
    <tr>
      <td>{props.ticker}</td>
      <td>{props.quantity}</td>
      <td>{props.costBasis}</td>
      <td>{props.currentPrice}</td>
      <td>{NumOutput(plTotal)}</td>
      <td>{NumOutput(pl)}</td>
      <td><button onClick={props.deleteHolding}>Delete</button></td>
    </tr>
    )
  }


export default HoldingRow;
