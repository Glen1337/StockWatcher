import React, { Component } from 'react';

const HoldingRow = (props) => {

    let pl = props.currentPrice - props.costBasis
    let plTotal = pl * props.quantity

    let plString = '';
    let plTotalString = ''

    return (
      <tr>
        <td><b>{props.ticker}</b></td>
        <td>{props.quantity}</td>
        <td>${props.costBasis}</td>
        <td>${props.currentPrice}</td>
        <td>{SignNumOutput(plTotal, '$')}</td>
        <td>{SignNumOutput(pl, '$')}</td>
        <td>{SignNumOutput(((props.currentPrice - props.costBasis)/props.costBasis) * 100)}%</td>
        <td>{props.note}</td>
        <td>{props.createdAt}</td>
        <td><button className="button small" onClick={props.deleteHolding}>Delete</button></td>
      </tr>
    )
  }


export default HoldingRow;
