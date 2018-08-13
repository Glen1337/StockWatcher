import React from 'react';

const Statistic =(props) =>{
  return(
    <div>
      <li className="bullet-item">{props.statKey} : {props.statValue}</li>
    </div>
  )
}
 export default Statistic
