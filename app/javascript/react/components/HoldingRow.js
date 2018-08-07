import React, { Component } from 'react';

const HoldingRow = (props) => {

    let pl = props.currentPrice - props.costBasis
    let plTotal = pl * props.quantity

    let plString = '';
    let plTotalString = ''

    // if (pl > 0){
    //   plString=`+${NumOutput(pl)}`;
    //   plTotalString=`+${NumOutput(plTotal)}`;
    // }else if (pl < 0) {
    //   plTotalString=`${NumOutput(plTotal)}`;
    //   plString=`${NumOutput(pl)}`;
    // } else {
    //   plTotalString = 'none';
    //   plString = 'none';
    // }

    // percent = (currentPrice - costBasis)/

    return (
      <tr>
        <td><b>{props.ticker}</b></td>
        <td>{props.quantity}</td>
        <td>${props.costBasis}</td>
        <td>${props.currentPrice}</td>
        <td>{SignNumOutput(plTotal, '$')}</td>
        <td>{SignNumOutput(pl, '$')}</td>
        <td>{SignNumOutput(((props.currentPrice - props.costBasis)/props.costBasis) * 100)}%</td>
        <td><button onClick={props.deleteHolding}>Delete</button></td>
      </tr>
    )
  }


export default HoldingRow;
