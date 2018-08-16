import React, { Component } from 'react';

const HoldingRow = (props) => {

    let pl = props.currentPrice - props.costBasis
    let plTotal = pl * props.quantity
    let pgl = ((props.currentPrice - props.costBasis)/props.costBasis) * 100

    //Assign color class to red or green depending if profit or loss

    return (
      <tr>
        <td><b>{props.ticker}</b></td>
        <td>{props.quantity}</td>
        <td>${props.costBasis}</td>
        <td>${props.currentPrice}</td>
        <td>{SignNumOutput(plTotal, '$')}</td>
        <td>{SignNumOutput(pl, '$')}</td>
        <td>{SignNumOutput(pgl)}%</td>
        <td>{props.note}</td>
        <td>{props.createdAt}</td>
        <td><button className="button small" onClick={props.deleteHolding}>Sell</button></td>
      </tr>
    )
  }


export default HoldingRow;
