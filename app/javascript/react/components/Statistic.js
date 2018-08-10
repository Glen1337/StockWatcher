import React from 'react';

const Statistic =(props) =>{
  return(
    <div>
      <span>{props.statKey} : {props.statValue}</span>
    </div>
  )
}
 export default Statistic
