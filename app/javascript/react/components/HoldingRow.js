import React, { Component } from 'react';

const HoldingRow = (props) => {

    let pl = props.currentPrice - props.costBasis
    let plTotal = pl * props.quantity
    let pgl = ((props.currentPrice - props.costBasis)/props.costBasis) * 100

    let colorClass;

    if (pl > 0 && plTotal > 0 && pgl > 0){
      colorClass = "green-text";
    }

    if (pl < 0 && plTotal < 0 && pgl < 0){
      colorClass = "red-text";
    }
    //Assign color class to red or green depending if profit or loss

    return (
      <tr>
        <td><b>{props.ticker}</b></td>
        <td>{props.quantity}</td>
        <td>${props.costBasis}</td>
        <td>${props.currentPrice}</td>
        <td className={colorClass}>{SignNumOutput(plTotal, '$')}</td>
        <td className={colorClass}>{SignNumOutput(pl, '$')}</td>
        <td className={colorClass}>{SignNumOutput(pgl)}%</td>
        <td>{props.note}</td>
        <td>{props.createdAt}</td>
        <td><button className="button small" onClick={props.deleteHolding}>Sell</button></td>
      </tr>
    )
  }


export default HoldingRow;
